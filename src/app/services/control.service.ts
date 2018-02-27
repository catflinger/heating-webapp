import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";
import { IControlService } from "../common/injectables";

@Injectable()
export class ControlService implements IControlService {

    constructor(private http: HttpClient) { }

    public setOverride(duration: number): Observable<boolean> {
        return this.http
            .put("/api/control/override", { duration })
            .map(result => true)
            .catch(error => Observable.from<boolean>([false]));
    }

    public clearOverride(): Observable<boolean> {
        return this.http
            .delete("/api/control/override")
            .map(result => true)
            .catch(error => Observable.from<boolean>([false]));
    }
}


