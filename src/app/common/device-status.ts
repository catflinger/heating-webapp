import { Validate } from "./validate"; 

export class DeviceStatus {
    public boiler: boolean;
    public chPump: boolean;
    public hwPump: boolean;

    constructor(src: any) {
        if (src) {
            this.boiler = Validate.isBoolean(src.boiler, "value for src.boiler is not boolean");
            this.chPump = Validate.isBoolean(src.chPump, "value for src.chPump is not boolean");
            this.hwPump = Validate.isBoolean(src.hwPump, "value for src.hwPump is not boolean");
        } else {
            throw new Error("no data provided for device state")
        }        
    }
}