import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProgramMode, IAppConfig, INJECTABLES, ISensorService, IProgramConfig, ISensor, ISensorConfigService } from '../common/injectables';
import { TemperatureSensor } from '../common/temperature-sensor';

// this service provides readings from the sensors currently configured in the controller
// and allows the sensor configuration to be updated

// note: some functionality in this API is duplicated in the SensorService.  Though the data returned by the http-get calls from these 
// two services is the same logically they perform different functions: one is for getting current sensor readings and the
// other is for getting the sensor configuration.  In the case of sensor configuration the current reading is provided to help
// a user to identify a sensor during the configuration process.  In the case of sensor readings the configuration information 
// is provided to allow the application to diplay the reading in an appropriate context.

@Injectable()
export class SensorConfigService implements ISensorConfigService {

    constructor(private http: HttpClient,
        @Inject(INJECTABLES.AppConfig) private appConfig: IAppConfig) {
    }

    public listSensors(): Observable<ISensor[]> {
        
        return this.http.get(this.appConfig.apiBase + "sensor-config")

        .map( (data: any): TemperatureSensor[] => {

            console.log(JSON.stringify(data));

            const result: TemperatureSensor[] = [];
            data.sensors.forEach((s: any) => {
                result.push(new TemperatureSensor(s));
            });
            return result;
        });
    }

    public getSensor(id: string): Observable<ISensor> {
        
        return this.http.get(this.appConfig.apiBase + `sensor-config/${id}`)
        .catch((err: HttpErrorResponse)=> {
            if (err.error instanceof Error) {
                throw err.error;
            } else if (err.status === 404) {
                return Observable.of<any>({ id: id, description: "unknown", role: "", value: 0})
            } else {
                throw err;
            }
        })
        .map( (data: any): TemperatureSensor => new TemperatureSensor(data));
    }

    updateSensor(sensor: ISensor): Observable<boolean> {
        return this.http.post(this.appConfig.apiBase + `sensor-config/${sensor.id}`, sensor)
        .map( (data: any) => true );
    }

    removeSensor(id: string): Observable<boolean> {
        return this.http.delete(this.appConfig.apiBase + `sensor-config/${id}`)
        .map( (data: any) => true );
    }
}
