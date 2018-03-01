import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";

import { SystemStatus } from "../common/system-status";
import { ISystemStatusService, slotsPerDay } from "../common/injectables";

@Injectable()
export class SystemStatusDummyService implements ISystemStatusService {

    private bSubject: BehaviorSubject<SystemStatus>;

    constructor(private http: HttpClient) {
        this.refresh();
    }

    public getStatus(): Observable<SystemStatus> {
        return this.bSubject.asObservable();
    }

    public refresh(): void {
        if (!this.bSubject) {
            this.bSubject = <BehaviorSubject<SystemStatus>>new BehaviorSubject(null);
        }

        console.log("getting data");
        this.data.items[3].snapshot.activeProgram.hwmax++;

        Observable.of(this.data)
        .map((data) => new SystemStatus(data))
        .subscribe((s) => {
            this.bSubject.next(s);
        });

    }

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