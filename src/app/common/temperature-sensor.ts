import { Validate } from "./validate";
import { ISensor } from "./injectables";

export class TemperatureSensor implements ISensor {
    
    public id: string;
    public value: number;
    public description: string;
    public role: string;

    constructor (src: any) {
        if (src) {
            this.id = Validate.isString(src.id, "value for  sensor id is not a string");
            if (typeof src.reading !== "number") {
                this.value = 0;
            } else {
                this.value =src.reading;
            }
            this.description = Validate.isString(src.description, "value for sensor description is not a string");
            this.role = src.role;
        } else {
            throw new Error("no data provided for temperature sensor")
        }     
    }
}