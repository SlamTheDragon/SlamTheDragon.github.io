import { useState } from 'react'
import { ReactComponent as Menu } from '@material-design-icons/svg/outlined/menu.svg'
import { ReactComponent as Person } from '@material-design-icons/svg/outlined/person.svg'
import { ReactComponent as Panorama } from '@material-design-icons/svg/outlined/panorama.svg'
import { ReactComponent as Apps } from '@material-design-icons/svg/outlined/apps.svg'
import { ReactComponent as Logo } from '../../../../assets/svg/SlamTheDragon Logo.svg'
import style from './commissionPrices.module.scss'
import Button from '../../../common/Button/Button'

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

	function renderView(target: Target | null) {
		switch (target) {
			case Target.A:
				
				return (
					<>
						a
					</>
				);
			case Target.B:
				
				return (
					<>
						b
					</>
				);
			case Target.C:
				
				return (
					<>
						c
					</>
				);
			case Target.D:
				
				return (
					<>
						d
					</>
				);

			default:
				return (
					<>
						loading
					</>
				)
		}
	}

	return (
		<section className={style.PricesWrapper + " snap"} id='a'>
			{/* background wrapper */}
			<div className={style.pricesContainer}>
				<div className={style.priceNavigator} style={{ width: `${getIsFolded ? 5.6 : 20}%` }}>

					<div className={style.s1}>
						{/* hamburg */}
						<Button onClick={toggleFold}>
							<Menu />
						</Button>

						<Button onClick={
							() => {
								setTarget(Target.A)
							}}
							classItem={getTarget === Target.A ? style.btnSelected : ''}
						>
							<Logo />

							{/* {getIsFolded ? null : <span>SlamTheDragon</span>} */}
							<span>SlamTheDragon</span>
						</Button>
					</div>

					<div className={style.s2}>
						{/* profile */}
						<Button onClick={
							() => {
								setTarget(Target.B)
							}}
							classItem={getTarget === Target.B ? style.btnSelected : ''}
						>
							<Person />

							{/* {getIsFolded ? null : <span>Portraits</span>} */}
							<span>Portraits</span>
						</Button>

						{/* illustrations */}
						<Button onClick={
							() => {
								setTarget(Target.C)
							}}
							classItem={getTarget === Target.C ? style.btnSelected : ''}
						>
							<Panorama />

							{/* {getIsFolded ? null : <span>Illustrations</span>} */}
							<span>Illustrations</span>
						</Button>

						{/* others */}
						<Button onClick={
							() => {
								setTarget(Target.D)
							}}
							classItem={getTarget === Target.D ? style.btnSelected : ''}
						>
							<Apps />

							{/* {getIsFolded ? null : <span>Others</span>} */}
							<span>Others</span>
						</Button>
					</div>

					<div className={style.s3}>
						{/* {getIsFolded ? null : <span>Join my Discord!</span>} */}
					</div>
				</div>

				<div className={style.priceViewer} style={{ width: `${getIsFolded ? 94.4 : 80}%` }}>
					{getTarget !== null && renderView(getTarget)}
				</div>
			</div>
		</section>
	)
}
