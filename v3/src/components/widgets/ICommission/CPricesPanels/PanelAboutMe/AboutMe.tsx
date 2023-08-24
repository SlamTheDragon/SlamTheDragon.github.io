import { useDispatch } from 'react-redux'
import { setPanelTarget } from '../../../../slice/commission-panel-slices/panelViewSlice'
import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg'
import placeholder from '../../../../../assets/images/Placeholder.png'
import style from './panelAboutMe.module.scss'
import Button from '../../../../common/Button'

export default function AboutMe() {

    const dispatch = useDispatch()

    // FIXME: firebase
    const latestWip = 143114121
    const parsedStatus = 0

    const commStateParse = ["Closed", "Open"]
    const commDescription = ["I am unfortunately not accepting any orders at this moment. Please check back again later!", "Give me money"]

    function renderView() {
        // FIXME: add await fallback when firebase is not ready

        let foo = parsedStatus
        if (foo === 0) {
            return <Button classItem='secondary' onClick={() => (window.location.href = "#status")}>Check Status</Button>
        }
        if (foo === 1) {
            return <Button classItem='secondary' onClick={() => dispatch(setPanelTarget(1))}>Browse Offers</Button>
        }
    }

    return (
        <div className={style.AboutMeContainer}>

            <div>
                <div className={style.i1 + ' ' + style.cardA}>

                    <div className={style.contentA}>
                        {/* FIXME: firebase plsplsplspslspl */}
                        <img src="https://cdn.discordapp.com/avatars/345819451247296516/641a89f38531660a654450d40d5955a5.webp?size=240" alt="Profile" draggable='false' />
                        <div className={style.innerContentA}>
                            <h1>
                                SlamTheDragon
                            </h1>
                            <span>
                                <span>
                                    I'm an artist! I can make vibrant art for you from portraits, illustrations, and more!
                                </span>
                                <span>
                                    Check other cards I've provided to see what else I have for you.
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={style.i2 + ' ' + style.cardB}>
                    <div className={style.contentB}>
                        <div>
                            <h1>
                                Commissions are {commStateParse[parsedStatus]}
                            </h1>
                            <span>
                                {commDescription[parsedStatus]}
                            </span>
                        </div>
                        <div>
                            {renderView()}
                        </div>
                    </div>
                </div>
            </div>


            <div>
                {/* FIXME: firebase thingy goes here

                    REQUIREMENT FOR GET:
                    - image preview (if there are multiple entries then just obtain the first)
                    - query link

                */}
                <div className={style.i2 + ' ' + style.cardC}
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === "Enter") { window.open(`https://slamthedragon.me/latest-wip/?${latestWip}`) }
                    }}
                    tabIndex={0}
                    onClick={() => (window.open(`https://slamthedragon.me/latest-wip/?${latestWip}`))}
                >
                    <div className={style.contentC} style={{ backgroundImage: `url(${placeholder})` }}>
                        <div className={style.innerContentC}>
                            <span>
                                Latest
                            </span>
                            <h1>
                                WIP
                            </h1>
                        </div>
                        <div className={style.innerContentC}>
                            <span>
                                Open <Open />
                            </span>
                        </div>
                    </div>
                </div>

                <div className={style.i1 + ' ' + style.cardD}
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === "Enter") { window.location.href = "#gallery" }
                    }} tabIndex={0} onClick={() => (window.location.href = "#gallery")}
                >
                    <div className={style.contentWrapperD}>
                        <div className={style.contentSubWrapperD}>
                            <div className={style.contentD}>
                                <div className={style.innerContentD}>
                                    <span>
                                        <h1>Artworks</h1>
                                        <span className={style.text}>See all my recent finished artworks here.</span>
                                    </span>
                                </div>
                                <img alt='' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
