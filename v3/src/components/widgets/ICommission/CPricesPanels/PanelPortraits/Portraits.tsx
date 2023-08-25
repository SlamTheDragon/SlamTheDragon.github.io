import { useEffect, useState } from 'react'
import { useModalOperation } from '../../../../../utils/component-utils/modalOperation';
import { useDispatch } from 'react-redux';
import Button from '../../../../common/Button'
import PortraitHeader from './PortraitHeader';
import style from './portraits.module.scss'

export default function Portraits() {
    const [getBackgroundType, setBackgroundType] = useState(false);
    const [getBackgroundTypeDecoded, setDecodedBackgroundType] = useState(0);
    const [getPortraitType, setPortraitType] = useState(0);

    const dispatch = useDispatch()
    const openModal = useModalOperation()

    useEffect(() => {
        if (getBackgroundType) {
            setDecodedBackgroundType(1)
        } else {
            setDecodedBackgroundType(0)
        }
    }, [getBackgroundType]);

    // FIXME: get from firebase
    const portraitValueHead = 30
    const portraitValueHalf = 42
    const portraitValueFull = 60

    const backgroundTypeDetails = ["Simple Background", "With Background"]
    const getPortraitTypeDetails = ["Headshot", "Halfshot", "Fullshot"]
    const portraitValue = [portraitValueHead, portraitValueHalf, portraitValueFull]

    function renderView() {

        switch (getPortraitType) {
            case 0:
                return (
                    // this might be the most unreadable code I've ever created ngl
                    <div className={`${style.view}  ${getBackgroundType ? style.nbgV1 : style.bgV1}`}>
                        <PortraitHeader headerName={getPortraitTypeDetails} priceArray={portraitValue} priceID={getPortraitType} isBackground={getBackgroundType} />
                        <div className={style.description}><strong>Portraits</strong> | 2k res | Square</div>
                    </div>
                )
            case 1:
                return (
                    <div className={`${style.view}  ${getBackgroundType ? style.nbgV2 : style.bgV2}`}>
                        <PortraitHeader headerName={getPortraitTypeDetails} priceArray={portraitValue} priceID={getPortraitType} isBackground={getBackgroundType} />
                        <div className={style.description}><strong>Portraits</strong> | 4k res | Vertical Portrait</div>
                    </div>
                )
            case 2:
                return (
                    <div className={`${style.view}  ${getBackgroundType ? style.nbgV3 : style.bgV3}`}>
                        <PortraitHeader headerName={getPortraitTypeDetails} priceArray={portraitValue} priceID={getPortraitType} isBackground={getBackgroundType} />
                        <div className={style.description}><strong>Portraits</strong> | 4k+ res | Vertical Portrait/Landscape</div>
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
                    <Button classItem={(getPortraitType === 0) ? style.btnSelected : ''} onClick={() => { setPortraitType(0) }}>Headshot</Button>
                    <Button classItem={(getPortraitType === 1) ? style.btnSelected : ''} onClick={() => { setPortraitType(1) }}>Halfshot</Button>
                    <Button classItem={(getPortraitType === 2) ? style.btnSelected : ''} onClick={() => { setPortraitType(2) }}>Fullshot</Button>
                </div>
                <Button onClick={() => { setBackgroundType(!getBackgroundType) }}>{backgroundTypeDetails[getBackgroundTypeDecoded]}</Button>
            </div>
        </div>
    )
}
