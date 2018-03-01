import { Validate } from "./validate";
import { ISensor } from "./injectables";

export class TemperatureSensor implements ISensor {
    
    public _id: string;
    public _value: number;
    public _description: string;

    constructor (src: any) {
        if (src) {
            this._id = Validate.isString(src.id, "value for  sensor id is not a string");
            this._value = Validate.isNumber(src.reading, "value for sensor value is not numeric");
            this._description = Validate.isString(src.description, "value for sensor description is not a string");
        } else {
            throw new Error("no data provided for temperaturesensor")
        }     
    }

    public get id(): string {
        return this._id;
    }

    public get value(): number {
        return this._value;
    }

    public get description(): string {
        return this._description;
    }
}