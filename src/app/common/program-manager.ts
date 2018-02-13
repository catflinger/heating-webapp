import { Inject } from "@angular/core";
import { INJECTABLES, IProgramService } from "./injectables";
import { Program } from "./program";

export class ProgramManager {
    public programs: Program[] = [];
    public weekdayId: string;
    public saturdayId: string;
    public sundayId: string;

    constructor() {
    }

    public get weekdayProgram(): Program {
        return this.findProgram(this.weekdayId);
    }

    public get saturdayProgram(): Program {
        return this.findProgram(this.saturdayId);
    }

    public get sundayProgram(): Program {
        return this.findProgram(this.sundayId);
    }

    private findProgram(id: string): Program {
        return this.programs.find( (p: Program) => p.id === id );
    }

}