import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProgramService } from '../common/injectables';
import { Program } from '../common/program';

@Injectable()
export class ProgramService implements IProgramService {

    constructor(private http: HttpClient) {
    }

    getProgram(id: string): Observable<Program> {
        return this.http.get(`/api/program/${id}`)
        .map( (data: any): Program => new Program(data));
    }
    
    public list(): Observable<Program[]> {
        
        return this.http.get("/api/program")

        .map( (data: any): Program[] => {
            const result: Program[] = [];

            data.programs.array.forEach( (element: any) => {
                result.push(new Program(element));
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
