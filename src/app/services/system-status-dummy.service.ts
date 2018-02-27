import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

import { SystemStatus } from "../common/system-status";
import { ISystemStatusService, slotsPerDay } from "../common/injectables";

@Injectable()
export class SystemStatusDummyService implements ISystemStatusService {

    constructor(private http: HttpClient) {
    }

    public getStatus(): Observable<SystemStatus> {
        return Observable.of(new SystemStatus(this.data));
    }

public refresh() {}

    private data: any = {
        items: [
            {
                id: "control",
                snapshot: {
                    heating: true,
                    hotWater: true
                }
            },
            {
                id: "device",
                snapshot: {
                    boiler: true,
                    chPump: true,
                    hwPump: false
                }
            },
            {
                id: "env",
                snapshot: {
                    "sensors": [
                        { reading: 51, id: "hw" },
                        { reading: 18, id: "bedroom" },
                        { reading: 3, id: "garage" },
                        { reading: 2, id: "loft" },
                        { reading: null, id: "other1" },
                        { reading: null, id: "other2" }
                    ]
                }
            },
            {
                id: "controller",
                snapshot: {
                    overrides: [
                        {
                            start: 23,
                            duration: 12
                        }
                    ],
                    activeProgram: {
                        id: "ab-456cde-003-463",
                        name: "winter weekends",
                        "hwmax": 50,
                        "hwmin": 40,
                        "chmax": 19,
                        "slots": new Array(slotsPerDay).fill(false),
                    }
                }
            }
        ]
    };

}