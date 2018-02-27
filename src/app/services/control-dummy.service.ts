import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

import { SystemStatus } from "../common/system-status";
import { IControlService } from "../common/injectables";

@Injectable()
export class ControlDummyService implements IControlService {

    constructor(private http: HttpClient) {
    }

    setOverride(duration: number): Observable<boolean> {
        return Observable.of(true);
    }

    clearOverride(): Observable<boolean> {
        return Observable.of(true);
    }

}
