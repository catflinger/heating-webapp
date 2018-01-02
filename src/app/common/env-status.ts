export class EnvStatus {
    public hwTemp: number;

    constructor(src: any) {
        if (src) {
            let sensors: any = src.sensors;
            
            if (Array.isArray(sensors)) {
                const hwSensor: any = sensors.find((s) => s._id === "hw");
                
                if (hwSensor) {
                    const hwt: any = hwSensor._reading;

                    if (typeof hwt === "number" && !isNaN(hwt) && isFinite(hwt)) {
                        this.hwTemp = hwt;
                    } else {
                        throw new Error("invalid data: hotwater temperature reading invalid or missing")
                    }
                } else {
                    throw new Error("could not find hot water sensor in environment data")
                }
            } else {
                throw new Error("could not find sensors array in environment data")
            }
        } else {
            throw new Error("no data provided for environment state")
        }
    }
}
