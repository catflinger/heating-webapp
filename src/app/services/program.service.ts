import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProgramService, ProgramMode } from '../common/injectables';
import { Program } from '../common/program';
import { ProgramManager } from '../common/program-manager';

@Injectable()
export class ProgramService implements IProgramService {

    constructor(private http: HttpClient) {
    }

    public activateProgram(id: string, mode: ProgramMode): Observable<any> {
        return this.http.post("/api/activate-program", { id, mode });
    }
    
    public getProgram(id: string): Observable<Program> {
        return this.http.get(`/api/program/${id}`)
        .map( (data: any): Program => new Program(data));
    }
    
    public getProgramManager(): Observable<ProgramManager> {
        
        return this.http.get("/api/program")

        .map( (data: any): ProgramManager => {
            const result: ProgramManager = new ProgramManager();

            result.weekdayId = data.weekday;
            result.saturdayId = data.saturday;
            result.sundayId = data.sunday;
    
            data.programs.array.forEach( (element: any) => {
                result.programs.push(new Program(element));
            });

            return result;
        });
    }

    saveProgram(program: Program): Observable<any> {

        if (program.id) {
            return this.http.post(`/api/program/${program.id}`, program);
        } else {
            return this.http.put("/api/program", program);
        }
    }

    deleteProgram(id: string): Observable<any> {

        return this.http.delete(`/program/${id}`);
    }
}
