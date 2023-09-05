import { useEffect, useState } from 'react'
import { ReactComponent as Logo } from '../../../../assets/svg/SlamTheDragon Logo.svg'
import { GetSnapshot, SnapshotNotify } from '../../../../utils/firebase/getsnapshot'
import { ContentBuilder, ContentColumnID } from '../../../../utils/firebase/contentbuilders'
import StatusCard from './StatusCard'
import ChipTextLoader from '../../../common/ChipTextLoader/ChipTextLoader'
import style from './commissionStatus.module.scss'


export default function CommissionStatus() {
	const [availability, setAvailability] = useState<number | undefined>(GetSnapshot.availability)
	const [availabilityBar, setAvailabilityBar] = useState<number>(0)
	const [queueLimit, setQueueLimit] = useState<number | undefined>(GetSnapshot.queueLimit)
	const [status, setStatus] = useState<boolean | undefined>(GetSnapshot.status)
	const [onHold, setOnHold] = useState<boolean | undefined>(GetSnapshot.onHold)
	const [columns, setColumn] = useState(ContentBuilder.columns)
	const [queueTotal, setQueueTotal] = useState(ContentBuilder.columns[ContentColumnID.TODO].length)

	useEffect(() => {
		const change = () => {
			if (GetSnapshot.availability) {
				setAvailabilityBar(GetSnapshot.availability)
			}
			setAvailability(GetSnapshot.availability)
			setQueueLimit(GetSnapshot.queueLimit)
			setStatus(GetSnapshot.status)
			setOnHold(GetSnapshot.onHold)
			setQueueTotal(ContentBuilder.columns[ContentColumnID.TODO].length)
			setColumn(ContentBuilder.columns)
		}

		SnapshotNotify.addSnapshotListener(change)
		return () => {
			SnapshotNotify.removeSnapshotListener(change)
		}
	}, [])

	// cant rerender lol
	function renderMappedCards(column: ContentColumnID) {
		if (column === ContentColumnID.INPROG) {
			return columns[column].map((data, index) => (<StatusCard key={index} {...data} isGlobalOnHold={onHold} />))
		}
		return columns[column].map((data, index) => (<StatusCard key={index} {...data} isGlobalOnHold={false} />))
	}

	function renderStatus() {
		if ((GetSnapshot.status || GetSnapshot.onHold) === undefined) {
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
						<strong>Availability:</strong>
						<div className={style.sHCPaintProgress} style={{ background: `linear-gradient(90deg, #8c45ff ${availabilityBar}%, #7684a2 ${availabilityBar + 0.1}%)` }}> {availability}% Busy</div>
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
						{renderMappedCards(ContentColumnID.DONE)}
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
						{renderMappedCards(ContentColumnID.INPROG)}
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
						{renderMappedCards(ContentColumnID.TODO)}
						<div className={style.theBottom}>
							&bull;
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
