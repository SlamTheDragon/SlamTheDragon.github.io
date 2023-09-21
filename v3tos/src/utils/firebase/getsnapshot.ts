import { Logging } from "../logger";
import { DataCache } from "./datacache";
import { ContentBuilder } from "./contentbuilders";
import { focusComponent } from "../focus-element/focusElement";


export class GetSnapshot {
    // Master Data
    public static availability: number | undefined = undefined
    public static customStatus: object = []
    public static onHold: boolean | undefined = undefined
    public static queueLimit: number | undefined = undefined
    public static startingPrices: object = []
    public static status: boolean | undefined = undefined

    // Packaged Content Data
    public static commissionList: any[] = []

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
            let result: any[] = []

            if (!snapshotComms?.val()) {
                Logging.WARN(`Commission data is non existent`)
            } else {
                for (let x of snapshotComms?.val()) {
                    result.push(x)
                }
                this.commissionList = result
            }

            await ContentBuilder.main()
            return true
        } catch (error) {
            Logging.WARN(`Failed to fetch data from firebase. ${error}`);
            return false
        }
    }

    public static async registerSnapshot() {
        SnapshotNotify.notifySnapshotEvent()
    }
}

export class SnapshotNotify {
    private static snapshotListeners: (() => void)[] = []

    public static addSnapshotListener(listener: () => void) {
        this.snapshotListeners.push(listener)
    }

    public static removeSnapshotListener(listener: () => void) {
        this.snapshotListeners = this.snapshotListeners.filter(
            (existingListener) => existingListener !== listener
        )
    }

    public static async notifySnapshotEvent() {
        Logging.VERBOSE('Notifying UI components to update...')
        this.snapshotListeners.forEach((listener) => listener())
    }
}