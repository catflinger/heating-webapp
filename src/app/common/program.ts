

import { Validate } from "./validate";

export class Program {
    public slots: boolean[] = [];
    public slotsPerDay: number;
    public hwmax: number;
    public hwmin: number;

    constructor(src: any) {
        if (src) {
            this.slotsPerDay = Validate.isInteger(src.slotsPerDay);
            this.hwmin = Validate.isNumber(src.hwmin);
            this.hwmax = Validate.isNumber(src.hwmax);

            if (Array.isArray(src.slots) && src.slots.length === this.slotsPerDay) {
                src.slots.forEach(slot => {
                    this.slots.push(Validate.isBoolean(slot));
                });
            } else {
                throw new Error("invalid data: slotsPerDay missing")
            }
        } else {
            throw new Error("invalid data: program missing")

        }
    }
}