
import { Observable } from "rxjs";

import { SystemStatus } from "./system-status";


export interface ISystemStatusService {
    getStatus(): Observable<SystemStatus>;
}

export interface IControlService {
    setOverride(state: boolean): Observable<boolean>;
    clearOverride(): Observable<boolean>;
}