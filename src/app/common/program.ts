import { Inject } from "@angular/core";

import { Validate } from "./validate";
import { INJECTABLES, slotsPerDay } from "./injectables";


export class Program {
    public slots: boolean[] = [];
    public maxHWTemp: number;
    public minHWTemp: number;
    public chmax: number;
    public id: string;
    public name: string;

    constructor(src: any) {
        if (src) { 
            this.minHWTemp = Validate.isNumber(src.minHWTemp, "minHWTemp");
            this.maxHWTemp = Validate.isNumber(src.maxHWTemp, "maxHWTemp");
            this.chmax = 0 // Validate.isNumber(src.chmax, "chmax");
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
            // set default values
            this.maxHWTemp = 50;
            this.minHWTemp = 40;
            this.chmax = 18;
            this.name = "new program";
            this.id = null;
            for(let n:number = 0; n < slotsPerDay; n++) {
                this.slots.push(false);
            }
        }
    }

    public get slotsPerDay(): number {
        return slotsPerDay;
    }
}