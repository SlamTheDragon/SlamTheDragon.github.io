import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg';
import { ReactComponent as Menu } from '@material-design-icons/svg/outlined/menu.svg'
import { ReactComponent as Search } from '@material-design-icons/svg/outlined/search.svg'
import { ChangeEvent, useEffect, useState } from 'react';
import { QueryDecoder } from '../../utils/url-query-decoders/queryDecoder';
import { SnapshotNotify } from '../../utils/firebase/getsnapshot';
import { ContentBuilder, ContentColumnID, ContentInterface } from '../../utils/firebase/contentbuilders';
import { checkDevice } from '../../utils/device-checker/checkDevice';
import { focusComponent } from '../../utils/focus-element/focusElement';
import Footer from '../common/Footer'
import Button from '../common/Button';
import FooterMobile from '../common/FooterMobile';
import style from './interface.module.scss'


function RenderData(props: ContentInterface) {
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')

    useEffect(() => {
        if (props.timeStart && props.timeEnd) {
            const a = new Date(props.timeStart)
            const b = new Date(props.timeEnd)
            setTimeStart(a.toLocaleDateString())
            setTimeEnd(b.toLocaleDateString())
        }
    }, [])

    function renderProgress() {
        if (props.isOnHold || props.isGlobalOnHold) {
            return <div className={style.statusChipHOLD}>ON HOLD</div>
        }
        if (props.progressStatus === ContentColumnID.TODO) {
            return <div className={style.statusChipTODO}>TODO</div>
        }
        if (props.progressStatus === ContentColumnID.INPROG) {
            return <div className={style.statusChipINPROG}>IN-PROGRESS</div>
        }
        if (props.progressStatus === ContentColumnID.DONE) {
            return <div className={style.statusChipDONE}>DONE</div>
        }
        if (props.progressStatus === ContentColumnID.CANCELED) {
            return <div className={style.statusChipCANCELED}>CANCELED</div>
        }
    }

    function renderReasons() {
        if (props.progressStatus !== ContentColumnID.CANCELED) {
            return (props.progressStatusReason === '') ? <i>No Remarks...</i> : props.progressStatusReason
        }
        if (props.progressStatus === ContentColumnID.CANCELED) {
            return (props.cancelReason === '') ? <i>No Remarks...</i> : props.cancelReason
        }
    }

    return (
        <>
            <div className={style.thumbnailContainer}>
                <div className={style.thumbnail} style={{ backgroundImage: `url(${props.thumbnail})` }}></div>
            </div>

            <div className={style.information}>

                <div className={style.iHeader}>
                    <span>
                        {renderProgress()}
                    </span>
                    {(props.title === '') ? <h1 className={style.titleHeaderFix}>#{props.entryKeyID} &nbsp;<span className={style.noTitle}>No Title</span></h1> : <h1>#{props.entryKeyID} &nbsp;{props.title}</h1>}
                    {(props.description === '') ? <span className={style.noTitle}><i>No description provided...</i></span> : <span><i>{props.description}</i></span>}
                </div>

                <div className={style.iInfo}>
                    <div className={style.iDescription}>
                        <h2>Order Information</h2>

                        <span> <strong>Commissioner</strong> &bull; {props.commissioner}</span>
                        <span> <strong>Price</strong> &bull; ${props.customPrice}</span>
                        <span> <strong>Type</strong> &bull; {props.commissionType}</span>
                        <span> <strong>Remarks</strong> &bull; {renderReasons()}</span>
                    </div>

                    <div className={style.iFootNote}>
                        {(timeStart) || '--/--/--'} &nbsp;&ndash;&nbsp; {(timeEnd) || '--/--/--'}
                    </div>
                </div>

                {(props.archived) ?
                    <Button classItem='primary' onClick={() => { window.open(props.socialMediaLink) }}>
                        Go to post <Open />
                    </Button> :
                    <></>}
            </div>
        </>
    )
}

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    const [isNavOpen, setNavOpen] = useState(false)
    const [isReady, setReady] = useState(false)
    const [getList, setList] = useState<any[]>([])
    const [isQuery, setQuery] = useState(QueryDecoder.Check())
    const [isSearching, setIsSearching] = useState(false)
    const [getVal, setVal] = useState('')


    useEffect(() => {
        const change = () => {
            setReady(true)
            setQuery(QueryDecoder.Check())

            const newList = getList.concat(ContentBuilder.galleryLocked[QueryDecoder.Get()])

            if (!isReady) {
                setList(newList)
            }
        }

        SnapshotNotify.addSnapshotListener(change);

        return (() => {
            SnapshotNotify.removeSnapshotListener(change);
        })
    }, [])

    function toggleNav() {
        setNavOpen(!isNavOpen)
    }

    function checkValue(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value !== '') {
            setIsSearching(true)
            setVal(e.target.value)
        } else {
            setIsSearching(false)
            setVal(e.target.value)
        }

        const element = document.getElementById('searchBar')
        const element2 = document.getElementById('searchCheck')
        if (element && element2) {
            element.removeAttribute('style')
            element2.innerText = ''
        }
    }

    function checkSearch() {
        const regex = new RegExp(/^[0-9]+$/)
        const element = document.getElementById('searchBar')
        const element2 = document.getElementById('searchCheck')
        const length = ContentBuilder._gallery.length

        if (getVal === '') {
            if (element && element2) {
                element.style.outlineColor = 'red'
                element2.innerText = 'Please enter a valid Commission ID.'
            }
        } else if (!regex.test(getVal)) {
            if (element && element2) {
                element.style.outlineColor = 'red'
                element2.innerText = 'Please search using numbers only.'
                return
            }
        } else {
            if (parseInt(getVal) > length || parseInt(getVal) === 0) {
                if (element && element2) {
                    element.style.outlineColor = 'red'
                    element2.innerText = 'Commission ID Not Found.'
                    return
                }
            }
            window.location.href = `?id=${getVal}`
        }
    }

    function render(UI: number | undefined) {
        switch (UI) {
            case 0:
                return (
                    <>
                        <h1 className={style.searchBarHeader} style={{ filter: `blur(${(isNavOpen) ? 20 : 0}px)` }}>
                            Search Your Commission
                        </h1>
                        <div className={style.searchBar} style={{ filter: `blur(${(isNavOpen) ? 20 : 0}px)` }}>
                            <input type="search"
                                id='searchBar'
                                className={style.searchField}
                                onChange={(e) => { checkValue(e) }}
                                placeholder={(!isReady) ? 'Loading...' : 'Commission ID (e.g., 7)'}
                                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                                    if (e.key === "Enter") { checkSearch() }
                                }}
                                disabled={!isReady}
                            />
                            {(!isSearching) ? <></> :
                                <Button classItem='primary' onClick={() => { checkSearch(); focusComponent('searchBar') }}> <Search /> </Button>
                            }
                        </div>
                        <span className={style.searchError} id='searchCheck' style={{ color: '#ff4141' }}></span>

                        {(checkDevice()) ?
                            <></> :
                            <Footer />
                        }
                    </>
                )
            case 1:
                return (
                    <div className={style.main} style={{ filter: `blur(${(isNavOpen) ? 20 : 0}px)` }}>
                        {getList.map((data, index) => (
                            <RenderData key={index} {...data} />
                        ))}
                    </div>
                )
            case 2:
                return (
                    <>
                        <h1 className={style.searchBarHeader} style={{ filter: `blur(${(isNavOpen) ? 20 : 0}px)` }}>
                            Commission Not Found
                        </h1>
                        <span className={style.searchNotFound} style={{ filter: `blur(${(isNavOpen) ? 20 : 0}px)` }}>
                            The entry you have provided does not exist.
                        </span>
                        <Button style={{ filter: `blur(${(isNavOpen) ? 20 : 0}px)` }} classItem={`primary ${style.searchNotFoundBtn}`} onClick={() => { setQuery(0) }}>Try Searching</Button>

                        {(checkDevice()) ?
                            <></> :
                            <Footer />
                        }
                    </>
                )

            default:
                return <h1>Loading</h1>
        }
    }

    return (
        <>
            <div className={style.interface} id='view'>
                <div className={style.navBtn}>
                    <Button onClick={() => { toggleNav() }}>
                        <Menu />
                    </Button>
                </div>
                <div className={style.navContent} style={{ height: `${(isNavOpen) ? 100 : 0}%`, opacity: `${(isNavOpen) ? 1 : 0}` }} onClick={() => { toggleNav() }}>
                    <h1>
                        Menu
                    </h1>
                    <div className={style.navSelections}>
                        <Button tabIndex={(isNavOpen) ? 0 : -1} onClick={() => { window.location.href = 'https://slamthedragon.me/' }}>
                            Home
                        </Button>
                        <Button tabIndex={(isNavOpen) ? 0 : -1} classItem={'primary'} onClick={() => { toggleNav() }}>
                            Commission Queue
                        </Button>
                        <Button tabIndex={(isNavOpen) ? 0 : -1} onClick={() => { window.location.href = 'https://slamthedragon.me/terms' }}>
                            Terms of Service
                        </Button>
                        <Button disabled={true}>
                            Portfolio <Open />
                        </Button>
                    </div>

                    <FooterMobile tabIndex={isNavOpen} />
                </div>

                {render(isQuery)}
            </div>
        </>
    );
}