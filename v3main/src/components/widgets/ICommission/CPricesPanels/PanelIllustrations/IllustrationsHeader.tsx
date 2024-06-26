
interface HeaderValues {
    headerName: string[]
    priceArray: number[]
    priceID: number
    // isBackground: boolean
}


export default function IllustrationsHeader(props: HeaderValues) {
    const isBackground = true

    return (
        <h1>
            {props.headerName[props.priceID]}
            <span>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>$
            {
                (props.priceArray[props.priceID] + (isBackground ? props.priceID + 6 : 0)) + (isBackground ? '+' : '')
            }
        </h1>
    )
}
