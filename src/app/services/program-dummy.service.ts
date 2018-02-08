import { Injectable, Inject } from '@angular/core';
import { IProgramService } from '../common/injectables';
import { Observable } from 'rxjs';
import { Program } from '../common/program';

@Injectable()
export class ProgramDummyService implements IProgramService {
    
    constructor() { }

    list(): Observable<Program[]> {
        let results: Program[] = [];

        this.data.programs.forEach((p: any) => {
            results.push(new Program(p));
        });

        return Observable.of(results);
    }

    getProgram(id: string): Observable<Program> {
        let result: Observable<Program>;
        let programData: any = this.data.programs.find( (p: any) => p.id === id );

        if (programData) {
            result = Observable.of(new Program(programData));
        } else {
            throw new Error("Method not implemented.");
        }

        return result;
    }


    private data: any = {
        "programs": [
            {"hwmax":50,"hwmin":40,"id":"b5fdc7cb-fe7a-4e99-874d-ac0f480b393e","name":"default","slots":[false,false,false,false,false,false,false,false,false,false]},
            {"hwmax":50,"hwmin":40,"id":"cf1f515c-7915-49d1-be4b-6c245ed6b255","name":"some name or other","slots":[true,false,true,false,true,false,false,false,false,false]},
            {"hwmax":50,"hwmin":40,"id":"f7e85ee8-9e3b-4c58-9bd8-5484b915de91","name":"some name or other","slots":[true,false,true,false,true,false,false,false,false,false]}
        ]
    };
}