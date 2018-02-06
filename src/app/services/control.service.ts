import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import { IControlService } from "../common/injectables";

@Injectable()
export class ControlService implements IControlService {

    constructor(private http: HttpClient) { }

    public setOverride(state: boolean): Observable<boolean> {
        return this.http
            .post("/api/control/override/set", {
                state: true,
                duration: 5,
            })
            .map(result => true)
            .catch(error => Observable.from<boolean>([false]));
    }

    public clearOverride(): Observable<boolean> {
        return this.http
            .post("/api/control/override/clear", null)
            .map(result => true)
            .catch(error => Observable.from<boolean>([false]));
    }
}


