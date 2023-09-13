

export class Logging {
    private static _enableVerbose: boolean = true
    private static _enableDebug: boolean = true

    public static VERBOSE(log: any) {
        if (!this._enableVerbose) return;
        console.debug(`[VERBOSE] ${log}`)
    }
    public static DEBUG(log: any) {
        if (!this._enableDebug) return;
        console.debug(`[DEBUG] ${log}`)
        // console.debug(log)
    }

    public static INFO(log: any) {
        console.info(`[INFO] ${log}`);
    }
    public static WARN(log: any) {
        console.warn(`${log}`);
    }
    public static ERROR(log: any) {
        console.error(`${log}`);
    }
    public static FATAL(log: any) {
        console.error(`[FATAL] ${log}`);
    }
}