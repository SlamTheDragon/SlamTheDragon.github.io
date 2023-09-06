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
import style from './interface.module.scss'

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    const dispatch = useDispatch()

    if (checkDevice()) {
        dispatch(setPanelFold(true))
    }

    function transferScrollData(event: { currentTarget: { scrollTop: number; }; }) {
        dispatch(setScrollLayer(event.currentTarget.scrollTop))
    }

    return (
        <>
            <div className={style.interface} onScroll={transferScrollData} id='view'>
                {(checkDevice()) ? <WelcomeHeaderMobile /> : <WelcomeHeaderDesktop />}
                <CommissionPrices />
                {(checkDevice()) ? <></> : <CommissionStatus />}
                <Gallery />
                <Footer />
            </div>
        </>
    );
}