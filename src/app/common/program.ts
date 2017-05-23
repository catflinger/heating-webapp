

import { Validate } from "./validate";

export class Program {
    public slots: boolean[] = [];
    public slotsPerDay: number;

    constructor(src: any) {
        if (src) {
            if (src.slotsPerDay) {
                this.slotsPerDay = Validate.isInteger(src.slotsPerDay);

                if (Array.isArray(src.slots) && src.slots.length === this.slotsPerDay) {
                    src.slots.forEach(slot => {
                        this.slots.push(Validate.isBoolean(slot));
                    });
                } else {
                    throw new Error("invalid data: slotsPerDay missing")
                }
            } else {
                throw new Error("invalid data: slotsPerDay missing")
            }
        } else {
            throw new Error("invalid data: program missing")

        }
    }
}