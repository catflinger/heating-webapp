import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";

import { SystemStatus } from "../common/system-status";

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
            },
            program: {
                slotsPerDay: 10,
                slots: [
                    true,
                    true,
                    true,
                    false,
                    false,
                    false,
                    false,
                    true,
                    true,
                    true
                ]
            }
        }));
    }
}
