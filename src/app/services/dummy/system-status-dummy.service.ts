import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";

import { SystemStatus } from "../../common/system-status";
import { ISystemStatusService, slotsPerDay } from "../../common/injectables";

@Injectable()
export class SystemStatusDummyService implements ISystemStatusService {

    //private bSubject: BehaviorSubject<SystemStatus>;

    constructor(private http: HttpClient) {
        //this.refresh();
    }

    public getStatus(): Observable<SystemStatus> {
        return Observable.of(new SystemStatus(this.data));
    }

     public refresh(): void {
     }

    //     //this.data.items[3].snapshot.activeProgram.maxHWTemp++;

    //     // Observable.of(this.data)
    //     // .map((data) => new SystemStatus(data))
    //     // .subscribe((s) => {
    //     //     this.bSubject.next(s);
    //     // });

    // }

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
                snapshot: [
                    { reading: 51, id: "28.0", description: "hot water", role: "hw" },
                    { reading: 18, id: "28.1", description: "bedroom" },
                    { reading: 3, id: "28.2", description: "garage" },
                    { reading: 2, id: "28.3", description: "loft" },
                    { reading: null, id: "28.4", description: "other 1" },
                    { reading: null, id: "28.5", description: "other 2" }
                ]
            },
            {
                id: "activeProgram",
                snapshot: {
                    id: "ab-456cde-003-463",
                    name: "winter weekends",
                    "maxHWTemp": 50,
                    "minHWTemp": 40,
                    "chmax": 19,
                    "slots": new Array(slotsPerDay).fill(false),
                }
            },
            {
                id: "overrides",
                snapshot: [
                    {
                        start: 23,
                        duration: 12
                    }
                ],
            }
        ]
    };

}