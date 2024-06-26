import style from './button.module.scss'

interface ButtonInterface {
    classItem?: string               // define class extension in index.scss
    children?: React.ReactNode
    disabled?: boolean
    tabIndex?: number
    onClick?: () => any
    style?: object
    titleTooltip?: string
}

/**
 * Button Component
 * 
 * A customizable button component for use in React applications.
 * 
 * @component
 * @param {string} [props.classItem] - Additional classes: [ primary | secondary | success | info | warn | danger ] to be applied to the button.
 * @param {boolean} [props.disabled] - Whether the button should be disabled.
 * @param {number} [props.tabIndex] - The tab order of the button within the page.
 * @param {function} [props.onClick] - The function to be called when the button is clicked.
 * @returns {JSX.Element} The customly rendered button element.
 * 
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 * 
 * @example
 * // Button with custom class and click handler
 * <Button classItem="custom-button" onClick={() => console.log("Button clicked!")}>Click me</Button>
 * 
 * @example
 * // Disabled button with custom tabIndex
 * <Button disabled tabIndex={1}>Disabled Button</Button>
 */
export default function Button(props: Readonly<ButtonInterface>) {
    return (
        <button disabled={props.disabled}
            tabIndex={props.tabIndex}
            className={style.btn + " " + props.classItem}
            onClick={props.onClick}
            title={props.titleTooltip}
            style={props.style}
        >
            {props.children}
        </button>
    );
}