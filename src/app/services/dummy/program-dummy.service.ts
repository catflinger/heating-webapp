import { Injectable, Inject } from '@angular/core';
import { IProgramService, slotsPerDay, ProgramMode } from '../../common/injectables';
import { Observable } from 'rxjs';
import { Program } from '../../common/program';
import { ProgramChartComponent } from '../../program-chart/program-chart.component';
import { v4 as guid } from "uuid";

@Injectable()
export class ProgramDummyService implements IProgramService {
    private programs: Program[] = []; 

    constructor() {
        this.data.forEach((p: any) => {
            this.programs.push(new Program(p));
        });
    }

    listPrograms(): Observable<Program[]> {
        return Observable.of(this.programs);

    }

    getProgram(id: string): Observable<Program> {
        let result: Observable<Program>;
        let program: Program = this.programs.find( (p: any) => p.id === id );

        if (program) {
            result = Observable.of(program);
        } else {
            throw new Error("Program not found.");
        }

        return result;
    }

    saveProgram(programToSave: Program): Observable<any> {
        let program: Program;

        if (programToSave.id !== null) {
            program = this.programs.find( (p: any) => p.id === program.id );
            if (!program) {
                throw new Error("Program not found.");
            }
        } else {
            program = new Program(null);
            program.id = guid();
            this.programs.push(program);
        }

        program.maxHWTemp = programToSave.maxHWTemp;
        program.minHWTemp = programToSave.minHWTemp;
        program.chmax = programToSave.chmax;
        program.id = programToSave.id;
        program.name = programToSave.name;
        program.slots = programToSave.slots.slice(0);

        return Observable.of(true);        
    }

    deleteProgram(id: string): Observable<any> {
        //TO DO: patch the exisitng data with changes

        let idx: number = this.programs.findIndex( (p: any) => p.id === id);

        if (idx >= 0) {
            this.programs.splice(idx, 1);
        }

        return Observable.of(true);        
    }

    private data: any[] = [
            {"maxHWTemp":48,"minHWTemp":39, "chmax": 18, "id":"b5fdc7cb-fe7a-4e99-874d-ac0f480b393e","name":"default","slots": new Array(slotsPerDay).fill(false)},
            {"maxHWTemp":50,"minHWTemp":40, "chmax": 19,"id":"cf1f515c-7915-49d1-be4b-6c245ed6b255","name":"some name or other","slots":new Array(slotsPerDay).fill(false)},
            {"maxHWTemp":50,"minHWTemp":42, "chmax": 17,"id":"f7e85ee8-9e3b-4c58-9bd8-5484b915de91","name":"some name or other","slots":new Array(slotsPerDay).fill(false)},
        ];
}