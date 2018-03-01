import { IProgramConfig } from "./injectables";

export class ProgramConfig implements IProgramConfig {
    public weekdayProgramId: string;
    public saturdayProgramId: string;
    public sundayProgramId: string;
}