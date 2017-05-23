export class EnvStatus {
    public hwTemp: number;

    constructor(src: any) {
        if (src) {
            const hwt = src.hwTemp;

            if (typeof hwt === "number" && !isNaN(hwt) && isFinite(hwt)) {
                this.hwTemp = hwt;
            } else {
                throw new Error("invalid data: hotwater temperature invalid or missing")
            }
        } else {
            throw new Error("no data provided for environment state")
        }
    }
}
