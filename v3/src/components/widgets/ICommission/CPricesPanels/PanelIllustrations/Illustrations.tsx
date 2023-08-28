import { useEffect, useState } from 'react'
import Button from '../../../../common/Button'
import IllustrationsHeader from './IllustrationsHeader';
import style from './illustrations.module.scss'

export default function Illustrations() {
    const [getPortraitType, setPortraitType] = useState(0);

    // FIXME: get from firebase
    const portraitValueHead = 130
    const portraitValueHalf = 100

    const getPortraitTypeDetails = ["Character Illustration", "Illustration"]
    const portraitValue = [portraitValueHead, portraitValueHalf]

    function renderView() {

        switch (getPortraitType) {
            case 0:
                return (
                    // this might be the most unreadable code I've ever created ngl
                    <div className={`${style.view}  ${style.bgIlluV1}`}>
                        <IllustrationsHeader headerName={getPortraitTypeDetails} priceArray={portraitValue} priceID={getPortraitType} />
                        <div className={style.description}><strong>Illustrations</strong> | 4k </div>
                    </div>
                )
            case 1:
                return (
                    <div className={`${style.view}  ${style.bgIlluV2}`}>
                        <IllustrationsHeader headerName={getPortraitTypeDetails} priceArray={portraitValue} priceID={getPortraitType} />
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
                    <Button classItem={(getPortraitType === 0) ? style.btnSelected : ''} onClick={() => { setPortraitType(0) }}>Character Illustration</Button>
                    <Button classItem={(getPortraitType === 1) ? style.btnSelected : ''} onClick={() => { setPortraitType(1) }}>Illustration</Button>
                </div>
            </div>
        </div>
    )
}
