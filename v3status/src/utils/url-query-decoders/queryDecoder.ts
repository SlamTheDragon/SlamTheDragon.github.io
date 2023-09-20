
export class QueryDecoder {
    private static _decodedID: string | null = null
    private static _stringedID: string = ''
    private static _intID: number = 0

    public static Set() {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)
        this._decodedID = urlParams.get('id')
        if (this._decodedID !== null) {
            this._stringedID = this._decodedID
            this._intID = parseInt(this._stringedID)
        }
    }

    public static Get() {
        return (this._intID - 1)
    }

    public static Check() {        
        // console.log(this._decodedID)
        

        if (this._decodedID === null) {
            return 0
        }
        if (this._decodedID === 'notfound') {
            return 2
        }
        if (this._decodedID !== null) {
            return 1
        }
    }
}