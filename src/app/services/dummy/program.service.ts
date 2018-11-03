import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProgramService, ProgramMode, IAppConfig, INJECTABLES } from '../../common/injectables';
import { Program } from '../../common/program';

@Injectable()
export class ProgramService implements IProgramService {

    constructor(private http: HttpClient,
        @Inject(INJECTABLES.AppConfig) private appConfig: IAppConfig) {
    }

    public listPrograms(): Observable<Program[]> {
        return this.http.get(this.appConfig.apiBase + "/api/program")
        .map( (data: any): Program[] => {

            const result: Program[] = [];
            data.items.forEach((p: any) => {
               result.push(new Program(p)); 
            });
            return result;
        });
    }
       
    public getProgram(id: string): Observable<Program> {
        return this.http
        .get(this.appConfig.apiBase + `/api/program/${id}`)
        .map((data: any): Program => new Program(data));
    }

    public saveProgram(program: Program): Observable<any> {
        if (program.id) {
            return this.http.post<Program>(this.appConfig.apiBase + `/api/program/${program.id}`, program);
        } else {
            return this.http.put<Program>(this.appConfig.apiBase + "/api/program", program);
        }
    }

    public deleteProgram(id: string): Observable<any> {

        return this.http.delete(this.appConfig.apiBase + `/api/program/${id}`);
    }
}
