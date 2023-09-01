import { Logging } from "../logger";
import { DataCache } from "./datacache";


export class GetSnapshot {
    public static availability: number | undefined = undefined
    public static customStatus: object = []
    public static onHold: boolean | undefined = undefined
    public static queueLimit: number | undefined = undefined
    public static startingPrices: object = []
    public static status: boolean | undefined = undefined

    public static commissionList: object = []

    public static async fetchProfile() {
        try {
            const snapshotProfile = DataCache.profileData;

            this.availability = snapshotProfile?.val().availability
            this.customStatus = snapshotProfile?.val().customstatus
            this.onHold = snapshotProfile?.val().isonhold
            this.queueLimit = snapshotProfile?.val().queuelimit
            this.startingPrices = snapshotProfile?.val().startingprices
            this.status = snapshotProfile?.val().status
                        
            return true
        } catch (error) {
            Logging.WARN(`Failed to fetch data from firebase. ${error}`)
            return false
        }
    }

    public static async fetchComms() {
        try {
            const snapshotComms = DataCache.commissionData
            this.commissionList = snapshotComms?.val()
            console.log(Object.values(this.commissionList))

            return true
        } catch (error) {
            Logging.WARN(`Failed to fetch data from firebase. ${error}`);
            return false
        }
    }

    public static async registerSnapshot() {
        this.notifySnapshotEvent()
    }
    

    private static snapshotListeners: (() => void)[] = [];

    public static addSnapshotListener(listener: () => void) {
        this.snapshotListeners.push(listener);
    }

    public static removeSnapshotListener(listener: () => void) {
        this.snapshotListeners = this.snapshotListeners.filter(
            (existingListener) => existingListener !== listener
        );
    }

    private static notifySnapshotEvent() {
        Logging.VERBOSE('Notifying UI components to update...')
        this.snapshotListeners.forEach((listener) => listener());
    }
}