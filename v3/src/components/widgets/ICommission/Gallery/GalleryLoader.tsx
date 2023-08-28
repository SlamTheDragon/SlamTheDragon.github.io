import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg';
import style from './galleryloader.module.scss'

export default function GalleryLoader() {

    return (
        <>
            <div className={style.galleryRow}>
                <div className={`${style.galleryCardLoader} ${style.widthA}`}>
                    {/* <div className={style.galleryOpen}>
                        Open <Open />
                    </div> */}
                </div>
                <div className={`${style.galleryCardLoader} ${style.widthB}`}></div>
                <div className={`${style.galleryCardLoader} ${style.widthC}`}></div>

                <div className={`${style.galleryCardLoader} ${style.widthB}`}></div>
                <div className={`${style.galleryCardLoader} ${style.widthC}`}></div>
                <div className={`${style.galleryCardLoader} ${style.widthA}`}></div>
            </div>
            {/* <div className={style.galleryRow}>
                <div className={`${style.galleryCardLoader} ${style.widthC}`}></div>
                <div className={`${style.galleryCardLoader} ${style.widthA}`}></div>
                <div className={`${style.galleryCardLoader} ${style.widthB}`}></div>

                <div className={`${style.galleryCardLoader} ${style.widthB}`}></div>
                <div className={`${style.galleryCardLoader} ${style.widthC}`}></div>
                <div className={`${style.galleryCardLoader} ${style.widthA}`}></div>
            </div> */}
        </>
    )
}
