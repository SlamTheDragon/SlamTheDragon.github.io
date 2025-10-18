import { ReactComponent as Open } from '@material-design-icons/svg/outlined/open_in_new.svg';
import { ReactComponent as Menu } from '@material-design-icons/svg/outlined/menu.svg'
import { ReactComponent as Tag } from '@material-design-icons/svg/outlined/tag.svg'
import { ReactComponent as Logo } from '../../assets/svg/SlamTheDragon Logo.svg'
import { useEffect, useRef, useState } from 'react';
import { checkDevice } from '../../utils/device-checker/checkDevice';
import { useDispatch, useSelector } from 'react-redux';
import { scrollStyleEffect, setScrollLayer } from '../slice/parallaxScrollerSlice';
import Footer from '../common/Footer'
import Button from '../common/Button';
import FooterMobile from '../common/FooterMobile';
import style from './interface.module.scss'


/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    const [isNavOpen, setNavOpen] = useState(false)
    const visibleA = useRef<HTMLDivElement | null>(null)
    const visibleB = useRef<HTMLDivElement | null>(null)
    const visibleC = useRef<HTMLDivElement | null>(null)
    const visibleD = useRef<HTMLDivElement | null>(null)
    const visibleE = useRef<HTMLDivElement | null>(null)
    const visibleF = useRef<HTMLDivElement | null>(null)
    const scrollVal = useSelector(scrollStyleEffect)
    const dispatch = useDispatch()

    useEffect(() => {
        window.addEventListener('scroll', notify);

        return () => {
            window.removeEventListener('scroll', notify)
        }
    }, [visibleA,
        visibleB,
        visibleC,
        visibleD,
        visibleE,
        visibleF])

    function clearHighlight() {
        const a = document.getElementById('selOverview')
        const b = document.getElementById('selTerms')
        const c = document.getElementById('selContent')
        const d = document.getElementById('selArrangement')
        const e = document.getElementById('selConditions')
        const f = document.getElementById('selRights')

        if (a && b && c && d && e && f) {
            a.removeAttribute('style')
            b.removeAttribute('style')
            c.removeAttribute('style')
            d.removeAttribute('style')
            e.removeAttribute('style')
            f.removeAttribute('style')
        }
    }

    function handleA() {
        clearHighlight()
        const bar = document.getElementById('selOverview')
        if (bar) {
            bar.style.color = '#1282e4'
        }
    }
    function handleB() {
        clearHighlight()
        const bar = document.getElementById('selTerms')
        if (bar) {
            bar.style.color = '#1282e4'
        }
    }
    function handleC() {
        clearHighlight()
        const bar = document.getElementById('selContent')
        if (bar) {
            bar.style.color = '#1282e4'
        }
    }
    function handleD() {
        clearHighlight()
        const bar = document.getElementById('selArrangement')
        if (bar) {
            bar.style.color = '#1282e4'
        }
    }
    function handleE() {
        clearHighlight()
        const bar = document.getElementById('selConditions')
        if (bar) {
            bar.style.color = '#1282e4'
        }
    }
    function handleF() {
        clearHighlight()
        const bar = document.getElementById('selRights')
        if (bar) {
            bar.style.color = '#1282e4'
        }
    }

    function toggleNav() {
        setNavOpen(!isNavOpen)
    }

    function sidebarList(text: string, header: boolean) {
        if (header) {
            return <a className={style.sidebarTitle} href={`#${text.toLocaleLowerCase()}`} id={`sel${text}`}><h3>{text}</h3></a>
        }
        else {
            return <a className={style.sidebarTitle} href={`#${text.toLocaleLowerCase()}`} id={`sel${text}`}><h4>{text}</h4></a>
        }
    }

    function transferScrollData(event: { currentTarget: { scrollTop: number; }; }) {
        dispatch(setScrollLayer(event.currentTarget.scrollTop))
        notify()
    }

    function notify() {
        if (
            visibleA.current &&
            visibleB.current &&
            visibleC.current &&
            visibleD.current &&
            visibleE.current &&
            visibleF.current
        ) {
            const a = visibleA.current.getBoundingClientRect().top;
            const b = visibleB.current.getBoundingClientRect().top;
            const c = visibleC.current.getBoundingClientRect().top;
            const d = visibleD.current.getBoundingClientRect().top;
            const e = visibleE.current.getBoundingClientRect().top;
            const f = visibleF.current.getBoundingClientRect().top;

            if (a <= 20) {
                handleA()
            }
            if (b <= 20) {
                handleB()
            }
            if (c <= 20) {
                handleC()
            }
            if (d <= 20) {
                handleD()
            }
            if (e <= 20) {
                handleE()
            }
            if (f <= 200) {
                handleF()
            }
        }
    }

    function render() {
        return (
            <>
                <div className={style.spacer}></div>

                <article className={style.content}>
                    <div ref={visibleA} id='getOverview'></div>
                    <div style={{ marginTop: 30, color: '#7684a2' }}>
                        <i>last updated: 2025/10/18</i> <br />
                        <i>Visit <a style={{ color: '#7684a2', textDecoration: 'underline' }} href="https://github.com/SlamTheDragon/SlamTheDragon.github.io/commits/main/">Github</a> for a full list of ToS Versions*</i>
                    </div>

                    <h1 tabIndex={0} onClick={() => navigator.clipboard.writeText('https://slamthedragon.me/terms#overview')} id='overview'>Overview <Tag /></h1>
                    <p>
                        Hi! I’m Slam, a college student, and a part-time freelance artist. I can make vibrant digital illustrations ranging from portraits to landscapes or any possible kind of art that I can do for you.
                    </p>
                    <p>
                        I offer a wide range of options you can begin with to commission me which are split into three categories: Portraits, Landscapes, and Custom. Portraits are for character shots, Landscapes are for either concept paintings or scenery, and Custom for reference sheets, discord emoji packs, or anything else you can think of. There may be more added or offered in the future
                    </p>
                    <p>
                        <b>Commission Types</b> <br />
                        I offer two commission categories that are available at certain times. <br />
                        <ul>
                            <li>
                                <b> Case A Commissions </b>
                                <ul>
                                    <li>These are the default illustration commissions that I offer as stated in my <a href="https://slamthedragon.me/commissions" style={{ textDecoration: 'underline' }}>Commissions</a> page.</li>
                                    <li>
                                        If such offer is currently available and if you’re ready to commission me, please join my <a style={{ textDecoration: 'underline' }} href="https://discord.gg/UtVTgUqEMx" target='_blank'>Discord Server</a> and DM me through there or hit me up on Twitter/X whenever I’m available and accepting DM’s. If you hesitate to go through any of these platforms, you can reach me via <a href="mailto:slamthedragon@gmail.com" style={{ textDecoration: 'underline' }}>slamthedragon@gmail.com</a> <br />
                                        <i> NOTE: <b>This is bound to change.</b> </i>
                                    </li>
                                </ul>
                            </li>
                            <br />
                            <li>
                                <b>Case B Commissions</b>
                                <ul>
                                    <li>
                                        These are potential YCH's, Character Auctions, and other special types of commissions OR products that I may offer through platforms like <a href="https://ko-fi.com/slamthedragon" target='_blank' style={{ textDecoration: 'underline' }}>Ko-fi</a>, my social media, and such.
                                    </li>
                                    <li>
                                        A form will be provided to certain types of commissions like YCH's to help me pick customers as a way to impose quality control and lessen the workload from talking to an influx of people.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </p>

                    <div ref={visibleB} id='getTerms'></div>
                    <h1 tabIndex={0} onClick={() => navigator.clipboard.writeText('https://slamthedragon.me/terms#terms')} id='terms'>Terms <Tag /></h1>

                    <div ref={visibleC} id='getContent'></div>
                    <h3 tabIndex={0} onClick={() => navigator.clipboard.writeText('https://slamthedragon.me/terms#content')} id='content'>Content & Limitations <Tag /></h3>
                    <p>
                        <b>General</b>
                        <br />
                        I do not accept any commissions that depict anything "overly" sexual(nudity, sexual-fetishes, disability-fetishes, etc.), hate/violence, and content depicting "absurd" horrors/gore/deaths. I am mostly but not limited to drawing furred or anthropomorphic characters. I limit my content that is suitable for ages 16 and above. <br />
                        <b>TLDR: Suggestive commissions is fine, but not too explicit.</b>
                    </p>
                    <p>
                        <b>Presentation & Use of Generative AI</b> <br />

                        You are allowed to present NSFW references as long as the image is spoilered.
                    </p>
                    <p>
                        You may give me AI generated references for a piece you wish to commission as an additional resource or if both parties have a hard time understanding the necessity of the targeted output.
                    </p>
                    <p>
                        However, the use of AI in any kind, shape, or form with my artwork is prohibited. I do not consent to, and will refuse any commission if I find that you intend to use my artwork to edit or alter details, or to train any external or local AI model. This clause applies to all artworks produced by SlamTheDragon at any time.
                    </p>

                    <div ref={visibleD} id='getArrangement'></div>
                    <h3 tabIndex={0} onClick={() => navigator.clipboard.writeText('https://slamthedragon.me/terms#arrangement')} id='arrangement'>Arrangement <Tag /></h3>
                    <p>
                        I will accept your commission if you agree to the conditions I have stated as follows:
                    </p>
                    <p>
                        I am only able to start any commissions after receiving the final price that I and the client have agreed upon. This helps prevent situations where the work is finished without getting paid. I'm open to splitting the payment, with 30% upfront and 70% upon completion. This arrangement is applicable only if the total exceeds $66.
                    </p>
                    <p>
                        The final pricing will always depend and be based on your characters, their complexity, and additional props (e.g., commissioning me an illustration containing two characters or more. Discounts may apply depending on the scale of your character within the canvas). I will also charge extra if you wish or demand me to finish your commission earlier than the projected date, which will be determined by the total of hours it may take me to finish your commission (e.g., $1 per hour, depending on the final arrangement). NOTE: This does not apply to my normal rate, only if you demand me to finish your commission early.
                    </p>
                    <p>
                        A commission may be started, paused, or rescheduled when necessary. It usually takes 2-7 days or more to finish a commission, depending on the situation. Please be advised that certain external disturbances and college may hinder the progress of your commission. Commissioners are free to ask a refund at any time if they believe that the commissioned piece has taken too long to complete after the desired date of deadline. However, due to the structured payment method, a refund may be delayed if the funds needed for the operation is insufficient. You may also <i>not</i> cancel your commission if I am 75% finished with the work you gave me.
                    </p>

                    <p>
                        <b>Pricing, Discounts, International & Local Offers</b> <br />
                        Slam <i>may</i> offer different services, pricing discounts, and other means of commissioned work to the people of the Republic of the Philippines. It is your responsibility to check my status and updates regarding to pricing changes. However, if you have inquiries, please DM me through <a href="https://discord.com/users/345819451247296516" target='_blank' style={{ textDecoration: 'underline' }}>Discord</a>!
                    </p>

                    <div ref={visibleE} id='getConditions'></div>
                    <h3 tabIndex={0} onClick={() => navigator.clipboard.writeText('https://slamthedragon.me/terms#conditions')} id='conditions'>Conditions <Tag /></h3>
                    <ul>
                        <li> I will not accept any commissions if you are found to be under 18, not unless I have obtained proper consent from your parents/guardians regarding the matter.</li>
                        <li> I will not entertain users if found to be below the age of 16.</li>
                        <li> I will not accept any commissions if you don’t have PayPal, or GCash. It is completely impossible for me to transact without it.</li>
                        <li> I do not accept payments in digital currency/gifts such as Discord Nitro, Steam Gift Cards, etc.</li>
                    </ul>

                    <div ref={visibleF} id='getRights'></div>
                    <h3 tabIndex={0} onClick={() => navigator.clipboard.writeText('https://slamthedragon.me/terms#rights')} id='rights'>Rights <Tag /></h3>
                    <ul>
                        <li> Slam reserves the right to own all commissioned artworks he created for his customers. The commissioner also reserves the right to own the artwork they have commissioned from Slam.</li>
                        <li> All individuals are not allowed to reproduce or manufacture Slam’s digital works to be sold physically or as a digital copy online without my direct consent.</li>
                        <li> All individuals are not allowed to remove Slam’s watermark/signature in all of Slam’s digital works.</li>
                        <li> The clients may use the artwork Slam has made for them. However, they cannot reproduce Slam’s work for their benefit (e.g., selling prints, posters, etc.).</li>
                    </ul>
                </article>
                <div className={style.spacer}></div>

                {(checkDevice() ?
                    <div className={style.sidebar}>
                        <Logo />
                        <h1>In This Article</h1>

                        {sidebarList('Overview', true)}
                        {sidebarList('Terms', true)}
                        <div className={style.subList}>
                            {sidebarList('Content', false)}
                            {sidebarList('Arrangement', false)}
                            {sidebarList('Conditions', false)}
                            {sidebarList('Rights', false)}
                        </div>
                    </div> :
                    <div className={style.sidebar} style={{ top: `${((scrollVal) >= 1180) ? 1180 : scrollVal}px` }}>
                        <Logo />
                        <h2>In This Article</h2>

                        {sidebarList('Overview', true)}
                        {sidebarList('Terms', true)}
                        <div className={style.subList}>
                            {sidebarList('Content', false)}
                            {sidebarList('Arrangement', false)}
                            {sidebarList('Conditions', false)}
                            {sidebarList('Rights', false)}
                        </div>

                        <h2>More</h2>
                        <a className={style.sidebarTitle} href={`https://slamthedragon.me/`}>Home</a>
                        <a className={style.sidebarTitle} href={`https://slamthedragon.me/status`}>Commissions</a>
                        <a className={style.sidebarTitle} href={`https://slamthedragon.me/attributions`}>Attributions</a>
                        <a className={style.sidebarTitle} href={`https://github.com/SlamTheDragon/SlamTheDragon.github.io`} target='_blank'>Github</a>
                    </div>
                )}
                <div className={style.spacer}></div>

            </>
        )
    }

    return (
        <>
            <div className={style.interface} id='view' onScroll={transferScrollData}>
                <div className={style.navBtn}>
                    <Button onClick={() => { toggleNav() }}>
                        <Menu />
                    </Button>
                </div>
                <div className={style.navContent} style={{ height: `${(isNavOpen) ? 100 : 0}%`, opacity: `${(isNavOpen) ? 1 : 0}` }} onClick={() => { toggleNav() }}>
                    <h1>
                        Menu
                    </h1>
                    <div className={style.navSelections}>
                        <Button tabIndex={(isNavOpen) ? 0 : -1} onClick={() => { window.location.href = 'https://slamthedragon.me/' }}>
                            Home
                        </Button>
                        <Button tabIndex={(isNavOpen) ? 0 : -1} onClick={() => { window.location.href = 'https://slamthedragon.me/status' }}>
                            Commission Queue
                        </Button>
                        <Button tabIndex={(isNavOpen) ? 0 : -1} classItem={'primary'} onClick={() => { toggleNav() }}>
                            Terms of Service
                        </Button>
                        <Button disabled={true}>
                            Portfolio <Open />
                        </Button>
                    </div>

                    <FooterMobile tabIndex={isNavOpen} />
                </div>

                <div className={style.container}>
                    {render()}
                </div>

                <Footer />
            </div>
        </>
    );
}
