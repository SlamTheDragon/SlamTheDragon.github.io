import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg';
import style from './statusCard.module.scss';
import { ContentColumnID, ContentInterface } from '../../../../utils/firebase/contentbuilders';


/**
 * Commission Status Card Component.
 *
 * This component displays the status of a commission in a card format. It includes
 * information about the commission, such as its current column status, preview URL,
 * commission ID, commissioner's name, and whether the commission is on hold.
 *
 * @component
 * @param {ContentInterface} props - The props containing commission details.
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
export default function StatusCard(props: ContentInterface) {

    function designateColumn() {
        if (props.progressStatus === ContentColumnID.TODO) {
            return style.statusCardA
        }
        if (props.progressStatus === ContentColumnID.INPROG) {
            return style.statusCardB
        }
        if (props.progressStatus === ContentColumnID.DONE) {
            return style.statusCardC
        }
    }

    return (
        <div tabIndex={0} className={`${style.statusCard} ${designateColumn()} ${props.isOnHold ? style.onHold : ''} ${props.isGlobalOnHold ? style.onHold : ''}`} onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") { window.open(`https://slamthedragon.me/status?id=${props.entryKeyID}`) }
        }}>
            <div className={style.statusCardHeader}>
                <strong>#{props.entryKeyID} &nbsp; {props.commissioner}</strong> <span>{props.isOnHold || props.isGlobalOnHold ? 'On Hold' : ''}</span>
            </div>

            <div className={style.statusCardBody}>
                <div className={style.statusCardPreview} style={{ backgroundImage: `url(${props.thumbnail})` }}>
                    <div onClick={() => window.open(`https://slamthedragon.me/status?id=${props.entryKeyID}`)}>
                        Open <Open />
                    </div>
                </div>
            </div>
        </div>
    );
}