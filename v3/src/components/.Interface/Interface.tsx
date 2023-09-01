import { useDispatch } from 'react-redux'
import { setScrollLayer } from '../slice/parallax-slices/parallaxScrollerSlice'
import { ModalOperation } from '../../utils/component-utils/modalOperation'
import { checkDevice } from '../../utils/device-checker/checkDevice'
import Footer from '../common/Footer'
import WelcomeHeader from '../widgets/ICommission/WelcomeHeader'
import CommissionPrices from '../widgets/ICommission/CPricesSection/CommissionPrices'
import CommissionStatus from '../widgets/ICommission/CStatus/CommissionStatus'
import Gallery from '../widgets/ICommission/Gallery/Gallery'
import style from './interface.module.scss'

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    // get

    // set
    const dispatch = useDispatch()
    const openModal = ModalOperation()

    function transferScrollData(event: { currentTarget: { scrollTop: number; }; }) {
        dispatch(setScrollLayer(event.currentTarget.scrollTop))

        // FIXME:
        // becometh notorious >:3
        if (checkDevice()) {
            openModal("Warning", 1)
        }
    };

    return (
        <>
            <div className={style.interface} onScroll={transferScrollData} id='view'>
                <WelcomeHeader />
                <CommissionPrices />
                <CommissionStatus />
                <Gallery />
                <Footer />
            </div>
        </>
    );
}