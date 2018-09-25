import { isNumber } from "util";

export class ActiveProgramStatus {
    id: string;
    name: string;
    maxHWTemp: number;
    minHWTemp: number;
    slots: boolean[] = [];

    constructor(src: any) {
        if (src) {
            if (src.id) {
                this.id = src.id;
                if (src.name) {
                    this.name = src.name;
                    if (isNumber(src.maxHWTemp)) {
                        this.maxHWTemp = parseInt(src.maxHWTemp);
                    }
                    if (isNumber(src.minHWTemp)) {
                        this.minHWTemp = parseInt(src.minHWTemp);
                    }
                    if (Array.isArray(src.slots)) {
                        for (const slot of src.slots) {
                            this.slots.push(slot);
                        }
                    }
                } else {
                    throw new Error("no name data for activeprogram");
                }
    
            } else {
                throw new Error("no id data for activeprogram");
            }
            } else {
            throw new Error("no source data for activeprogram");
        }
    }
}