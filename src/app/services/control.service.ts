import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import { IControlService, INJECTABLES, IAppConfig } from "../common/injectables";

@Injectable()
export class ControlService implements IControlService {

    constructor(
        private http: HttpClient,
        @Inject(INJECTABLES.AppConfig) private appConfig: IAppConfig) { }

    public setOverride(duration: number): Observable<boolean> {
        return this.http
            .put(this.appConfig.apiBase + "/api/override", { duration })
            .map(result => true)
            .catch(error => Observable.from<boolean>([false]));
    }

    public clearOverride(): Observable<boolean> {
        return this.http
            .delete(this.appConfig.apiBase + "/api/override")
            .map(result => true)
            .catch(error => Observable.from<boolean>([false]));
    }
}


