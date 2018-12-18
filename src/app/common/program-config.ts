import { IProgramConfig, IDatedProgram } from "./injectables";
import { DatedProgram } from "./dated-program";

export class ProgramConfig implements IProgramConfig {
    public weekdayProgramId: string;
    public saturdayProgramId: string;
    public sundayProgramId: string;
    public datedPrograms: IDatedProgram[] = [];

    public clone(): ProgramConfig {
        const result = new ProgramConfig();
        result.saturdayProgramId = this.saturdayProgramId;
        result.sundayProgramId = this.sundayProgramId;
        result.weekdayProgramId = this.weekdayProgramId;

        this.datedPrograms.forEach((dp) => {
            result.datedPrograms.push(
                new DatedProgram(
                    dp.programId, 
                    new Date(dp.activationDate))
            );
        });

        return result;
    }
}