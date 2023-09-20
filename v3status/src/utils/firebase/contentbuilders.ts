import { Logging } from "../logger"
import { GetSnapshot } from "./getsnapshot"

enum ClassSelection {
    WidthA = `widthA`,
    WidthB = `widthB`,
    WidthC = `widthC`,
}

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
    classSelector?: ClassSelection
    commissioner?: string
    commissionType?: CommissionType
    customPrice?: number
    description?: string
    socialMediaLink?: string
    isOnHold?: boolean
    isGlobalOnHold?: boolean
    progressStatus?: ContentColumnID
    progressStatusReason?: string
    cancelReason?: string
    timeEnd?: number
    timeStart?: number
    thumbnail?: string
    title?: string
}

export class ContentBuilder {
    // Assign Individual Decoded Content
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
    private static _cancelReason: string | undefined = undefined
    private static _timeStart: number | undefined = undefined
    private static _thumbnail: string | undefined = undefined
    private static _title: string | undefined = undefined

    // Shuffler Variables
    private static _galleryCardWidth: ClassSelection | undefined

    // Containers
    public static statusData: ContentInterface[] = []
    public static columns: Record<ContentColumnID, ContentInterface[]> = {
        [ContentColumnID.TODO]: [],
        [ContentColumnID.INPROG]: [],
        [ContentColumnID.DONE]: [],
        [ContentColumnID.CANCELED]: []
    }
    public static _gallery: any[] = []
    private static _isGalleryLocked: boolean = false
    public static galleryLocked: any[] = []

    // Methods

    private static async variableReset() {
        this._entryKeyID = -1
        this.statusData = []
        this.columns[ContentColumnID.TODO] = []
        this.columns[ContentColumnID.INPROG] = []
        this.columns[ContentColumnID.DONE] = []
        this.columns[ContentColumnID.CANCELED] = []
        this._gallery = []

        this._archived = undefined
        this._commissioner = undefined
        this._customPrice = undefined
        this._description = undefined
        this._timeEnd = undefined
        this._link = undefined
        this._isOnHold = undefined
        this._progressStatusReason = undefined
        this._cancelReason = undefined
        this._timeStart = undefined
        this._thumbnail = undefined
        this._title = undefined
    }

    public static async main() {
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
                this._cancelReason = obj.cancelreason
                this._timeStart = obj.startdate
                this._timeEnd = obj.enddate
                this._thumbnail = obj.thumbnail
                this._title = obj.title
                
                await this.objectBuilder()
            }
        }

        await this.lockGallery()
    }
    
    private static async lockGallery() {
        if (!this._isGalleryLocked) {
            this.galleryLocked = this._gallery
            this._isGalleryLocked = true
        }
    }

    private static async objectBuilder() {
        const builder: ContentInterface[] = [
            {
                entryKeyID: this._entryKeyID,
                archived: this._archived,
                classSelector: this._galleryCardWidth,
                commissioner: this._commissioner,
                commissionType: this._commissionType,
                customPrice: this._customPrice,
                description: this._description,
                socialMediaLink: this._link,
                isOnHold: this._isOnHold,
                progressStatus: this._progressStatus,
                progressStatusReason: this._progressStatusReason,
                cancelReason: this._cancelReason,
                timeEnd: this._timeEnd,
                timeStart: this._timeStart,
                thumbnail: this._thumbnail,
                title: this._title,
            }
        ]
        this._gallery.push(builder[0])
    }
}