import { ReactComponent as Jump } from '@material-design-icons/svg/filled/arrow_forward_ios.svg';
import { ReactComponent as ExpandMore } from '@material-design-icons/svg/filled/expand_more.svg';
import { GetSnapshot, SnapshotNotify } from '../../../../utils/firebase/getsnapshot';
import { useEffect, useState } from 'react';
import Button from '../../../common/Button'
import ChipLoader from '../../../common/ChipLoader/ChipLoader';
import style from './welcomeheader.module.scss'
import { Logging } from '../../../../utils/logger';

export default function Splash() {
    const [status, setStatus] = useState<boolean | undefined>(GetSnapshot.status);
    const [onHold, setOnHold] = useState<boolean | undefined>(GetSnapshot.onHold);

    useEffect(() => {
        const change = () => {
            setStatus(GetSnapshot.status)
            setOnHold(GetSnapshot.onHold)
        }

        SnapshotNotify.addSnapshotListener(change)

        return () => {
            SnapshotNotify.removeSnapshotListener(change)
        }
    }, [])

    
    function renderStatus() {
        if (GetSnapshot.status === undefined) {
            return <ChipLoader/>
        }
        if (GetSnapshot.onHold === undefined) {
            return <ChipLoader/>
        }

        if (onHold) {
            return <h1>Paused</h1>
        }
        if (status) {
            return <h1>Open</h1>
        }
        if (!status) {
            return <h1>Closed</h1>
        }
    }
    

    return (
        <>
            <div>
                {/* empty */}
            </div>
            <div className={style.wrapper}>
                <div className={style.headerTitle}>

                    <h1>Welcome!</h1>

                    <span className={style.headerInfo}>
                        <a href='#offers'>
                            <h1>Commissions are</h1>
                            {renderStatus()} 
                            <Jump />
                        </a>
                    </span>

                </div>
            </div>
            <Button onClick={() => (window.location.href = "#offers")}><ExpandMore /></Button>
        </>
    )
}
