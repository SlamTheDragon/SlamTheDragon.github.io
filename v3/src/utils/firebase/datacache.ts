import { DataSnapshot, Unsubscribe, onValue, ref } from "firebase/database"
import { db } from "./firebase"
import { GetSnapshot } from "./getsnapshot"
import { Logging } from "../logger"


export class DataCache {
    public static commissionData: DataSnapshot | null = null
    public static profileData: DataSnapshot | null = null

    private static hasInitiatedLiveUpdate: boolean = false
    private static retry: number = 0
    private static timeout: number = 200

    public static async fetch() {
        if (this.retry === 4) {
            Logging.ERROR(`Failed to verify data snapshot registration, please refresh your browser`)
            this.notifyChange()
            return
        }

        if (!this.hasInitiatedLiveUpdate) {
            Logging.INFO('Initial Fetch Start from Database')
            Logging.INFO('Initializing Refresh Timer')
            await Promise.all([this.getCommData(), this.getProfileData()])
            this.hasInitiatedLiveUpdate = true
        } else {
            Logging.VERBOSE('Data refresh in progress...')
        }

        if (await GetSnapshot.fetchProfile() && await GetSnapshot.fetchComms()) {
            await GetSnapshot.registerSnapshot()
            this.refreshSnapshot()
            Logging.VERBOSE(`Refreshed: Fetched data has been verified and registered`)
        } else {
            Logging.WARN(`Failed to verify data snapshot registration, retrying operation...`)
            this.verifyFetchStatus()
        }
    }

    private static async verifyFetchStatus() {
        setTimeout(() => {
            this.fetch()
            this.retry++
            this.timeout += this.timeout + this.timeout
        }, this.timeout)
    }

    private static async refreshSnapshot() {
        setTimeout(() => {
            Logging.VERBOSE('Refreshing Data...')
            this.fetch()
        }, 30000)
    }

    // Code by @thatnerd527 directly taken from the bot lol
    public static async getCommData(): Promise<DataSnapshot> {
        if (this.commissionData == null) {
            return new Promise<DataSnapshot>((resolve, reject) => {
                try {
                    GetData.addDataListener((snapshot: DataSnapshot) => {
                        this.commissionData = snapshot
                        resolve(snapshot)
                    }, "/commissions")
                } catch (e) {
                    reject(e)
                }
            })
        } else {
            return await Promise.resolve(this.commissionData)
        }
    }

    public static async getProfileData(): Promise<DataSnapshot> {
        if (this.profileData == null) {
            return new Promise<DataSnapshot>((resolve, reject) => {
                try {
                    GetData.addDataListener((snapshot: DataSnapshot) => {
                        this.profileData = snapshot
                        resolve(snapshot)
                    }, "/static")
                } catch (e) {
                    reject(e)
                }
            })
        } else {
            return await Promise.resolve(this.profileData)
        }
    }


    private static changeListeners: (() => void)[] = []

    public static addChangeListener(listener: () => void) {
        this.changeListeners.push(listener)
    }

    public static removeChangeListener(listener: () => void) {
        this.changeListeners = this.changeListeners.filter(
            (existingListener) => existingListener !== listener
        )
    }

    private static notifyChange() {
        Logging.VERBOSE('Notifying UI components to update...')
        this.changeListeners.forEach((listener) => listener())
    }
}

class GetData {
    private static attachedListeners: Unsubscribe[] = new Array<Unsubscribe>()

    public static async addDataListener(
        listener: (snapshot: DataSnapshot) => void,
        datapath: string
    ): Promise<Unsubscribe> {
        let tmp = onValue(ref(db, datapath), listener)
        this.attachedListeners.push(tmp)
        return () => {
            tmp()
            this.attachedListeners = this.attachedListeners.filter((x) => x !== tmp)
        }
    }
}