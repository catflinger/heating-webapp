import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { SystemStatus } from "../common/system-status";
import { ISystemStatusService, IAppConfig, INJECTABLES } from "../common/injectables";

@Injectable()
export class SystemStatusService implements ISystemStatusService {

    private bSubject: BehaviorSubject<SystemStatus>;

    constructor(
        private http: HttpClient, 
        @Inject(INJECTABLES.AppConfig) private appConfig: IAppConfig) {
            // default to a value of null for the initial SystemStatus reading
            this.bSubject = <BehaviorSubject<SystemStatus>>new BehaviorSubject(null);
            this.refresh();
            setInterval(() => this.refresh(), 60000);
    }

    public getStatus(): Observable<SystemStatus> {
        return this.bSubject.asObservable();
    }
    
    public refresh(): void {

        this.http.get(this.appConfig.apiBase + "status")
        .map((data) => {
            // console.log("SUMMARY API RESPONSE:" + JSON.stringify(data));
            return new SystemStatus(data)
        }).subscribe((s) => {
            this.bSubject.next(s);
        }
        );

    }
}
