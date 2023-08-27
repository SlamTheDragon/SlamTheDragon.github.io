import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg';
import style from './statusCard.module.scss';

/**
 * Enum representing possible column IDs for commission status.
 *
 * @enum {string}
 * @property {string} TODO - Represents the 'TODO' column status.
 * @property {string} INPROG - Represents the 'IN-PROGRESS' column status.
 * @property {string} DONE - Represents the 'DONE' column status.
 */
export enum ColumnID {
    TODO = 'cardColC',
    INPROG = 'cardColB',
    DONE = 'cardColA'
}

export interface StatusCardInterface {
    column: ColumnID
    previewUrl?: string;
    commID?: number
    commName?: string
    isOnHold?: boolean
    isTargetedOnHold?: boolean
}

/**
 * Commission Status Card Component.
 *
 * This component displays the status of a commission in a card format. It includes
 * information about the commission, such as its current column status, preview URL,
 * commission ID, commissioner's name, and whether the commission is on hold.
 *
 * @component
 * @param {StatusCardInterface} props - The props containing commission details.
 * @returns {JSX.Element} Rendered commission status card.
 * 
 * Interface for the designated column status.
 *
 * @interface StatusCardInterface
 * @property {ColumnID} column - The column status: TODO | IN-PROGRESS | DONE.
 * @property {string | undefined} previewUrl - The URL specified in the commission ID.
 * @property {number | undefined} commID - The commission ID.
 * @property {string | undefined} commName - The name of the person who commissioned.
 * @property {boolean | undefined} isOnHold - Indicates if the order/commission is on hold.
 */
export default function StatusCard(props: StatusCardInterface) {

    function designateColumn() {
        if (props.column === ColumnID.TODO) {
            return style.statusCardA
        }
        if (props.column === ColumnID.INPROG) {
            return style.statusCardB
        }
        if (props.column === ColumnID.DONE) {
            return style.statusCardC
        }
    }

    return (
        <div tabIndex={0} className={`${style.statusCard} ${designateColumn()} ${props.isOnHold ? style.onHold : ''} ${props.isTargetedOnHold ? style.onHold : ''}`} onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") { window.open(`https://slamthedragon.me/latest-wip/?${props.commID}`) }
        }}>
            <div className={style.statusCardHeader}>
                <strong>#{props.commID} &nbsp; {props.commName}</strong> <span>{props.isOnHold || props.isTargetedOnHold ? 'On Hold' : ''}</span>
            </div>

            <div className={style.statusCardBody}>
                <div className={style.statusCardPreview} style={{ backgroundImage: `url(${props.previewUrl})` }}>
                    <div onClick={() => window.open(`https://slamthedragon.me/latest-wip/?${props.commID}`)}>
                        Open <Open />
                    </div>
                </div>
            </div>
        </div>
    );
}