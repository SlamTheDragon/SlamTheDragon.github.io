import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { GetSnapshot, SnapshotNotify } from '../../../../../utils/firebase/getsnapshot'
import { setPanelFold } from '../../../../slice/commission-panel-slices/collapseNavSlice'
import Button from '../../../../common/Button'
import PortraitHeader from './PortraitHeader'
import style from './portraits.module.scss'


export default function Portraits() {
    const [getBackgroundType, setBackgroundType] = useState(false)
    const [getBackgroundTypeDecoded, setDecodedBackgroundType] = useState(0)
    const [getPortraitType, setPortraitType] = useState(0)
    const [portraitValueHead, setPortraitValueHead] = useState(Object.values(GetSnapshot.startingPrices)[3])
    const [portraitValueHalf, setPortraitValueHalf] = useState(Object.values(GetSnapshot.startingPrices)[2])
    const [portraitValueFull, setPortraitValueFull] = useState(Object.values(GetSnapshot.startingPrices)[1])
    const backgroundTypeDetails = ["Simple Background", "With Background"]
    const getPortraitTypeDetails = ["Headshot", "Halfshot", "Fullshot"]
    const portraitValue = [portraitValueHead, portraitValueHalf, portraitValueFull]


    // const openModal = new ModalOperation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (getBackgroundType) {
            setDecodedBackgroundType(1)
        } else {
            setDecodedBackgroundType(0)
        }
    }, [getBackgroundType])

    useEffect(() => {
        const change = () => {
            setPortraitValueHead(Object.values(GetSnapshot.startingPrices)[3])
            setPortraitValueHalf(Object.values(GetSnapshot.startingPrices)[2])
            setPortraitValueFull(Object.values(GetSnapshot.startingPrices)[1])
        }

        SnapshotNotify.addSnapshotListener(change)

        return (() => {
            SnapshotNotify.removeSnapshotListener(change)
        })
    }, [])


    function renderView() {
        switch (getPortraitType) {
            case 0:
                return (
                    // this might be the most unreadable code I've ever created ngl
                    <div className={`${style.view}  ${getBackgroundType ? style.nbgV1 : style.bgV1}`}>
                        {(portraitValueHead === undefined) ? <h1>Loading Prices...</h1> : <PortraitHeader headerName={getPortraitTypeDetails} priceArray={portraitValue} priceID={getPortraitType} isBackground={getBackgroundType} />}
                        <div className={style.description}><strong>Portraits</strong> | 2k res | Square</div>
                    </div>
                )
            case 1:
                return (
                    <div className={`${style.view}  ${getBackgroundType ? style.nbgV2 : style.bgV2}`}>
                        {(portraitValueHalf === undefined) ? <h1>Loading Prices...</h1> : <PortraitHeader headerName={getPortraitTypeDetails} priceArray={portraitValue} priceID={getPortraitType} isBackground={getBackgroundType} />}
                        <div className={style.description}><strong>Portraits</strong> | 4k res | Vertical Portrait</div>
                    </div>
                )
            case 2:
                return (
                    <div className={`${style.view}  ${getBackgroundType ? style.nbgV3 : style.bgV3}`}>
                        {(portraitValueFull === undefined) ? <h1>Loading Prices...</h1> : <PortraitHeader headerName={getPortraitTypeDetails} priceArray={portraitValue} priceID={getPortraitType} isBackground={getBackgroundType} />}
                        <div className={style.description}><strong>Portraits</strong> | 4k+ res | Vertical Portrait/Landscape</div>
                    </div>
                )

            default:
                return (<>loading</>)
        }
    }

    return (
        <div className={style.PortraitsContainer}>
            <div className={style.content}>
                {renderView()}
            </div>

            <div className={style.navigator}>
                <div className={style.subNavigator}>
                    <Button classItem={(getPortraitType === 0) ? style.btnSelected : ''} onClick={() => { setPortraitType(0); dispatch(setPanelFold(true)) }}>Headshot</Button>
                    <Button classItem={(getPortraitType === 1) ? style.btnSelected : ''} onClick={() => { setPortraitType(1); dispatch(setPanelFold(true)) }}>Halfshot</Button>
                    <Button classItem={(getPortraitType === 2) ? style.btnSelected : ''} onClick={() => { setPortraitType(2); dispatch(setPanelFold(true)) }}>Fullshot</Button>
                </div>
                <div className={style.previewSwitch}>
                    <Button onClick={() => { setBackgroundType(!getBackgroundType); dispatch(setPanelFold(true)) }}>{backgroundTypeDetails[getBackgroundTypeDecoded]}</Button>
                </div>
            </div>
        </div>
    )
}
