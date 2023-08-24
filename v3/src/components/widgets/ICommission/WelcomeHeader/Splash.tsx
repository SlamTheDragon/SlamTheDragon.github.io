import { ReactComponent as Jump } from '@material-design-icons/svg/filled/arrow_forward_ios.svg';
import { ReactComponent as ExpandMore } from '@material-design-icons/svg/filled/expand_more.svg';
import Button from '../../../common/Button'
import style from './welcomeheader.module.scss'

export default function Splash() {

    // GET FROM FIREBASE
    const status = "Closed"

    return (
        <>
            <div>
                {/* empty */}
            </div>
            <div className={style.wrapper}>
                <div className={style.headerTitle}>

                    <h1>Welcome!</h1>

                    <span className={style.headerInfo}>
                        <a href='#offers'>
                            <h1>Commissions are</h1>
                            <h1>{status}</h1>
                            <Jump />
                        </a>
                    </span>

                </div>
            </div>
            <Button onClick={() => (window.location.href = "#offers")}><ExpandMore /></Button>
        </>
    )
}
