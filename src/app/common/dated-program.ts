import { IDatedProgram } from "./injectables";

export class DatedProgram implements IDatedProgram {
    public programId: string;
    public activationDate: Date;
    public description: string;

    constructor(programId: string, activationDate: Date | string, description?: string) {

        if (activationDate instanceof Date) {
            this.activationDate = activationDate;
        } else {
            this.activationDate = new Date(activationDate);
        }

        this.programId = programId;
        this.description = description ? description : "";
    }
}