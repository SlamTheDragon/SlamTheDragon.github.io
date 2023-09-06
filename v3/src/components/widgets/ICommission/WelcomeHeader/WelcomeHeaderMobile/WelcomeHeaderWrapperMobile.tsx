import { useSelector } from 'react-redux'
import { scrollStyleEffect } from '../../../../slice/parallax-slices/parallaxScrollerSlice'
import Splash from './SplashMobile'
import style from './welcomeheader.module.scss'


export default function WelcomeHeaderWrapperMobile() {
	const l0 = (useSelector(scrollStyleEffect) / 5)

	return (
		<section className={style.head + " snap"}>
			<div style={{ top: "-" + l0 + "px" }} className={style.splash}>
				<Splash />
			</div>
		</section>
	)
}
