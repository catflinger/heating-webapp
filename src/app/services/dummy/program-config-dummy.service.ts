import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProgramMode, IAppConfig, INJECTABLES, IProgramConfigService, IProgramConfig } from '../../common/injectables';
import { Program } from '../../common/program';
import { ProgramConfig } from '../../common/program-config';

@Injectable()
export class ProgramConfigDummyService implements IProgramConfigService {

    constructor(private http: HttpClient,
        @Inject(INJECTABLES.AppConfig) private appConfig: IAppConfig) {
    }

    public setProgramConfig(config: IProgramConfig): Observable<any> {
        return this.http.put(this.appConfig.apiBase + "/api/program-config", config);
    }
    
    public getProgramConfig(): Observable<IProgramConfig> {
        
        const result: IProgramConfig = new ProgramConfig();

        result.weekdayProgramId = "b5fdc7cb-fe7a-4e99-874d-ac0f480b393e";
        result.saturdayProgramId = "cf1f515c-7915-49d1-be4b-6c245ed6b255";
        result.sundayProgramId = "b5fdc7cb-fe7a-4e99-874d-ac0f480b393e";

        return Observable.of(result);
    }
}
