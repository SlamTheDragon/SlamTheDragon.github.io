import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as Menu } from '@material-design-icons/svg/outlined/menu.svg'
import { ReactComponent as Person } from '@material-design-icons/svg/outlined/person.svg'
import { ReactComponent as Panorama } from '@material-design-icons/svg/outlined/panorama.svg'
import { ReactComponent as Apps } from '@material-design-icons/svg/outlined/apps.svg'
import { ReactComponent as Logo } from '../../../../assets/svg/SlamTheDragon Logo.svg'
import { getTarget, setPanelTarget } from '../../../slice/commission-panel-slices/panelViewSlice'
import AboutMe from '../CPricesPanels/PanelAboutMe/'
import Portraits from '../CPricesPanels/PanelPortraits/'
import Button from '../../../common/Button'
import Illustrations from '../CPricesPanels/PanelIllustrations/Illustrations'
import Others from '../CPricesPanels/PanelOthers/Others'
import style from './commissionPrices.module.scss'
import { getFoldState, setPanelFold } from '../../../slice/commission-panel-slices/collapseNavSlice'
import { checkDevice } from '../../../../utils/device-checker/checkDevice'


export default function CommissionPrices() {
	// redux get
	const target = useSelector(getTarget)
	const getIsFolded = useSelector(getFoldState)

	// redux set
	const dispatch = useDispatch()

	function toggleFold() {
		dispatch(setPanelFold(!getIsFolded))
	}

	// get firebase data here

	function renderView() {

		switch (target) {
			case 0:
				return <AboutMe />
			case 1:
				return <Portraits />
			case 2:
				return <Illustrations />
			case 3:
				return <Others />

			default:
				return (<>loading</>)
		}
	}

	return (
		<section className={style.PricesWrapper + " snap"} id='offers'>
			{/* background wrapper */}
			<div className={style.pricesContainer}>
				<div className={style.priceNavigator} style={{ width: `${getIsFolded ? 72.72 : 259.76}px` }}>

					<div className={style.s1} style={{ padding: `40px ${getIsFolded ? 6.7 : 30}px` }}>
						{/* hamburg */}
						<Button onClick={toggleFold} titleTooltip='Toggle Menu'>
							<Menu />
						</Button>

						<Button onClick={() => {
							dispatch(setPanelTarget(0))
							if (checkDevice()) {
								dispatch(setPanelFold(true))
							}
						}}
							classItem={target === 0 ? style.btnSelected : ''}
							titleTooltip='About SlamTheDragon'>
							<Logo />
							<span>SlamTheDragon</span>
						</Button>
					</div>

					<div className={style.s2} style={{ padding: `40px ${getIsFolded ? 6.7 : 30}px` }}>
						{/* profile */}
						<Button onClick={() => {
							dispatch(setPanelTarget(1))
							if (checkDevice()) {
								dispatch(setPanelFold(true))
							}
						}}
							classItem={target === 1 ? style.btnSelected : ''}
							titleTooltip='Portraits'>
							<Person />
							<span>Portraits</span>
						</Button>

						{/* illustrations */}
						<Button onClick={() => {
							dispatch(setPanelTarget(2))
							if (checkDevice()) {
								dispatch(setPanelFold(true))
							}
						}}
							classItem={target === 2 ? style.btnSelected : ''}
							titleTooltip='Illustrations'>
							<Panorama />
							<span>Illustrations</span>
						</Button>

						{/* others */}
						<Button onClick={() => {
							dispatch(setPanelTarget(3))
							if (checkDevice()) {
								dispatch(setPanelFold(true))
							}
						}}
							classItem={target === 3 ? style.btnSelected : ''}
							titleTooltip='Others/Special Request'
						>
							<Apps />
							<span>Others</span>
						</Button>
					</div>

					<div className={style.s3} style={{ padding: `40px ${getIsFolded ? 6.7 : 30}px` }}></div>
				</div>

				<div className={style.priceViewer} style={{ width: `${getIsFolded ? 1226.94 : 1041.6}px` }}>
					{renderView()}
				</div>
			</div>
		</section>
	)
}
