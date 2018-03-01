import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProgramMode, IAppConfig, INJECTABLES, IProgramConfigService, IProgramConfig } from '../common/injectables';
import { Program } from '../common/program';
import { ProgramConfig } from '../common/program-config';

@Injectable()
export class ProgramConfigService implements IProgramConfigService {

    constructor(private http: HttpClient,
        @Inject(INJECTABLES.AppConfig) private appConfig: IAppConfig) {
    }

    public setProgramConfig(config: IProgramConfig): Observable<any> {
        return this.http.post(this.appConfig.apiBase + "/api/activate-program", config);
    }
    
    public getProgramConfig(): Observable<IProgramConfig> {
        
        return this.http.get(this.appConfig.apiBase + "/api/program-config")

        .map( (data: any): IProgramConfig => {

            console.log(JSON.stringify(data));

            const result: IProgramConfig = new ProgramConfig();

            result.weekdayProgramId = data.weekdayProgramId;
            result.saturdayProgramId = data.saturdayProgramId;
            result.sundayProgramId = data.sundayProgramId;
    
            return result;
        });
    }
}
