import { useSelector, useDispatch } from 'react-redux'
import { selectCount } from '../slice/counterSlice'
import { useModalOperation } from '../../utils/component-utils/modalOperation'
import style from './interface.module.scss'
import Footer from '../common/Footer'
import WelcomeHeader from '../widgets/ICommission/WelcomeHeader'
import CommissionPrices from '../widgets/ICommission/CPricesSection/CommissionPrices'
import CommissionStatus from '../widgets/ICommission/CStatus/CommissionStatus'
import Gallery from '../widgets/ICommission/Gallery/Gallery'

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    // get
    const count = useSelector(selectCount)
    // set
    const dispatch = useDispatch()
    const openModal = useModalOperation()


    return (
        <>
            <div className={style.interface}>
                <WelcomeHeader />
                <CommissionPrices />
                <CommissionStatus />
                <Gallery/>
                <Footer />
            </div>
        </>
    );
}