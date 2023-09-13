import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPanelTarget } from '../../../../slice/commission-panel-slices/panelViewSlice'
import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg'
import { ReactComponent as Jump } from '@material-design-icons/svg/filled/arrow_forward_ios.svg'
import { GetSnapshot, SnapshotNotify } from '../../../../../utils/firebase/getsnapshot'
import { ContentBuilder, ContentColumnID } from '../../../../../utils/firebase/contentbuilders'
import avatar from '../../../../../assets/images/avatar.jpg'
import placeholder from '../../../../../assets/images/Placeholder.png'
import Button from '../../../../common/Button'
import style from './panelAboutMe.module.scss'


export default function AboutMe() {
    const [status, setStatus] = useState<boolean | undefined>(GetSnapshot.status);
    const [onHold, setOnHold] = useState<boolean | undefined>(GetSnapshot.onHold);

    const [getMousePos, setMousePos] = useState({ x: 0, y: 0 })
    const [getAlpha, setAlpha] = useState(0.0)
    // debugger
    const [latestWip, setLatestWip] = useState<number | undefined>(undefined)
    const [thumbnail, setThumbnail] = useState<string | undefined>(undefined)


    function mouseMoveHandler(event: { clientX: any; clientY: any; }) {
        setMousePos({
            x: event.clientX,
            y: event.clientY
        });
    }

    function hoverIn() {
        setAlpha(0.35)
    }

    function hoverOut() {
        setAlpha(0)
    }

    useEffect(() => {
        const change = () => {
            setStatus(GetSnapshot.status)
            setOnHold(GetSnapshot.onHold)
            if (ContentBuilder.columns[ContentColumnID.INPROG][0] !== undefined) {
                setLatestWip(ContentBuilder.columns[ContentColumnID.INPROG][0].entryKeyID)
                setThumbnail(ContentBuilder.columns[ContentColumnID.INPROG][0].thumbnail)
            }
        }

        SnapshotNotify.addSnapshotListener(change);
        window.addEventListener('mousemove', mouseMoveHandler);

        return (() => {
            SnapshotNotify.removeSnapshotListener(change);
            window.removeEventListener('mousemove', mouseMoveHandler);
        })
    }, [])

    const dispatch = useDispatch()

    // FIXME: firebase

    const commStateParse = ["Paused", "Open", "Closed", "Loading"]
    const commDescription = [
        "My Commissions are momentarily paused, potentially due to unplanned real-life disturbances or significant matters requiring urgent attention.",
        "My DM's are currently open! Please feel free to browse through my offers or view some of my sample artworks.",
        "I am unfortunately not accepting any orders at this moment. Please check back again later!",
        "Please wait...",
    ]

    function parseStatus() {
        if (GetSnapshot.status === undefined && GetSnapshot.onHold === undefined) {
            return 3
        }

        if (onHold) {
            return 0
        }
        if (status) {
            return 1
        }
        if (!status) {
            return 2
        }

        return 0
    }

    function renderView() {
        if (GetSnapshot.status === undefined && GetSnapshot.onHold === undefined) {
            return <Button disabled> Loading </Button>
        }
        if (onHold) {
            return <Button classItem='secondary' onClick={() => (window.location.href = "#status")}>Check Current Status</Button>
        }
        if (status) {
            return <Button classItem='secondary' onClick={() => dispatch(setPanelTarget(1))}>Browse Offers</Button>
        }
        if (!status) {
            return <Button classItem='secondary' onClick={() => (window.location.href = "#status")}>Check Status</Button>
        }
    }

    return (
        <div className={style.AboutMeContainer}>

            <div>
                <div className={style.i1 + ' ' + style.cardA}>

                    <div className={style.contentA} id='gradientHover' onMouseOver={() => hoverIn()} onMouseOut={() => hoverOut()} style={{ background: `radial-gradient(circle at ${getMousePos.x}px ${getMousePos.y}px, rgb(255, 121, 255, ${getAlpha}) 0%, rgba(255, 121, 255, 0) 100%)` }}>
                        <img src={avatar} alt="Profile" draggable='false' />
                        <div className={style.innerContentA}>
                            <h1>
                                SlamTheDragon
                            </h1>
                            <span>
                                <span>
                                    I can make vibrant art from portraits, illustrations, character sheets, and more!
                                </span>
                                <span>
                                    If you're curious, take a look at the cards I've provided to see more of what I have.
                                </span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className={style.i2 + ' ' + style.cardB}>
                    <div className={style.contentB}>
                        <div>
                            <h1>
                                Commissions are {commStateParse[parseStatus()]}
                            </h1>
                            <span>
                                {commDescription[parseStatus()]}
                            </span>
                        </div>
                        <div>
                            {renderView()}
                        </div>
                    </div>
                </div>
            </div>


            <div>
                <div className={style.i2 + ' ' + style.cardC}
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === "Enter") { window.open(`https://slamthedragon.me/status?id=${latestWip ?? 'notfound'}`) }
                    }}
                    tabIndex={0}
                    onClick={() => (window.open(`https://slamthedragon.me/status?id=${latestWip ?? 'notfound'}`))}
                >
                    <div className={style.contentC} style={{ backgroundImage: `url(${thumbnail ?? placeholder})` }}>
                        <div className={style.innerContentC}>
                            <span>
                                {(GetSnapshot.status === undefined && GetSnapshot.onHold === undefined) ? `Loading` : 'Latest'}
                            </span>
                            <h1>
                                {(GetSnapshot.status === undefined && GetSnapshot.onHold === undefined) ? `Loading` : 'WIP'} <Jump />
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
                                        <h1>Artworks <Jump /></h1>
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
