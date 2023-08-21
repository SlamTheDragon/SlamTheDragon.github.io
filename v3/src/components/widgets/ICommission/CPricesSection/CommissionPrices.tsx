import { ReactComponent as Menu } from '@material-design-icons/svg/outlined/menu.svg'
import { ReactComponent as Person } from '@material-design-icons/svg/outlined/person.svg'
import { ReactComponent as Panorama } from '@material-design-icons/svg/outlined/panorama.svg'
import { ReactComponent as Apps } from '@material-design-icons/svg/outlined/apps.svg'
import style from './commissionPrices.module.scss';

export default function CommissionPrices() {


	return (
		<section className={style.PricesWrapper + " snap"} id='a'>
			{/* background wrapper */}
			<div className={style.pricesContainer}>

				<div className={style.priceNavigator}>
					<div>
						{/* hamburg */}

						<Menu />
					</div>
					<div>
						{/* profile */}

						<Person />

						<div>
							Text
						</div>
					</div>
					<div>
						{/* illustrations */}

						<Panorama />

						<div>
							Text
						</div>
					</div>
					<div>
						{/* others */}

						<Apps />

						<div>
							Text
						</div>
					</div>
				</div>

				<div className={style.priceViewer}>
					logical rendering here
				</div>
			</div>
		</section>
	)
}
