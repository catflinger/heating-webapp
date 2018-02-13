import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { SystemStatus } from "./system-status";
import { Program } from "./program";
import { ProgramManager } from "./program-manager";

export const slotsPerHour: number = 6;
export const hoursPerDay: number = 24;
export const slotsPerDay: number = slotsPerHour * 24;

export enum ProgramMode {
    Weekday = 1,
    Saturday = 2,
    Sunday = 3
}

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
    
    getProgramManager(): Observable<ProgramManager>;
    getProgram(id: string): Observable<Program>;
    saveProgram(program: Program): Observable<any>;
    deleteProgram(id: string): Observable<any>;
    activateProgram(id: string, mode: ProgramMode): Observable<any>;
}