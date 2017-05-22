import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";

import { SystemStatus } from "../model/system-status";

@Injectable()
export class SystemStatusService {

    constructor(private http: Http) {
    }

    public getStatus(): Observable<SystemStatus> {
        return Observable.of<SystemStatus>(new SystemStatus({
            env: {
                hwTemp: 45
            },
            control: {
                water: true,
                heating: false
            }
        }));
    }
}