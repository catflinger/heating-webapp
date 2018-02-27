import { Validate } from "./validate";
import { OverrideStatus } from "./override-status";
import { Program } from "./program";

export class ControllerStatus {
    public overrides: OverrideStatus[] = [];
    public activeProgram: Program;

    constructor(src: any) {
        if (src) {
            if (Array.isArray(src.overrides)) {
                (src.overrides as any[]).forEach(item => {
                    this.overrides.push(new OverrideStatus(item));

                    if (src.activeProgram) {
                        this.activeProgram = new Program(src.activeProgram);
                    } else {
                        throw new Error("controller status: active program missing")
                    }
                });
            } else {
                throw new Error("controller status: no overrides array")
            }
        } else {
            throw new Error("controller status: no source data")
        }
    }
}