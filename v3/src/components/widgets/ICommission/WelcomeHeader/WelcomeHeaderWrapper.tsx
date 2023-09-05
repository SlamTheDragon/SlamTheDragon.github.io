// import { ReactComponent as Six } from '../../../../assets/svg/splash/1.svg';
// import { ReactComponent as Five } from '../../../../assets/svg/splash/2.svg';
// import { ReactComponent as Four } from '../../../../assets/svg/splash/3.svg';
// import { ReactComponent as Three } from '../../../../assets/svg/splash/4.svg';
// import { ReactComponent as Two } from '../../../../assets/svg/splash/5.svg';
// import { ReactComponent as One } from '../../../../assets/svg/splash/6.svg';
import F from '../../../../assets/svg/splash/1.png';
import E from '../../../../assets/svg/splash/2.png';
import D from '../../../../assets/svg/splash/3.png';
import C from '../../../../assets/svg/splash/4.png';
import B from '../../../../assets/svg/splash/5.png';
import A from '../../../../assets/svg/splash/6.png';
import { useSelector } from 'react-redux';
import { scrollStyleEffect } from '../../../slice/parallax-slices/parallaxScrollerSlice';
import Splash from './Splash';
import style from './welcomeheader.module.scss'


export default function WelcomeHeaderWrapper() {

	// Redux get
	const l0 = useSelector(scrollStyleEffect)
	const l1 = l0 / 2
	const l2 = l0 / 2.75
	const l3 = l0 / 3.5
	const l4 = l0 / 4.25
	const l5 = l0 / 5
	const l6 = l0 / 5.75

	return (
		<section className={style.head + " snap"}>
			<div style={{ top: "-" + l0 + "px" }} className={style.layer6}>
				<img src={F} alt="splash" />
			</div>
			<div style={{ top: "-" + l1 + "px" }} className={style.layer5}>
				<img src={E} alt="splash" />
			</div>
			<div style={{ top: "-" + l2 + "px" }} className={style.layer4}>
				<img src={D} alt="splash" />
			</div>
			<div style={{ top: "-" + l3 + "px" }} className={style.splash}>
				<Splash />
			</div>
			<div style={{ top: "-" + l4 + "px" }} className={style.layer3}>
				<img src={C} alt="splash" />
			</div>
			<div style={{ top: "-" + l5 + "px" }} className={style.layer2}>
				<img src={B} alt="splash" />
			</div>
			<div style={{ top: "-" + l6 + "px" }} className={style.layer1}>
				<img src={A} alt="splash" />
			</div>
		</section>
	)
}
