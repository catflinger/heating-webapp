import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SystemStatus } from "../common/system-status";
import { ISystemStatusService } from "../common/injectables";

@Injectable()
export class SystemStatusService implements ISystemStatusService {

    constructor(private http: HttpClient) {
    }

    public getStatus(): Observable<SystemStatus> {
        return this.http.get("/api/status")
            .map((res: Response) => {
                console.log(res);
                return new SystemStatus(res);
            })
           .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}
