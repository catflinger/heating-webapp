import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProgramMode, IAppConfig, INJECTABLES, ISensorService, IProgramConfig, ISensor } from '../common/injectables';
import { Program } from '../common/program';
import { ProgramConfig } from '../common/program-config';
import { TemperatureSensor } from '../common/temperature-sensor';

// this service provides readings from the sensors currently configured in the controller
// and allows the sensor configuration to be updated

@Injectable()
export class SensorService implements ISensorService {

    constructor(private http: HttpClient,
        @Inject(INJECTABLES.AppConfig) private appConfig: IAppConfig) {
    }

    public listSensors(): Observable<ISensor[]> {
        
        return this.http.get(this.appConfig.apiBase + "/api/sensor")

        .map( (data: any): TemperatureSensor[] => {

            console.log(JSON.stringify(data));

            const result: TemperatureSensor[] = [];
            data.items.forEach((s: any) => {
                result.push(new TemperatureSensor(s));
            });
            return result;
        });
    }

    updateSensors(sensors: ISensor[]): Observable<boolean> {
        return this.http.put(this.appConfig.apiBase + "/api/sensor/", { sensors: sensors })
        .map( (data: any) => true );
    }
}
