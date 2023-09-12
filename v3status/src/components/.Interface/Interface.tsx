import { useDispatch } from 'react-redux'
import Footer from '../common/Footer'
import style from './interface.module.scss'

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    return (
        <>
            <div className={style.interface} id='view'>
                <Footer />
            </div>
        </>
    );
}