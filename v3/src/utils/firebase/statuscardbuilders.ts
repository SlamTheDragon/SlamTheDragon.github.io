import { ColumnID } from "../../components/widgets/ICommission/CStatus/StatusCard"
import { Logging } from "../logger"
import { GetSnapshot } from "./getsnapshot"

enum CommissionType {
    HEADSHOT,
    HALFSHOT,
    FULLSHOT,
    CHARILLUSTRATION,
    ILLUSTRATION,
}

export class StatusCardBuilder {
    private static _key: number | undefined = undefined
    
    private static _commissioner: string | undefined = undefined
    private static _commissionType: CommissionType
    private static _customPrice: number | undefined = undefined
    private static _description: string | undefined = undefined
    private static _link: string | undefined = undefined
    private static _progressStatus: ColumnID
    private static _progressStatusReason: string | undefined = undefined
    // private static _timeStart: number | undefined = undefined
    // private static _timeEnd: number | undefined = undefined
    private static _title: number | undefined = undefined

    


    public static statusRead() {
        this._key = 1

        for (const keys of GetSnapshot.commissionList) {
            this._key++

            if (keys !== undefined) {
                let foo = []
                for (const values of Object.values(keys)) {
                    foo.push(values)
                }

                this._commissioner = foo[0]
                this._commissionType = foo[1]
                this._customPrice = foo[2]
                this._description = foo[3]
                this._link = foo[4]
                this._progressStatus = foo[5]
                this._progressStatusReason = foo[6]
            }

            this.objectBuilder()
        }



        // if (iterator !== undefined) {

        //     console.log(Object.values(iterator)[0])
        // }



        // for (let i = 0; i < 10; i++) {            
        // }

        // for (let i = 0; i < GetSnapshot.commissionList.length; i++) {
        //     const element = GetSnapshot.commissionList[i]
        //     console.log(element)
        // }
        // console.log(Object.values(GetSnapshot.commissionList)[0])
    }
    
    static objectBuilder() {
        throw new Error("Method not implemented.")
    }


}