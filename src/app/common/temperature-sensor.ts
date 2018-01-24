export class TemperatureSensor {
    
    constructor (private _id: string, private _value: number, private _description: string) {
    }

    public get id(): string {
        return this.id;
    }

    public get value(): number {
        return this._value;
    }

    public get description(): string {
        return this._description;
    }
}