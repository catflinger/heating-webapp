import { Validate } from "./validate";

export class OverrideStatus {
    public state: boolean;

    constructor(src: any) {
        if (src) {
            this.state = Validate.isBoolean(src.state, "value for src.state is not boolean");
        } else {
            throw new Error("no data provided for Override status")
        }        
    }
}