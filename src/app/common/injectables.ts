import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { SystemStatus } from "./system-status";
import { Program } from "./program";

export let slotsPerDay: number = 10;

export let INJECTABLES = {
    SystemStatusService: new InjectionToken("SystemStatusService"),
    ControlService: new InjectionToken("ControlService"),
    ProgramService: new InjectionToken("ProgramService"),
    SlotsPerDay: new InjectionToken("SlotsPerDay"),
};

export interface ISystemStatusService {
    getStatus(): Observable<SystemStatus>;
}

export interface IControlService {
    setOverride(state: boolean): Observable<boolean>;
    clearOverride(): Observable<boolean>;
}

export interface IProgramService {
    
    list(): Observable<Program[]>;
    
    getProgram(id: string): Observable<Program>;
}