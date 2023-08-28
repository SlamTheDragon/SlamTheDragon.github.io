import { useDispatch } from 'react-redux'
import { setScrollLayer } from '../slice/parallax-slices/parallaxScrollerSlice'
import { useModalOperation } from '../../utils/component-utils/modalOperation'
import style from './interface.module.scss'
import Footer from '../common/Footer'
import WelcomeHeader from '../widgets/ICommission/WelcomeHeader'
import CommissionPrices from '../widgets/ICommission/CPricesSection/CommissionPrices'
import CommissionStatus from '../widgets/ICommission/CStatus/CommissionStatus'
import Gallery from '../widgets/ICommission/Gallery/Gallery'
import Button from '../common/Button'
import { DataCache } from '../../utils/firebase/datacache'

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    // get

    // set
    const dispatch = useDispatch()
    const openModal = useModalOperation()

    function transferScrollData(event: { currentTarget: { scrollTop: number; }; }) {
        dispatch(setScrollLayer(event.currentTarget.scrollTop))
        // openModal("Welcome!", 0)
    };

    function get() {
        const a = DataCache.commissionData;
        console.log(a?.val());
    }
    
    function getB() {
        const a = DataCache.profileData;
        console.log(a?.val());
    }

    return (
        <>
            <div className={style.interface} onScroll={transferScrollData} id='view'>

                <WelcomeHeader />
                <Button onClick={get}>guhhhhhh</Button>
                <CommissionPrices />
                <CommissionStatus />
                <Gallery />
                <Footer />
            </div>
        </>
    );
}