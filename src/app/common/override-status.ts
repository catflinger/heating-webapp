import { Validate } from "./validate";

export class OverrideStatus {
    public start: number;
    public duration: number;

    constructor(src: any) {
        if (src) {
            this.start = Validate.isNumber(src.start, "value for src.start is not numeric");
            this.duration = Validate.isNumber(src.duration, "value for src.duration is not numeric");
        } else {
            throw new Error("no data provided for Override status")
        }        
    }
}