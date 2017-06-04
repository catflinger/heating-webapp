import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import { IControlService } from "../common/system-status.interface";

@Injectable()
export class ControlService implements IControlService {

    constructor() { }

    setOverride(state: boolean): Observable<boolean> {
        throw new Error("Method not implemented.");
    }
}
