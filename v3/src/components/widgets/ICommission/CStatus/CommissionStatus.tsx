import style from './commissionStatus.module.scss';

export default function CommissionStatus() {
	return (
		<section className={style.statusBoards + ' snap'}>
			<div className={style.column} id='status'>
				CommissionStatus
			</div>	
		</section>
	)
}
