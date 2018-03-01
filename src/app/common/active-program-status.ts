export class ActiveProgramStatus {
    id: string;
    name: string;

    constructor(src: any) {
        if (src) {
            if (src.id) {
                this.id = src.id;
                if (src.name) {
                    this.name = src.name;
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