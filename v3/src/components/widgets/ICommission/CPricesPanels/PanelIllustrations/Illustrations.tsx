import { useEffect, useState } from 'react'
import { GetSnapshot, SnapshotNotify } from '../../../../../utils/firebase/getsnapshot';
import Button from '../../../../common/Button'
import IllustrationsHeader from './IllustrationsHeader';
import style from './illustrations.module.scss'


export default function Illustrations() {
    const [getIllustrationType, setIllustrationType] = useState(0);
    const [illusValueCharacter, setIllusValueCharacter] = useState(Object.values(GetSnapshot.startingPrices)[0])
    const [illusValue, setIllusValue] = useState(Object.values(GetSnapshot.startingPrices)[4])
    const getPortraitTypeDetails = ["Character Illustration", "Illustration"]
    const portraitValue = [illusValueCharacter, illusValue]

    useEffect(() => {
        const change = () => {
            setIllusValueCharacter(Object.values(GetSnapshot.startingPrices)[0])
            setIllusValue(Object.values(GetSnapshot.startingPrices)[4])
        }

        SnapshotNotify.addSnapshotListener(change)

        return (() => {
            SnapshotNotify.removeSnapshotListener(change)
        })
    }, [])


    function renderView() {
        switch (getIllustrationType) {
            case 0:
                return (
                    <div className={`${style.view} ${style.bgIlluV1}`}>
                        {(illusValueCharacter === undefined)? <h1>Loading Prices...</h1> : <IllustrationsHeader headerName={getPortraitTypeDetails} priceArray={portraitValue} priceID={getIllustrationType} />}
                        <div className={style.description}><strong>Illustrations</strong> | 4k </div>
                    </div>
                )
            case 1:
                return (
                    <div className={`${style.view} ${style.bgIlluV2}`}>
                        {(illusValue === undefined)? <h1>Loading Prices...</h1> : <IllustrationsHeader headerName={getPortraitTypeDetails} priceArray={portraitValue} priceID={getIllustrationType} />}
                        <div className={style.description}><strong>Illustrations</strong> | 4k </div>
                    </div>
                )

            default:
                return (<>loading</>)
        }
    }

    return (
        <div className={style.PortraitsContainer}>

            {/* FIXME: make conditional when firebase is in */}
            <div className={style.content}>
                {renderView()}
            </div>

            <div className={style.navigator}>
                <div className={style.subNavigator}>
                    <Button classItem={(getIllustrationType === 0) ? style.btnSelected : ''} onClick={() => { setIllustrationType(0) }}>Character Illustration</Button>
                    <Button classItem={(getIllustrationType === 1) ? style.btnSelected : ''} onClick={() => { setIllustrationType(1) }}>Illustration</Button>
                </div>
            </div>
        </div>
    )
}
