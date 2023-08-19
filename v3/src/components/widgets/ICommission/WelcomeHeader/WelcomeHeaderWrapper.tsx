import { useSelector } from 'react-redux';
import { scrollStyleEffect } from '../../../slice/parallax-slices/parallaxScrollerSlice';
import style from './welcomeheader.module.scss'
import Splash from './Splash';


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
		<section className={style.head}>
			<div style={{ top: "-" + l0 + "px" }} className={style.layer6}>
				A
			</div>
			<div style={{ top: "-" + l1 + "px" }} className={style.layer5}>
				A
			</div>
			<div style={{ top: "-" + l2 + "px" }} className={style.layer4}>
				A
			</div>
			<div style={{ top: "-" + l3 + "px" }} className={style.splash}>
				<Splash/>
			</div>
			<div style={{ top: "-" + l4 + "px" }} className={style.layer3}>
				A
			</div>
			<div style={{ top: "-" + l5 + "px" }} className={style.layer2}>
				A
			</div>
			<div style={{ top: "-" + l6 + "px" }} className={style.layer1}>
				A
			</div>
		</section>
	)
}
