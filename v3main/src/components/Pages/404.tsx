import Button from "../common/Button";
import style from "./404.module.scss";

export default function FourOhFour() {
    return (
        <div className={style.whatthehell}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <polygon points="112 302.5 228 105.5 308 91.5 219 241.5 400 209.5 285 405.5 204 420.5 293 270.5 112 302.5" />
            </svg>
            <h1>FOUR OH FOUR!</h1>
            <span>Is that page...?</span>
            <Button classItem="primary" onClick={() => { window.location.href = '/' }}>
                Go home
            </Button>
        </div>  
    );
}