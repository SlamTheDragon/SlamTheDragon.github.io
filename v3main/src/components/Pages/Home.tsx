import style from './home.module.scss';
import { ReactComponent as Logo } from '../../assets/svg/SlamTheDragon Logo.svg';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { ModalOperation } from '../../utils/component-utils/modalOperation';
import Footer from '../common/Footer';

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Home() {
    const dispatch = useDispatch()
    const modalDispatch = ModalOperation()

    return (
        <div className={style.container}>
            <Logo />

            <div className={style.content}>
                <h1>wow holy shit it's working at least</h1>
            </div>

            <div className={style.innerCard}>
                Test Buttons
                <Button onClick={() => {modalDispatch('Title', 1)}}>Test</Button>
                <Button onClick={() => {window.location.href = '/status'}}>Status</Button>
                <Button onClick={() => { window.location.href = '/terms' }}>Terms of Service</Button>
                <Button classItem='secondary' onClick={() => { window.location.href = '/commissions' }}>Commissions</Button>
            </div>
        </div>
    );
}