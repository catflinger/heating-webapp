import { Validate } from "./validate"; 

export class ControlStatus {
    public water: boolean;
    public heating: boolean;

    constructor(src: any) {
        if (src) {
            this.water = Validate.isBoolean(src.water, "value for src.water is not boolean");
            this.heating = Validate.isBoolean(src.heating, "value for src.heating is not boolean");
        } else {
            throw new Error("no data provided for control state")
        }        
    }
}