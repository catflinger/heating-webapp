import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs";

import { SystemStatus } from "../common/system-status";
import { ISystemStatusService } from "../common/system-status.interface";

@Injectable()
export class SystemStatusService implements ISystemStatusService {

    constructor(private http: Http) {
    }

    public getStatus(): Observable<SystemStatus> {
        return this.http.get("http://cherrypi:3000/api/status")
            .map((res: Response) => {
                console.log(res.json());
                return new SystemStatus(res.json());
            })
           .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}
