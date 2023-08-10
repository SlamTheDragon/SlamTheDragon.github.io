import { useDispatch, useSelector } from 'react-redux';
import { themeBoolean, toggleDark, toggleLight } from '../../slice/theme-slices/themeBoolSlice';
import Button from '../../common/Button';


export default function ThemeSwitcher() {
    const dispatch = useDispatch()

    const theme = window.localStorage.getItem("theme");
    const themeData = useSelector(themeBoolean)

    const rendering = themeData ? theme : themeData

    if (rendering) {
        return (
            <Button onClick={() => dispatch(toggleLight())}>🌙</Button>
        );
    } else {
        return (
            <Button onClick={() => dispatch(toggleDark())}>🌙</Button>
        );
    }

}