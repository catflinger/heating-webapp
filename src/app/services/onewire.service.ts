import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IAppConfig, INJECTABLES, IOneWireService } from '../common/injectables';

@Injectable()
export class OneWireService implements IOneWireService {
    getAvailableDevices(): Observable<string[]> {
        return this.http.get(this.appConfig.apiBase + "/api/onewire")
            .map( (data: any): string[] => {
            console.log(JSON.stringify(data));
            return data.devices;
        });
    }

    constructor(private http: HttpClient,
        @Inject(INJECTABLES.AppConfig) private appConfig: IAppConfig) {
    }
}
