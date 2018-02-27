import { ControlStatus } from "./control-status";
import { EnvStatus } from "./env-status";
import { Program } from "./program";
import { OverrideStatus } from "./override-status";
import { DeviceStatus } from "./device-status";
import { ControllerStatus } from "./controllerStatus";

export class SystemStatus {
    public control: ControlStatus;
    public device: DeviceStatus;
    public env: EnvStatus;
    public controller: ControllerStatus;

    constructor(src: any) {

        if (src) {
            if (Array.isArray(src.items)) {
                const controlData: any = (src.items as any[]).find((item) => item.id === "control");
                if (controlData && controlData.snapshot) {
                    this.control = new ControlStatus(controlData.snapshot);

                    const envData: any = (src.items as any[]).find((item) => item.id === "env");
                    if (envData && envData.snapshot) {
                        this.env = new EnvStatus(envData.snapshot);

                        const deviceData: any = (src.items as any[]).find((item) => item.id === "device");
                        if (deviceData && deviceData.snapshot) {
                            this.device = new DeviceStatus(deviceData.snapshot);

                            const controllerData: any = (src.items as any[]).find((item) => item.id === "controller");
                            if (controllerData && controllerData.snapshot) {
                                this.controller = new ControllerStatus(controllerData.snapshot);
                            } else {
                                throw new Error("invalid data: controller missing")
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
                throw new Error("invalid data: items array missing")
            }
        } else {
            throw new Error("no data for SystemStatus")
        }
    }
}
