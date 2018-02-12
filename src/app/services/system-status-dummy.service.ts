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

    private data: any = { 
        "control": { 
            "heating": false, 
            "water": false 
        }, 
        
        "device": { 
            "boiler": false, 
            "chPump": false, 
            "hwPump": false 
        }, 
            
        "env": { 
            "sensors": [
                { "_reading": 51, "_id": "hw" }, 
                { "_reading": 18, "_id": "bedroom" }, 
                { "_reading": 3, "_id": "garage" }, 
                { "_reading": 2, "_id": "loft" }, 
                { "_reading": null, "_id": "other1" }, 
                { "_reading": null, "_id": "other2" }
            ] 
        }, 
        
        "override": null, 
        
        "program": { 
            "hwmax": 50, 
            "hwmin": 40, 
            "chmax": 19, 
            "slots": new Array(slotsPerDay).fill(false), 
        } 
    }
}