import { DataSnapshot, Unsubscribe, get, onValue, ref } from "firebase/database"
import { db } from "./firebase"

export class DataCache {
    public static commissionData: DataSnapshot | null = null;

    public static profileData: DataSnapshot | null = null;

    public static getCommData(): Promise<DataSnapshot> {
        if (this.commissionData == null) {
            return new Promise<DataSnapshot>((resolve, reject) => {
                try {
                    GetData.addDataListener((snapshot: DataSnapshot) => {
                        this.commissionData = snapshot;
                        resolve(snapshot);
                    }, "/commissions");
                } catch (e) {
                    reject(e);
                }
            });
        } else {
            return Promise.resolve(this.commissionData);
        }
    }
    public static getProfileData(): Promise<DataSnapshot> {
        if (this.profileData == null) {
            return new Promise<DataSnapshot>((resolve, reject) => {
                try {
                    GetData.addDataListener((snapshot: DataSnapshot) => {
                        this.profileData = snapshot;
                        resolve(snapshot);
                    }, "/static");
                } catch (e) {
                    reject(e);
                }
            });
        } else {
            return Promise.resolve(this.profileData);
        }
    }
}

class GetData {
    private static attachedListeners: Unsubscribe[] = new Array<Unsubscribe>();

    public static addDataListener(
        listener: (snapshot: DataSnapshot) => void,
        datapath: string
    ): Unsubscribe {
        let tmp = onValue(ref(db, datapath), listener);
        this.attachedListeners.push(tmp);
        return () => {
            tmp();
            this.attachedListeners = this.attachedListeners.filter((x) => x !== tmp);
        };
    }
}