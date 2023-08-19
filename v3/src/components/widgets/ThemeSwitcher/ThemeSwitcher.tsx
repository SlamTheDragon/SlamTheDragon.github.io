import { useDispatch, useSelector } from 'react-redux';
import { themeBoolean, toggleDark, toggleLight } from '../../slice/theme-slices/themeBoolSlice';
import { ReactComponent as DarkMode } from '@material-design-icons/svg/filled/dark_mode.svg';
import { ReactComponent as LightMode } from '@material-design-icons/svg/filled/light_mode.svg';
import Button from '../../common/Button';


export default function ThemeSwitcher() {
    const dispatch = useDispatch()

    const theme = window.localStorage.getItem("theme");
    const themeData = useSelector(themeBoolean)

    const toRender = themeData ? theme : themeData

    if (toRender) {
        return (
            <Button onClick={() => dispatch(toggleLight())}><DarkMode /></Button>
        );
    } else {
        return (
            <Button onClick={() => dispatch(toggleDark())}><LightMode /></Button>
        );
    }

}