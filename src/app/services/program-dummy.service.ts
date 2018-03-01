import { Injectable, Inject } from '@angular/core';
import { IProgramService, slotsPerDay, ProgramMode } from '../common/injectables';
import { Observable } from 'rxjs';
import { Program } from '../common/program';
import { ProgramChartComponent } from '../program-chart/program-chart.component';
import { v4 as guid } from "uuid";

@Injectable()
export class ProgramDummyService implements IProgramService {

    constructor() { 
    }

    listPrograms(): Observable<Program[]> {
        throw new Error("Method not implemented.");
    }

    getProgram(id: string): Observable<Program> {
        let result: Observable<Program>;
        let programData: any = this.data.programs.find( (p: any) => p.id === id );

        if (programData) {
            result = Observable.of(new Program(programData));
        } else {
            throw new Error("Program not found.");
        }

        return result;
    }

    saveProgram(program: Program): Observable<any> {
        let data: any = {};

        if (program.id !== null) {
            data = this.data.programs.find( (p: any) => p.id === program.id );
            if (!data) {
                throw new Error("Program not found.");
            }
        }else {
            program.id = guid();
            this.data.programs.push(data);
        }

        data.hwmax = program.hwmax;
        data.hwmin = program.hwmin;
        data.chmax = program.chmax;
        data.id = program.id;
        data.name = program.name;
        data.slots = program.slots.slice(0);

        return Observable.of(true);        
    }

    deleteProgram(id: string): Observable<any> {
        //TO DO: patch the exisitng data with changes

        let idx: number = this.data.programs.findIndex( (p: any) => p.id === id);

        if (idx >= 0) {
            this.data.programs.splice(idx, 1);
        }

        return Observable.of(true);        
    }

    private data: any = {
        weekday: "b5fdc7cb-fe7a-4e99-874d-ac0f480b393e",
        saturday: "b5fdc7cb-fe7a-4e99-874d-ac0f480b393e",
        sunday: "b5fdc7cb-fe7a-4e99-874d-ac0f480b393e",

        programs: [
            {"hwmax":48,"hwmin":39, "chmax": 18, "id":"b5fdc7cb-fe7a-4e99-874d-ac0f480b393e","name":"default","slots": new Array(slotsPerDay).fill(false)},
            {"hwmax":50,"hwmin":40, "chmax": 19,"id":"cf1f515c-7915-49d1-be4b-6c245ed6b255","name":"some name or other","slots":new Array(slotsPerDay).fill(false)},
            {"hwmax":50,"hwmin":42, "chmax": 17,"id":"f7e85ee8-9e3b-4c58-9bd8-5484b915de91","name":"some name or other","slots":new Array(slotsPerDay).fill(false)},
        ]
    };
}