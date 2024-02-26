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
    timeEnd?: number
    timeStart?: number
    thumbnail?: string
    title?: number
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
    private static _timeStart: number | undefined = undefined
    private static _thumbnail: string | undefined = undefined
    private static _title: number | undefined = undefined

    // Shuffler Variables
    private static _galleryCardWidth: ClassSelection | undefined
    private static _gallerySelectionIndex: number = 0
    private static _checkA: boolean = false
    private static _checkB: boolean = false
    private static _checkC: boolean = false

    // Containers
    public static statusData: ContentInterface[] = []
    public static columns: Record<ContentColumnID, ContentInterface[]> = {
        [ContentColumnID.TODO]: [],
        [ContentColumnID.INPROG]: [],
        [ContentColumnID.DONE]: [],
        [ContentColumnID.CANCELED]: []
    }
    private static _gallery: any[] = []
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
                this._timeStart = obj.enddate
                this._timeEnd = obj.timeEnd
                this._thumbnail = obj.thumbnail
                this._title = obj.title
                
                await this.objectBuilder()
            }
        }

        await this.sortColumns()
        await this.lockGallery()
    }

    private static async lockGallery() {
        if (!this._isGalleryLocked) {
            this.galleryLocked = this._gallery
            this._isGalleryLocked = true
        }
    }

    private static async GetShuffledSelector() {
        let loop = true
        let out = undefined

        while (loop) {
            const select = await this.getRandomSelection()

            switch (select) {
                case 1:
                    const a = this.check(this._checkA, select)
                    this.resetShuffler()
                    out = a
                    if (await a) { loop = false }
                    break
                case 2:
                    const b = this.check(this._checkB, select)
                    this.resetShuffler()
                    out = b
                    if (await b) { loop = false }
                    break
                case 3:
                    const c = this.check(this._checkC, select)
                    this.resetShuffler()
                    out = c
                    if (await c) { loop = false }
                    break

                default:
                    break
            }
        }

        return out
    }

    private static async getRandomSelection() {
        return Math.floor(Math.random() * 3) + 1
    }

    private static async resetShuffler() {
        if (this._checkA && this._checkB && this._checkC) {
            this._checkA = false
            this._checkB = false
            this._checkC = false
        }
    }

    private static async check(returnType: boolean, selector: number) {
        if (!returnType) {
            if (selector === 1) {
                this._checkA = true
                return ClassSelection.WidthA
            }
            if (selector === 2) {
                this._checkB = true
                return ClassSelection.WidthB
            }
            if (selector === 3) {
                this._checkC = true
                return ClassSelection.WidthC
            }
        }
        return undefined
    }

    private static async sortColumns() {
        this.statusData.forEach((data) => {
            if (data.progressStatus) {
                this.columns[data.progressStatus].push(data)
            }
        })
    }

    private static async objectBuilder() {
        if (this._archived) {
            this._galleryCardWidth = await this.GetShuffledSelector()
        } else {
            this._galleryCardWidth = undefined
        }

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
                timeEnd: this._timeEnd,
                timeStart: this._timeStart,
                thumbnail: this._thumbnail,
                title: this._title,
            }
        ]
        if (!this._archived) {
            this.statusData.push(builder[0])
        } else {
            this._gallery.push(builder[0])
        }
    }
}

export class GalleryBuilder {
    public static renderQueue: any[] = []
    
    public static main() {
        // console.log(ContentBuilder.galleryLocked)
        // maybe we dont need this lol
        // it was meant to divide gallery content so it would not render all at once
        // this will be left for future updates.
    }
}