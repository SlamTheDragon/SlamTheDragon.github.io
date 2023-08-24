import { useState } from 'react'
import { ReactComponent as Menu } from '@material-design-icons/svg/outlined/menu.svg'
import { ReactComponent as Person } from '@material-design-icons/svg/outlined/person.svg'
import { ReactComponent as Panorama } from '@material-design-icons/svg/outlined/panorama.svg'
import { ReactComponent as Apps } from '@material-design-icons/svg/outlined/apps.svg'
import { ReactComponent as Logo } from '../../../../assets/svg/SlamTheDragon Logo.svg'
import AboutMe from '../CPricesPanels/PanelAboutMe/'
import Portraits from '../CPricesPanels/PanelPortraits/'
import Button from '../../../common/Button'
import Illustrations from '../CPricesPanels/PanelIllustrations/Illustrations'
import Others from '../CPricesPanels/PanelOthers/Others'
import style from './commissionPrices.module.scss'

enum Target {
	A,
	B,
	C,
	D,
}

export default function CommissionPrices() {
	const [getIsFolded, setIsFolded] = useState(false)
	const [getTarget, setTarget] = useState<Target | null>(Target.A)

	function toggleFold() {
		setIsFolded(current => !current)
	}

	// get firebase data here

	function renderView(target: Target | null) {
		switch (target) {
			case Target.A:
				return <AboutMe />
			case Target.B:
				return <Portraits />
			case Target.C:
				return <Illustrations />
			case Target.D:
				return <Others />

			default:
				return (<>loading</>)
		}
	}

	return (
		<section className={style.PricesWrapper + " snap"} id='a'>
			{/* background wrapper */}
			<div className={style.pricesContainer}>
				<div className={style.priceNavigator} style={{ width: `${getIsFolded ? 72.72 : 259.76}px` }}>

					<div className={style.s1} style={{ padding: `40px ${getIsFolded ? 6.7 : 30}px` }}>
						{/* hamburg */}
						<Button onClick={toggleFold} titleTooltip='Toggle Menu'>
							<Menu />
						</Button>

						<Button onClick={() => { setTarget(Target.A) }}
							classItem={getTarget === Target.A ? style.btnSelected : ''}
							titleTooltip='About SlamTheDragon'>
							<Logo />

							{/* {getIsFolded ? null : <span>SlamTheDragon</span>} */}
							<span>SlamTheDragon</span>
						</Button>
					</div>

					<div className={style.s2} style={{ padding: `40px ${getIsFolded ? 6.7 : 30}px` }}>
						{/* profile */}
						<Button onClick={() => { setTarget(Target.B) }}
							classItem={getTarget === Target.B ? style.btnSelected : ''}
							titleTooltip='Portraits'>
							<Person />

							{/* {getIsFolded ? null : <span>Portraits</span>} */}
							<span>Portraits</span>
						</Button>

						{/* illustrations */}
						<Button onClick={() => { setTarget(Target.C) }}
							classItem={getTarget === Target.C ? style.btnSelected : ''}
							titleTooltip='Illustrations'>
							<Panorama />

							{/* {getIsFolded ? null : <span>Illustrations</span>} */}
							<span>Illustrations</span>
						</Button>

						{/* others */}
						<Button onClick={() => { setTarget(Target.D) }}
							classItem={getTarget === Target.D ? style.btnSelected : ''}
							titleTooltip='Others/Special Request'
						>
							<Apps />

							{/* {getIsFolded ? null : <span>Others</span>} */}
							<span>Others</span>
						</Button>
					</div>

					<div className={style.s3} style={{ padding: `40px ${getIsFolded ? 6.7 : 30}px` }}></div>
				</div>

				<div className={style.priceViewer} style={{ width: `${getIsFolded ? 1226.94 : 1041.6}px` }}>
					{getTarget !== null && renderView(getTarget)}
				</div>
			</div>
		</section>
	)
}
