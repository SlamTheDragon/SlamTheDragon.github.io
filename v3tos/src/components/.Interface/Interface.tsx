import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg';
import { ReactComponent as Menu } from '@material-design-icons/svg/outlined/menu.svg'
import { ReactComponent as Search } from '@material-design-icons/svg/outlined/search.svg'
import { ChangeEvent, useEffect, useState } from 'react';
import { QueryDecoder } from '../../utils/url-query-decoders/queryDecoder';
import { GetSnapshot, SnapshotNotify } from '../../utils/firebase/getsnapshot';
import { ContentBuilder, ContentColumnID, ContentInterface } from '../../utils/firebase/contentbuilders';
import { checkDevice } from '../../utils/device-checker/checkDevice';
import { focusComponent } from '../../utils/focus-element/focusElement';
import Footer from '../common/Footer'
import Button from '../common/Button';
import FooterMobile from '../common/FooterMobile';
import style from './interface.module.scss'


/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    const [isNavOpen, setNavOpen] = useState(false)

    function toggleNav() {
        setNavOpen(!isNavOpen)
    }

    function render() {
        return (
            <>
                <div>

                    <h1>Terms</h1>

                    <h1></h1>
                </div>
                <div>
                    sidebar..?
                </div>
            </>
        )
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
                        <Button tabIndex={(isNavOpen) ? 0 : -1} onClick={() => { window.location.href = 'https://slamthedragon.me/status' }}>
                            Commission Queue
                        </Button>
                        <Button tabIndex={(isNavOpen) ? 0 : -1} classItem={'primary'} onClick={() => { toggleNav() }}>
                            Terms of Service
                        </Button>
                        <Button disabled={true}>
                            Portfolio <Open />
                        </Button>
                    </div>

                    <FooterMobile tabIndex={isNavOpen} />
                </div>

                <div>
                    {render()}
                </div>
            </div>
        </>
    );
}