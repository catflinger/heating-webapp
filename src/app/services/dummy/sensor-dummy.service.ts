import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProgramMode, IAppConfig, INJECTABLES, ISensorService, IProgramConfig, ISensor } from '../../common/injectables';
import { Program } from '../../common/program';
import { ProgramConfig } from '../../common/program-config';
import { TemperatureSensor } from '../../common/temperature-sensor';

@Injectable()
export class SensorDummyService implements ISensorService {
    refresh(): void {
        throw new Error("Method not implemented.");
    }
    updateSensor(sensor: ISensor): Observable<boolean> {
        throw new Error("Method not implemented.");
    }
    
    updateSensors(sensors: ISensor[]): Observable<boolean> {
        throw new Error("Method not implemented.");
    }

    constructor(private http: HttpClient,
        @Inject(INJECTABLES.AppConfig) private appConfig: IAppConfig) {
    }

    public listSensors(): Observable<ISensor[]> {

        return Observable.of([
            new TemperatureSensor({
                id: "hw",
                description: "hot water",
                reading: 47.1,
            }),
            new TemperatureSensor({
                id: "bedroom",
                description: "bedroom",
                reading: 16,
            })

        ]);
    }

    getSensor(id: string): Observable<ISensor> {
        return this.http.get(this.appConfig.apiBase + "/api/sensor/" + id)
        .map( (data: any): TemperatureSensor => new TemperatureSensor(data));
    }
}
