import style from './commissionPrices.module.scss';

export default function CommissionPrices() {
	return (
		<section className={style.PricesWrapper + " snap"} id='a'>
			DESKTOP WRAPPER	
			<div className={style.priceNavigator}>selection</div>
			<div className={style.priceViewer}>viewer</div>
		</section>
	)
}
