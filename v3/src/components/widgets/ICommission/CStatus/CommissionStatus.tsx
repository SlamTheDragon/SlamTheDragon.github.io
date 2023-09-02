import { useEffect, useState } from 'react'
import { ReactComponent as Logo } from '../../../../assets/svg/SlamTheDragon Logo.svg'
import StatusCard, { ColumnID, StatusCardInterface } from './StatusCard'
import { GetSnapshot } from '../../../../utils/firebase/getsnapshot'
import ChipTextLoader from '../../../common/ChipTextLoader/ChipTextLoader'
import style from './commissionStatus.module.scss'


export default function CommissionStatus() {
	const [availability, setAvailability] = useState<number | undefined>(GetSnapshot.availability)
	const [availabilityBar, setAvailabilityBar] = useState<number>(0)
	const [queueLimit, setQueueLimit] = useState<number | undefined>(GetSnapshot.queueLimit)
	const [status, setStatus] = useState<boolean | undefined>(GetSnapshot.status);
	const [onHold, setOnHold] = useState<boolean | undefined>(GetSnapshot.onHold);
	const columns: Record<ColumnID, StatusCardInterface[]> = {
		[ColumnID.TODO]: [],
		[ColumnID.INPROG]: [],
		[ColumnID.DONE]: [],
	}
	const queueTotal = columns[ColumnID.TODO].length + columns[ColumnID.INPROG].length


	useEffect(() => {
		const change = () => {
			if (GetSnapshot.availability) {
				setAvailabilityBar(GetSnapshot.availability)
			}
			setAvailability(GetSnapshot.availability)
			setQueueLimit(GetSnapshot.queueLimit)
			setStatus(GetSnapshot.status)
			setOnHold(GetSnapshot.onHold)
		}
		
		GetSnapshot.addSnapshotListener(change)
		return () => {
			GetSnapshot.removeSnapshotListener(change)
		}
	}, [])

	// List all artworks in TODO, IN-PROGRESS, and DONE column
	const statusData: StatusCardInterface[] = [
		{
			column: ColumnID.INPROG,
			previewUrl: 'https://media.discordapp.net/attachments/1088311530606563338/1146406555542114371/image.png?width=336&height=125',
			commID: 1,
			commName: 'Name',
			isOnHold: false,
		},
		{
			column: ColumnID.TODO,
			previewUrl: 'https://media.discordapp.net/attachments/1088311530606563338/1146406555542114371/image.png?width=336&height=125',
			commID: 2,
			commName: 'Name',
			isOnHold: false,
		},
		{
			column: ColumnID.DONE,
			previewUrl: 'https://media.discordapp.net/attachments/1088311530606563338/1146406555542114371/image.png?width=336&height=125',
			commID: 3,
			commName: 'Name',
			isOnHold: false,
		},
		{
			column: ColumnID.INPROG,
			previewUrl: 'https://media.discordapp.net/attachments/1088311530606563338/1146406555542114371/image.png?width=336&height=125',
			commID: 4,
			commName: 'Name',
			isOnHold: true,
		},
	]

	// Group the status data by their respective columns
	if (statusData) {
		statusData.forEach((data) => {
			columns[data.column].push(data)
		})
	}

	function renderStatus() {
		if (GetSnapshot.status === undefined) {
			return <ChipTextLoader />
		}
		if (GetSnapshot.onHold === undefined) {
			return <ChipTextLoader />
		}

		if (onHold) {
			return <>Paused</>
		}
		if (status) {
			return <>Open</>
		}
		if (!status) {
			return <>Closed</>
		}
	}

	function renderQueueLimit() {
		if (queueLimit === undefined) {
			return <>&bull;</>
		}
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
						<strong>Availability:</strong> <div className={style.sHCPaintB}><span>Busy</span></div> <div className={style.sHCPaintR}><span>Reachable</span></div> <div className={style.sHCPaintProgress} style={{ background: `linear-gradient(90deg, #8c45ff ${availabilityBar}%, #7684a2 ${availabilityBar + 0.1}%)` }}> {availability}% Busy</div>
					</div>
					<div className={style.sHC2}>
						<strong>Queue:</strong> {queueTotal} / {renderQueueLimit()}
					</div>
					<div className={style.sHC3}>
						Status:&nbsp;&nbsp;<strong>{renderStatus()}</strong>
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
							<StatusCard key={index} {...data} isTargetedOnHold={onHold} />
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
