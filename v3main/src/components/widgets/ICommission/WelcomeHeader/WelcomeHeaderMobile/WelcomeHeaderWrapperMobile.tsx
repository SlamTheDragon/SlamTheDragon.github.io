import { useSelector } from 'react-redux'
import { scrollStyleEffect } from '../../../../slice/parallax-slices/parallaxScrollerSlice'
import Splash from './SplashMobile'
import style from './welcomeheader.module.scss'


export default function WelcomeHeaderWrapperMobile() {
	const l0 = useSelector(scrollStyleEffect)
	const l1 = (l0 - 0) / 2

	return (
		<section className={style.head} style={{ top: `${l1}px` }}>
			{/* <div style={{ top: "-" + l0 + "px" }} className={style.splash}>
				<Splash />
			</div> */}
			<Splash />
		</section>
	)
}
