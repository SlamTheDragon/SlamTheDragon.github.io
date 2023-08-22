import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, selectCount } from '../slice/counterSlice'
import { useModalOperation } from '../../utils/component-utils/modalOperation';
import logo from "../../assets/images/logo192.png"
import Button from "../common/Button";

/**
 * This is your main interface, all components shall pass through here
 * @returns Interface
 */
export default function Interface() {
    // get
    const count = useSelector(selectCount)
    // set
    const dispatch = useDispatch()
    const openModal = useModalOperation()


    return (
        <>
            <div className="interface">
                <img src={logo} alt="logo" draggable="false" />

                <h1 id="output">
                    A new front is on the works!
                </h1>

                    <h3>Please click this <u><a href='https://slamthedragon.me/commissions-old'>link</a></u> to visit the old site, thank you!</h3> <br />
                <div style={{ display: "flex", flexDirection: "row", gap: 20, alignItems: "center" }}>
                    <Button onClick={() => dispatch(decrement())}>-</Button>
                    <h1 style={{ marginTop: 0, marginBottom: 0 }}>
                        {count}
                    </h1>
                    <Button onClick={() => dispatch(increment())}>+</Button>

                    <Button onClick={() => openModal("Sample Title", count)}>Feature Toggle</Button>
                </div>

                <div style={{ opacity: 0.7, padding: 30, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                    <span>template used by <a href="https://github.com/SlamTheDragon" target="blank">SlamTheDragon</a></span>
                    <span>Check out this template I made <a href="https://github.com/SlamTheDragon/slam-react-basic/blob/main/README.md" target="blank">README.md</a></span>
                </div>
            </div>
        </>
    );
}