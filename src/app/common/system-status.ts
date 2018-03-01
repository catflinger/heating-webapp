import { ControlStatus } from "./control-status";
import { Program } from "./program";
import { OverrideStatus } from "./override-status";
import { DeviceStatus } from "./device-status";
import { ActiveProgramStatus } from "./active-program-status";

export class SystemStatus {
    public control: ControlStatus;
    public device: DeviceStatus;
    public activeProgram: ActiveProgramStatus;

    constructor(src: any) {

        if (src) {
            if (Array.isArray(src.items)) {

                const controlData: any = (src.items as any[]).find((item) => item.id === "control");
                if (controlData && controlData.snapshot) {
                    this.control = new ControlStatus(controlData.snapshot);

                    const deviceData: any = (src.items as any[]).find((item) => item.id === "device");
                    if (deviceData && deviceData.snapshot) {
                        this.device = new DeviceStatus(deviceData.snapshot);

                        const activeProgramData: any = (src.items as any[]).find((item) => item.id === "activeProgram");
                        if (activeProgramData && activeProgramData.snapshot) {
                            this.activeProgram = new ActiveProgramStatus(activeProgramData.snapshot);
                        } else {
                            throw new Error("invalid data: controller missing")
                        }
                    } else {
                        throw new Error("invalid data: device state missing")
                    }
                } else {
                    throw new Error("invalid data: control state missing")
                }
            } else {
                throw new Error("invalid data: items array missing")
            }
        } else {
            throw new Error("no data for SystemStatus")
        }
    }
}
