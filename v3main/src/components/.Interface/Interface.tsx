import style from './interface.module.scss';
import { ReactComponent as Logo } from '../../assets/svg/SlamTheDragon Logo.svg';
import Button from '../common/Button';

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    return (
        <div className={style.container}>
            <Logo />

            <div className={style.content}>
                <h2>Something <h1>BIG</h1> is coming</h2>
            </div>

            <div className={style.innerCard}>
                Looking for my Commission Page?
                <Button onClick={() => {window.location.href = "https://slamthedragon.me/commissions"}}>
                    Go to Page
                </Button>
            </div>
        </div>
    );
}