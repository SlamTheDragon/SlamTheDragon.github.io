
interface HeaderValues {
    headerName: string[]
    priceArray: number[]
    priceID: number
    isBackground: boolean
}


export default function PortraitHeader(props: HeaderValues) {
    return (
        <h1>
            {props.headerName[props.priceID]}
            <span>&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>$
            {
                (props.priceArray[props.priceID] + (props.isBackground ? props.priceID + 6 : 0)) + (props.isBackground ? '+' : '')
            }
        </h1>
    )
}
