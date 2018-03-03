import { IProgramConfig } from "./injectables";

export class ProgramConfig implements IProgramConfig {
    public weekdayProgramId: string;
    public saturdayProgramId: string;
    public sundayProgramId: string;

    public clone(): ProgramConfig {
        const result = new ProgramConfig();
        result.saturdayProgramId = this.saturdayProgramId;
        result.sundayProgramId = this.sundayProgramId;
        result.weekdayProgramId = this.weekdayProgramId;
        return result;
    }
}