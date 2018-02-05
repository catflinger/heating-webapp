import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { SystemStatus } from "./system-status";


export let INJECTABLES = {
    SystemStatusService: new InjectionToken("SystemStatusService"),
    ControlService: new InjectionToken("ControlService"),
    ProgramService: new InjectionToken("ProgramService")
};

export interface ISystemStatusService {
    getStatus(): Observable<SystemStatus>;
}

export interface IControlService {
    setOverride(state: boolean): Observable<boolean>;
    clearOverride(): Observable<boolean>;
}
