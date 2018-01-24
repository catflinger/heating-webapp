import { ControlStatus } from "./control-status";
import { EnvStatus } from "./env-status";
import { Program } from "./program";
import { OverrideStatus } from "./override-status";
import { DeviceStatus } from "./device-status";

export class SystemStatus {
    public control: ControlStatus;
    public device: DeviceStatus;
    public env: EnvStatus;
    public program: Program;
    public override: OverrideStatus;

    constructor(src: any) {

        if (src) {
            if (src.control) {
                this.control = new ControlStatus(src.control);

                if (src.env) {
                    this.env = new EnvStatus(src.env);

                    if (src.device) {
                        this.device = new DeviceStatus(src.device);
    
                        if (src.program) {
                            this.program = new Program(src.program);

                            if (src.override) {
                                this.override = new OverrideStatus(src.override);
                            } else {
                                this.override = null;
                            }
                        } else {
                            throw new Error("invalid data: program missing")
                        }
                    } else {
                        throw new Error("invalid data: device state missing")
                    }
                } else {
                    throw new Error("invalid data: environment state missing")
                }
            } else {
                throw new Error("invalid data: control state missing")
            }
        } else {
            throw new Error("no data for SystemStatus")
        }
    }
}
