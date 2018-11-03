import { Validate } from "./validate";
import { ISensor } from "./injectables";

export class TemperatureSensor implements ISensor {
    
    private _id: string;
    private _value: number;
    private _description: string;
    private _role: string;

    constructor (src: any) {
        if (src) {
            this._id = Validate.isString(src.id, "value for  sensor id is not a string");
            if (src.reading === null) {
                this._value = 0;
            } else {
                this._value = Validate.isNumber(src.reading, "value for sensor value is not numeric");
            }
            this._description = Validate.isString(src.description, "value for sensor description is not a string");
            this._role = src.role;
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

    public get role(): string {
        return this._role;
    }
}