import { ControlStatus } from "./control-status";
import { Program } from "./program";
import { OverrideStatus } from "./override-status";
import { DeviceStatus } from "./device-status";
import { ActiveProgramStatus } from "./active-program-status";
import { isNumber } from "util";

export class SystemStatus {
    public control: ControlStatus;
    public device: DeviceStatus;
    public activeProgram: ActiveProgramStatus;
    public overrides: OverrideStatus[] = [];
    public serverTime: Date;
    public serverSlotsPerDay: number = 0;
    public currentSlot: number = 0;

    constructor(src: any) {

        if (src) {
            
            if (src.setup) {
                if (src.setup.datetime) {
                    this.serverTime = new Date(src.setup.datetime);
                }
                if (isNumber(src.setup.slotsPerDay)) {
                    this.serverSlotsPerDay = src.setup.slotsPerDay;
                }
                if (isNumber(src.setup.currentSlot)) {
                    this.currentSlot = src.setup.currentSlot;
                }
            }

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

                            const ovData: any = (src.items as any[]).find((item) => item.id === "overrides");
                            if (ovData && ovData.snapshot) {
                                (ovData.snapshot as OverrideStatus[]).forEach((ov) => this.overrides.push(ov));
                               
                            } else {
                                throw new Error("invalid data: overrides missing")
                            }
                                
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
