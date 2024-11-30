import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg';
import { ContentInterface } from '../../../../../utils/firebase/contentbuilders';
import style from './gallerycard.module.scss'


export default function GalleryCard(props: ContentInterface) {
    
    function getWidth() {
        if (props.classSelector === 'widthA') {
            return style.widthA
        }
        if (props.classSelector === 'widthB') {
            return style.widthB
        }
        if (props.classSelector === 'widthC') {
            return style.widthC
        }
    }

    return (
        <div className={`${style.galleryCard} ${getWidth()}`} style={{ backgroundImage: `url(${props.thumbnail})` }} tabIndex={0} onClick={() => { window.location.href = `${props.socialMediaLink}` }} onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") { window.location.href = `${props.socialMediaLink}` }
        }}>
            <div className={style.galleryOpen}>
                Open <Open />
            </div>
        </div>
    )
}
