import { ReactComponent as Logo } from '../../../assets/svg/SlamTheDragon Logo.svg'
import { ReactComponent as Twitter } from '../../../assets/svg/twitterIcon.svg'
import { ReactComponent as Kofi } from '../../../assets/svg/kofiIcon.svg'
import { ReactComponent as Threads } from '../../../assets/svg/threadsIcon.svg'
import { ReactComponent as Instagram } from '../../../assets/svg/instagramIcon.svg'
import { ReactComponent as Deviant } from '../../../assets/svg/deviantartIcon.svg'
import { ReactComponent as Discord } from '../../../assets/svg/discordIcon.svg'
import style from './footermobile.module.scss'


interface Navigatable {
    tabIndex?: boolean
}

export default function FooterMobile(props: Navigatable) {

    return (
        <footer className={style.footerMobile}>
            <Logo />
            <div className={style.footerHeaderLinks}>
                <div>
                    <a tabIndex={(props.tabIndex) ? 0 : -1} className={style.discord} href="https://discord.gg/GSKdSPgjQb" target="_blank" rel="noreferrer"><Discord /></a>
                </div>
                <div>
                    <a tabIndex={(props.tabIndex) ? 0 : -1} className={style.twitter} href="https://twitter.com/SlamTheDragon" target="_blank" rel="noreferrer"><Twitter /></a>
                </div>
                <div>
                    <a tabIndex={(props.tabIndex) ? 0 : -1} className={style.kofi} href="https://ko-fi.com/slamthedragon" target="_blank" rel="noreferrer"><Kofi /></a>
                </div>
                {/* <div>
                    <a href="https://www.threads.net/@slamthedragon" target="_blank" rel="noreferrer"><Threads /></a>
                </div> */}
                <div>
                    <a tabIndex={(props.tabIndex) ? 0 : -1} className={style.instagram} href="https://www.instagram.com/slamthedragon/" target="_blank" rel="noreferrer"><Instagram /></a>
                </div>
                <div>
                    <a tabIndex={(props.tabIndex) ? 0 : -1} className={style.deviant} href="https://www.deviantart.com/slamdx16" target="_blank" rel="noreferrer"><Deviant /></a>
                </div>
            </div>
            <div className={style.footerHeader}>

                <div className={style.footerText}>
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                        <a tabIndex={(props.tabIndex) ? 0 : -1} href="https://github.com/SlamTheDragon/SlamTheDragon.github.io" target="_blank" rel="noreferrer">Coded With Love <span style={{ fontSize: '7pt' }}>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span> Powered By Github Pages</a>
                    </span>
                    {/* <span>
                        <a href="https://slamthedragon.me/service-and-agreement">Terms of Service & Commissioner Agreement</a>
                    </span> */}
                    <span>
                        © 2023 Written By SlamTheDragon
                    </span>
                </div>

            </div>
        </footer>
    )
}
