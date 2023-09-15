import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg';
import { ReactComponent as Menu } from '@material-design-icons/svg/outlined/menu.svg'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setScrollLayer } from '../slice/parallax-slices/parallaxScrollerSlice'
import { checkDevice } from '../../utils/device-checker/checkDevice'
import { setPanelFold } from '../slice/commission-panel-slices/collapseNavSlice'
import Footer from '../common/Footer'
import WelcomeHeaderDesktop from '../widgets/ICommission/WelcomeHeader/WelcomeHeaderDesktop'
import CommissionPrices from '../widgets/ICommission/CPricesSection/CommissionPrices'
import CommissionStatus from '../widgets/ICommission/CStatus/CommissionStatus'
import Gallery from '../widgets/ICommission/Gallery/Gallery'
import WelcomeHeaderMobile from '../widgets/ICommission/WelcomeHeader/WelcomeHeaderMobile'
import FooterMobile from '../common/FooterMobile'
import Button from '../common/Button'
import style from './interface.module.scss'


/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    const dispatch = useDispatch()
    const [isNavOpen, setNavOpen] = useState(false)
    const [content, setContent] = useState(false)

    if (checkDevice()) {
        dispatch(setPanelFold(true))
    }

    function transferScrollData(event: { currentTarget: { scrollTop: number; }; }) {
        dispatch(setScrollLayer(event.currentTarget.scrollTop))
    }

    function toggleNav() {
        setNavOpen(!isNavOpen)
    }

    function switchContent(origin: number) {
        if (origin === 0) {
            setContent(false)
        } else {
            setContent(true)
        }
    }

    function renderInterface() {
        if (checkDevice()) {
            return (content) ?
                <div className={style.innerInterface} style={{ filter: `blur(${(isNavOpen) ? 20 : 0}px)` }}>
                    <Gallery />
                </div> :
                <div className={style.innerInterface} style={{ filter: `blur(${(isNavOpen) ? 20 : 0}px)` }} onScroll={transferScrollData}>
                    <WelcomeHeaderMobile />
                    <CommissionPrices />
                </div>
        } else {
            return (
                <div className={style.innerInterface} onScroll={transferScrollData}>
                    <WelcomeHeaderDesktop />
                    <CommissionPrices />
                    <CommissionStatus />
                    <Gallery />
                    <Footer />
                </div>
            )
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
                        <Button classItem={(content) ? '' : 'primary'} onClick={() => { switchContent(0); toggleNav() }}>
                            Prices
                        </Button>
                        <Button classItem={(content) ? 'primary' : ''} onClick={() => { switchContent(1); toggleNav() }}>
                            Finished Commissions
                        </Button>
                        <Button disabled={true}>
                            Commission Queue <Open />
                        </Button>
                    </div>

                    <FooterMobile />
                </div>

                {renderInterface()}
            </div>
        </>
    );
}