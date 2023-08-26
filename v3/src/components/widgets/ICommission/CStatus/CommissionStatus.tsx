import StatusCard, { ColumnID, StatusCardInterface } from './StatusCard';
import style from './commissionStatus.module.scss';

export default function CommissionStatus() {

	const statusData: StatusCardInterface[] = [
		{
			column: ColumnID.TODO,
			previewUrl: 'https://cdn.discordapp.com/avatars/345819451247296516/641a89f38531660a654450d40d5955a5.webp?size=240',
			commID: 7,
			commName: 'SabTheDerg',
			isOnHold: false,
		},
		{
			column: ColumnID.TODO,
			previewUrl: 'https://cdn.discordapp.com/avatars/345819451247296516/641a89f38531660a654450d40d5955a5.webp?size=240',
			commID: 6,
			commName: 'SabTheDerg',
			isOnHold: false,
		},
		{
			column: ColumnID.INPROG,
			previewUrl: 'https://cdn.discordapp.com/avatars/345819451247296516/641a89f38531660a654450d40d5955a5.webp?size=240',
			commID: 5,
			commName: 'Stacy Comms',
			isOnHold: true,
		},
		{
			column: ColumnID.INPROG,
			previewUrl: 'https://cdn.discordapp.com/avatars/345819451247296516/641a89f38531660a654450d40d5955a5.webp?size=240',
			commID: 4,
			commName: 'UAufuh',
			isOnHold: false,
		},
		{
			column: ColumnID.INPROG,
			previewUrl: 'https://cdn.discordapp.com/avatars/345819451247296516/641a89f38531660a654450d40d5955a5.webp?size=240',
			commID: 3,
			commName: 'UAufuh',
			isOnHold: false,
		},
		{
			column: ColumnID.DONE,
			previewUrl: 'https://cdn.discordapp.com/avatars/345819451247296516/641a89f38531660a654450d40d5955a5.webp?size=240',
			commID: 2,
			commName: 'UAufuh',
			isOnHold: false,
		},
		{
			column: ColumnID.INPROG,
			previewUrl: 'https://cdn.discordapp.com/avatars/345819451247296516/641a89f38531660a654450d40d5955a5.webp?size=240',
			commID: 1,
			commName: 'UAufuh',
			isOnHold: false,
		},
	];

	const columns: Record<ColumnID, StatusCardInterface[]> = {
		[ColumnID.TODO]: [],
		[ColumnID.INPROG]: [],
		[ColumnID.DONE]: [],
	};

	// Group the status data by their respective columns
	if (statusData) {
		statusData.forEach((data) => {
			columns[data.column].push(data);
		});
	}

	return (
		<section className={style.statusBoards + ' snap'} id='status'>

			<div className={style.statusHeaderWrapper}>
				<h1>
					Commission Status
				</h1>
			</div>

			<div className={style.columnWrapper}>
				<div className={`${style.column} ${style.colA}`}>
					<div className={`${style.colHeader} ${style.colHeaderA}`}>
						<h3>
							Done
						</h3>
					</div>
					<div className={`${style.colBody} ${style.colBodyA}`}>
						{columns[ColumnID.DONE].map((data, index) => (
							<StatusCard key={index} {...data} />
						))}
					</div>
				</div>
				<div className={`${style.column} ${style.colB}`}>
					<div className={`${style.colHeader} ${style.colHeaderB}`}>
						<h3>
							In-Progress
						</h3>
					</div>
					<div className={`${style.colBody} ${style.colBodyB}`}>
						{columns[ColumnID.INPROG].map((data, index) => (
							<StatusCard key={index} {...data} />
						))}
					</div>
				</div>
				<div className={`${style.column} ${style.colC}`}>
					<div className={`${style.colHeader} ${style.colHeaderC}`}>
						<h3>
							TODO
						</h3>
					</div>
					<div className={`${style.colBody} ${style.colBodyC}`}>
						{columns[ColumnID.TODO].map((data, index) => (
							<StatusCard key={index} {...data} />
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
