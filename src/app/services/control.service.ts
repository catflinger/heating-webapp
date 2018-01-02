import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { IControlService } from "../common/system-status.interface";

@Injectable()
export class ControlService implements IControlService {

    constructor(private http: Http) { }

    public setOverride(state: boolean): Observable<boolean> {
        return this.http
            .post("http://cherrypi:3000/api/control/override/set", {
                state: true,
                duration: 5,
            })
            .map(result => true)
            .catch(error => Observable.from<boolean>([false]));
    }

    public clearOverride(): Observable<boolean> {
        return this.http
            .post("http://cherrrypi:3000/api/control/override/clear", null)
            .map(result => true)
            .catch(error => Observable.from<boolean>([false]));
    }
}
