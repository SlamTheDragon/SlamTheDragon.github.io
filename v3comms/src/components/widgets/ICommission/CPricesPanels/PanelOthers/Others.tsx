import { useEffect, useState } from 'react'
import { GetSnapshot, SnapshotNotify } from '../../../../../utils/firebase/getsnapshot'
import style from './others.module.scss'

export default function Others() {
    const [getBundleState, setBundleState] = useState<boolean | undefined>(Object.values(GetSnapshot.customStatus)[0])
    const [getCustomState, setCustomState] = useState<boolean | undefined>(Object.values(GetSnapshot.customStatus)[1])
    const [getRefSheetState, setRefSheetState] = useState<boolean | undefined>(Object.values(GetSnapshot.customStatus)[2])

    useEffect(() => {
        const change = () => {
            setBundleState(Object.values(GetSnapshot.customStatus)[0])
            setCustomState(Object.values(GetSnapshot.customStatus)[1])
            setRefSheetState(Object.values(GetSnapshot.customStatus)[2])
        }

        SnapshotNotify.addSnapshotListener(change)

        return () => {
            SnapshotNotify.removeSnapshotListener(change)
        }
    }, [])


    return (
        <div className={style.OthersContainer}>
            <div>
                <div className={style.innerContainer}>

                    <h2>
                        Reference Sheet
                    </h2>
                    <span>
                        Currently {(getRefSheetState) ? 'accepting' : 'not accepting'}
                    </span>
                </div>
            </div>
            <div>
                <div className={style.innerContainer}>
                    <h2>
                        Custom Commissions
                    </h2>
                    <span>
                        Currently {(getCustomState) ? 'accepting' : 'not accepting'}
                    </span>
                </div>
            </div>
            <div>
                <div className={style.innerContainer}>
                    <h2>
                        Bundles
                    </h2>
                    <span>
                        Currently {(getBundleState) ? 'accepting' : 'not accepting'}
                    </span>
                </div>
            </div>
            <div>
                <div className={style.innerContainer}>
                    <h1>
                        Join my Server!
                    </h1>
                    <span>
                        You are <a href="https://discord.gg/GSKdSPgjQb" target='_blank' rel="noreferrer">invited</a> to meet the man himself and other potential creators. Get exclusive updates and WIPs regarding his lore and such!
                    </span>
                </div>
            </div>
            <div>
                <div className={style.innerContainer}>
                    <h2>
                        Contact
                    </h2>
                    <span>
                        Reach me out via <a href="https://twitter.com/SlamTheDragon" target='_blank' rel="noreferrer">Twitter</a> or in my <a href="https://discord.gg/GSKdSPgjQb" target='_blank' rel="noreferrer">Discord Server</a>
                    </span>
                </div>
            </div>
            <div>
                <div className={style.innerContainer}>
                    <h2>
                        Terms of Service
                    </h2>
                    <span>
                        Please read my <a href="https://slamthedragon.me/terms">Terms of Service & Commissioner's Agreement</a> before we make an arrangement together.
                    </span>
                </div>
            </div>
        </div>
    )
}
