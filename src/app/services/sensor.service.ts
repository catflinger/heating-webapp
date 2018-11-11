import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { ProgramMode, IAppConfig, INJECTABLES, ISensorService, IProgramConfig, ISensor } from '../common/injectables';
import { Program } from '../common/program';
import { ProgramConfig } from '../common/program-config';
import { TemperatureSensor } from '../common/temperature-sensor';

// this service provides readings from the sensors currently configured in the controller
// and allows the sensor configuration to be updated

@Injectable()
export class SensorService implements ISensorService {

    private bSubject: BehaviorSubject<ISensor[]>;

    constructor(private http: HttpClient,
        @Inject(INJECTABLES.AppConfig) private appConfig: IAppConfig) {
            this.bSubject = new BehaviorSubject<ISensor[]>([]);
            this.refresh();
            setInterval(() => this.refresh(), 60000);

    }

    public listSensors(): Observable<ISensor[]> {
        return this.bSubject.asObservable();
    }

    public refresh() {
        
        return this.http.get(this.appConfig.apiBase + "sensor")

        .map( (data: any): TemperatureSensor[] => {

            // console.log(JSON.stringify(data));

            const result: TemperatureSensor[] = [];
            data.items.forEach((s: any) => {
                result.push(new TemperatureSensor(s));
            });
            return result;
        })
        .subscribe((s) => this.bSubject.next(s));
    }
}
