import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";

import { SystemStatus } from "../common/system-status";
import { ISystemStatusService } from "../common/system-status.interface";

@Injectable()
export class MockSystemStatusService implements ISystemStatusService {

    constructor() {
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
                hwmin: 40,
                hwmax: 50,
                slots: [
                    false,
                    false,
                    false,
                    false,
                    true,
                    false,
                    false,
                    true,
                    false,
                    false
                ]
            }
        }));
    }
}
