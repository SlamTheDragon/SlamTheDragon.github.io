import { Logging } from "../logger"
import { GetSnapshot } from "./getsnapshot"

enum CommissionType {
    Headshot = 'Headshot',
    Halfshot = 'Halfshot',
    Fullshot = 'Fullshot',
    CharacterIllustration = 'CharacterIllustration',
    Illustration = 'Illustration',
    RefSheet = 'RefSheet',
    Custom = 'Custom',
    Bundle = 'Bundle',
}

export enum ContentColumnID {
    TODO = 'Todo',
    INPROG = 'InProgress',
    DONE = 'Done',
    CANCELED = 'Canceled',
}

export interface ContentInterface {
    entryKeyID?: number
    archived?: boolean
    commissioner?: string
    commissionType?: CommissionType
    customPrice?: number
    description?: string
    socialMediaLink?: string
    isOnHold?: boolean
    isGlobalOnHold?: boolean
    progressStatus?: ContentColumnID
    progressStatusReason?: string
    timeEnd?: number
    timeStart?: number
    thumbnail?: string
    title?: number
}

export class ContentBuilder {
    private static _entryKeyID: number = -1
    private static _archived: boolean | undefined = undefined
    private static _commissioner: string | undefined = undefined
    private static _commissionType: CommissionType
    private static _customPrice: number | undefined = undefined
    private static _description: string | undefined = undefined
    private static _timeEnd: number | undefined = undefined
    private static _link: string | undefined = undefined
    private static _isOnHold: boolean | undefined = undefined
    private static _progressStatus: ContentColumnID
    private static _progressStatusReason: string | undefined = undefined
    private static _timeStart: number | undefined = undefined
    private static _thumbnail: string | undefined = undefined
    private static _title: number | undefined = undefined


    public static statusData: ContentInterface[] = []
    public static columns: Record<ContentColumnID, ContentInterface[]> = {
        [ContentColumnID.TODO]: [],
        [ContentColumnID.INPROG]: [],
        [ContentColumnID.DONE]: [],
        [ContentColumnID.CANCELED]: []
    }
    public static gallery: any[] = []

    private static async variableReset() {
        this._entryKeyID = -1
        this.statusData = []
        this.columns[ContentColumnID.TODO] = []
        this.columns[ContentColumnID.INPROG] = []
        this.columns[ContentColumnID.DONE] = []
        this.columns[ContentColumnID.CANCELED] = []
        this.gallery = []
        
        this._archived = undefined
        this._commissioner = undefined
        this._customPrice = undefined
        this._description = undefined
        this._timeEnd = undefined
        this._link = undefined
        this._isOnHold = undefined
        this._progressStatusReason = undefined
        this._timeStart = undefined
        this._thumbnail = undefined
        this._title = undefined
    }

    public static async contentRead() {
        await this.variableReset()

        for (const keys of GetSnapshot.commissionList) {
            let obj: any = keys
            this._entryKeyID++

            if (obj !== undefined) {
                this._archived = obj.archived
                this._commissioner = obj.commissioner
                this._commissionType = obj.commissiontype
                this._customPrice = obj.customvalue
                this._description = obj.description
                this._isOnHold = obj.isonhold
                this._link = obj.link
                this._progressStatus = obj.progressStatus
                this._progressStatusReason = obj.progressstatusreason
                this._timeStart = obj.enddate
                this._timeEnd = obj.timeEnd
                this._thumbnail = obj.thumbnail
                this._title = obj.title

                await this.objectBuilder()
                console.log(this._thumbnail);
                
            }
        }

        await ContentBuilder.sortColumns()
        console.log(this.columns[ContentColumnID.INPROG]);
        
    }

    private static async sortColumns() {
        this.statusData.forEach((data) => {
            if (data.progressStatus) {
                this.columns[data.progressStatus].push(data)
            }
        })
    }

    private static async objectBuilder() {
        const builder: ContentInterface[] = [
            {
                entryKeyID: this._entryKeyID,
                archived: this._archived,
                commissioner: this._commissioner,
                commissionType: this._commissionType,
                customPrice: this._customPrice,
                description: this._description,
                socialMediaLink: this._link,
                isOnHold: this._isOnHold,
                progressStatus: this._progressStatus,
                progressStatusReason: this._progressStatusReason,
                timeEnd: this._timeEnd,
                timeStart: this._timeStart,
                thumbnail: this._thumbnail,
                title: this._title,
            }
        ]
        console.log(this._link);
        
        if (!this._archived) {
            this.statusData.push(builder[0])
        } else {
            this.gallery.push(builder[0])
        }
    }
}