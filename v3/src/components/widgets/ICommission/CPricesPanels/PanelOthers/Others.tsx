import { useState } from 'react'
import style from './others.module.scss'

export default function Others() {
    const [getRefSheetState, setRefSheetState] = useState(0)
    const [getCustomState, setCustomState] = useState(0)
    const [getBundleState, setBundleState] = useState(0)

    const refSheet = false
    const custom = false
    const bundles = false

    if (refSheet) {
        setRefSheetState(1)
    }
    if (custom) {
        setCustomState(1)
    }
    if (bundles) {
        setBundleState(1)
    }

    const description = ['not accepting', 'accepting']



    return (
        <div className={style.OthersContainer}>
            <div>
                <div className={style.innerContainer}>

                    <h2>
                        Reference Sheet
                    </h2>
                    <span>
                        Currently {description[getRefSheetState]}
                    </span>
                </div>
            </div>
            <div>
                <div className={style.innerContainer}>
                    <h2>
                        Custom Commissions
                    </h2>
                    <span>
                        Currently {description[getCustomState]}
                    </span>
                </div>
            </div>
            <div>
                <div className={style.innerContainer}>
                    <h2>
                        Bundles
                    </h2>
                    <span>
                        Currently {description[getBundleState]}
                    </span>
                </div>
            </div>
            <div>
                <div className={style.innerContainer}>
                    <h1>
                        Join my Server!
                    </h1>
                    <span>
                        You are <a href="https://discord.gg/GSKdSPgjQb" target='_blank' rel="noreferrer">invited</a> to meet the man himself and other potential creators. Get exclusive updates and WIPs regarding my lore and such!
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
                        ToS & Agreement
                    </h2>
                    <span>
                        Please read my <a href="https://slamthedragon.me/commissions-old/service-and-agreement" target='_blank' rel="noreferrer">Terms of Service & Commissioner's Agreement</a> before we make an arrangement together.
                    </span>
                </div>
            </div>
        </div>
    )
}
