import { Validate } from "./validate"; 

export class ControlStatus {
    public water: boolean;
    public heating: boolean;

    constructor(src: any) {
        if (src) {
            this.water = Validate.isBoolean(src.water);
            this.heating = Validate.isBoolean(src.heating);
        } else {
            throw new Error("no data provided for control state")
        }        
    }
}