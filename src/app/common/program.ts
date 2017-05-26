

import { Validate } from "./validate";

export class Program {
    public slots: boolean[] = [];
    public slotsPerDay: number;
    public hwmax: number;
    public hwmin: number;

    constructor(src: any) {
        if (src) {
            this.slotsPerDay = Validate.isInteger(src.slotsPerDay, "slotsPerDay");
            this.hwmin = Validate.isNumber(src.hwmin, "hwmin");
            this.hwmax = Validate.isNumber(src.hwmax, "hwmax");

            if (Array.isArray(src.slots) && src.slots.length === this.slotsPerDay) {
                src.slots.forEach((slot, index) => {
                    this.slots.push(Validate.isBoolean(slot, "slot number " + index));
                });
            } else {
                throw new Error("invalid data: slotsPerDay missing")
            }
        } else {
            throw new Error("invalid data: program missing")

        }
    }
}