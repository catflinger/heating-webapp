import { ControlStatus } from "./control-status";
import { EnvStatus } from "./env-status";
import { Program } from "./program";

export class SystemStatus {
    public control: ControlStatus;
    public env: EnvStatus;
    public program: Program;

    constructor(src: any) {
        if (src) {
            if (src.control) {
                this.control = new ControlStatus(src.control);

                if (src.env) {
                    this.env = new EnvStatus(src.env);

                    if (src.program) {
                        this.program = new Program(src.program);
                    } else {
                        throw new Error("invalid data: program missing")
                    }
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
