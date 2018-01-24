import { TemperatureSensor } from "./temperature-sensor";

export class EnvStatus {
    public sensors: TemperatureSensor[] = [];

    constructor(src: any) {
        if (src) {
            let sensorData: any = src.sensors;
            
            if (Array.isArray(sensorData)) {
                sensorData.forEach((data) => this.sensors.push(this.readSensor(data)));
            } else {
                throw new Error("could not find sensors array in environment data")
            }
        } else {
            throw new Error("no data provided for environment state")
        }
    }

    public get hwTemp(): number {
        const hwSensor: any = this.sensors.find((s) => s.id === "hw");

        return hwSensor.value;
    }

    private readSensor(data): TemperatureSensor {
        let description: string;

        switch (data._id) {
            case "hw":
                description = "hot water temperature";
                break;
            case "bedroom":
                description = "main bedroom temperature";
                break;
            case "garage":
                description = "garage temperature";
                break;
            case "loft":
                description = "loft  temperature";
                break;
            default:
                description = "unknown";
        }

        return new TemperatureSensor(data._id, data._reading, description);
    }
}
