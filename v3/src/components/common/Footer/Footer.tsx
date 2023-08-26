import { ReactComponent as Logo } from '../../../assets/svg/SlamTheDragon Logo.svg'
import { ReactComponent as Twitter } from '../../../assets/svg/twitterIcon.svg'
import { ReactComponent as Threads } from '../../../assets/svg/threadsIcon.svg'
import { ReactComponent as Instagram } from '../../../assets/svg/instagramIcon.svg'
import { ReactComponent as Deviant } from '../../../assets/svg/deviantartIcon.svg'
import { ReactComponent as Discord } from '../../../assets/svg/discordIcon.svg'
import style from './footer.module.scss'


export default function Footer() {

    return (
        <footer style={style}>
            <div className={style.footerHeader}>

                {/* <img draggable="false" alt='logo' src={logo} width={130} height={130} /> */}
                <Logo />

                <div className={style.footerText}>
                    <span style={{display:'flex', alignItems:'center'}}>
                        <a href="https://github.com/SlamTheDragon/SlamTheDragon.github.io" target="_blank" rel="noreferrer">Coded With Love <span style={{ fontSize: '7pt' }}>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span> Powered By Github Pages</a>
                    </span>
                    <span>
                        <a href="https://slamthedragon.me/service-and-agreement">Terms of Service & Commissioner Agreement</a>
                    </span>
                    <span>
                        © 2023 Written By SlamTheDragon
                    </span>
                </div>

            </div>

            <div className={style.footerHeaderLinks + ' snap'}>
                <div>
                    <a className={style.discord} href="https://discord.gg/GSKdSPgjQb" target="_blank" rel="noreferrer"><Discord /></a>
                </div>
                <div>
                    <a className={style.twitter} href="https://twitter.com/SlamTheDragon" target="_blank" rel="noreferrer"><Twitter /></a>
                </div>
                <div>
                    <a href="https://www.threads.net/@slamthedragon" target="_blank" rel="noreferrer"><Threads /></a>
                </div>
                <div>
                    <a className={style.instagram} href="https://www.instagram.com/slamthedragon/" target="_blank" rel="noreferrer"><Instagram /></a>
                </div>
                <div>
                    <a className={style.deviant} href="https://www.deviantart.com/slamdx16" target="_blank" rel="noreferrer"><Deviant /></a>
                </div>
            </div>
        </footer>
    )
}