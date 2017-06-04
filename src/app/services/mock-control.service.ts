import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { IControlService } from "../common/system-status.interface";

@Injectable()
export class MockControlService implements IControlService {

    constructor() { }

    setOverride(state: boolean): Observable<boolean> {
        return Observable.of(true);
    }
}
