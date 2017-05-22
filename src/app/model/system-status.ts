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
export class ControlStatus {
    public water: boolean;
    public heating: boolean;

    constructor(src: any) {
        if (src) {
            this.water = this.validateBoolean(src.water);
            this.heating = this.validateBoolean(src.heating);
        } else {
            throw new Error("no data provided for control state")
        }        
    }
    private validateBoolean(val: any): boolean {
        if (typeof val !== "boolean") {
            throw new Error("invalid data in control state")
        }
        return val;
    }
}
export class SystemStatus {
    public control: ControlStatus;
    public env: EnvStatus;

    constructor(src: any) {
        if (src) {
            if (src.control) {
                this.control = new ControlStatus(src.control);

                if (src.env) {
                    this.env = new EnvStatus(src.env);
                } else {
                    throw new Error("invalid data: control state missing")
                }
            } else {
                throw new Error("invalid data: control state missing")
            }
        } else {
            throw new Error("no data provided for system state")
        }
    }
}
