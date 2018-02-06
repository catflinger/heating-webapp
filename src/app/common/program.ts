import { Inject } from "@angular/core";

import { Validate } from "./validate";
import { INJECTABLES, slotsPerDay } from "./injectables";


export class Program {
    public slots: boolean[] = [];
    public hwmax: number;
    public hwmin: number;
    public id: string;
    public name: string;

    constructor(src: any) {
        if (src) {
            this.hwmin = Validate.isNumber(src.hwmin, "hwmin");
            this.hwmax = Validate.isNumber(src.hwmax, "hwmax");
            this.id = src.id;
            this.name = src.name;

            if (Array.isArray(src.slots) && src.slots.length === slotsPerDay) {
                src.slots.forEach((slot: any, index: any) => {
                    this.slots.push(Validate.isBoolean(slot, "slot number " + index));
                });
            } else {
                throw new Error("invalid data: slotsPerDay mismatch")
            }
        } else {
            throw new Error("invalid data: program missing")

        }
    }

    public get slotsPerDay(): number {
        return slotsPerDay;
    }
}