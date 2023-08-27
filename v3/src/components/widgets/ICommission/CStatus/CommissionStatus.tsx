import { ReactComponent as Logo } from '../../../../assets/svg/SlamTheDragon Logo.svg';
import StatusCard, { ColumnID, StatusCardInterface } from './StatusCard';
import style from './commissionStatus.module.scss';

export default function CommissionStatus() {
	// List all artworks in TODO, IN-PROGRESS, and DONE columns
	// FIXME: use firebase lol
	const statusData: StatusCardInterface[] = [
		// {
		// 	column: ColumnID.TODO,
		// 	previewUrl: '',
		// 	commID: 1,
		// 	commName: 'Name',
		// 	isOnHold: false,
		// },
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

	// OBTAIN A SELECTION OF PROFILE DATA
	let queueLimit = -1
	const queueTotal = columns[ColumnID.TODO].length + columns[ColumnID.INPROG].length
	const availability = 0
	let parsedStatus = 0
	const isOnHold = false

	function parseStatus() {
		if (isOnHold) {
			return <>Paused</>
		}
		if (parsedStatus === 0) {
			return <>Closed</>
		}
		if (parsedStatus === 1) {
			return <>Open</>
		}

		return <>Closed</>
	}


	function renderQueueLimit() {
		if (queueLimit === -1) {
			return <>&#8734;</>
		}

		return <>{queueLimit}</>
	}

	return (
		<section className={style.statusBoards + ' snap'} id='status'>

			<div className={style.statusHeaderWrapper}>
				<h1>
					<Logo />
					Commission Status
				</h1>
				<div className={style.statusHeaderContainer}>
					<div className={style.sHC1}>
						<strong>Availability:</strong> <div className={style.sHCPaintB}><span>Busy</span></div> <div className={style.sHCPaintR}><span>Reachable</span></div> <div className={style.sHCPaintProgress} style={{ background: `linear-gradient(90deg, #8c45ff ${availability}%, #7684a2 ${availability + 0.1}%)` }}> {availability}% </div>
					</div>
					<div className={style.sHC2}>
						<strong>Queue:</strong> {queueTotal} / {renderQueueLimit()}
					</div>
					<div className={style.sHC3}>
						Status:&nbsp;&nbsp;<strong>{parseStatus()}</strong>
					</div>
				</div>
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
						<div className={style.theBottom}>
							&bull;
						</div>
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
							<StatusCard key={index} {...data} isTargetedOnHold={isOnHold} />
						))}
						<div className={style.theBottom}>
							&bull;
						</div>
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
						<div className={style.theBottom}>
							&bull;
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
