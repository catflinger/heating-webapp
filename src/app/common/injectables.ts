import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs";
import { SystemStatus } from "./system-status";
import { Program } from "./program";
import { TemperatureSensor } from "./temperature-sensor";

export const slotsPerHour: number = 6;
export const hoursPerDay: number = 24;
export const slotsPerDay: number = slotsPerHour * 24;
export const minutesPerSlot: number = 60 / slotsPerHour;

export enum ProgramMode {
    Weekday = 1,
    Saturday = 2,
    Sunday = 3
}

export let INJECTABLES = {
    SystemStatusService: new InjectionToken<ISystemStatusService>("SystemStatusService"),
    ControlService: new InjectionToken<IControlService>("ControlService"),
    ProgramService: new InjectionToken<IProgramService>("ProgramService"),
    ProgramConfigService: new InjectionToken<IProgramConfigService>("ProgramConfigService"),
    SensorConfigService: new InjectionToken<ISensorService>("SensorConfigService"),
    SensorService: new InjectionToken<ISensorService>("SensorService"),
    OneWireService: new InjectionToken<ISensorService>("OneWireService"),
    SlotsPerDay: new InjectionToken<number>("SlotsPerDay"),
    AppConfig: new InjectionToken<IAppConfig>("AppConfig"),
};

export interface IOneWireService {
    getAvailableDevices(): Observable<string[]>;
}

export interface ISystemStatusService {
    getStatus(): Observable<SystemStatus>;
    refresh(): void;
}

export interface IControlService {
    setOverride(duration: number): Observable<boolean>;
    clearOverride(): Observable<boolean>;
}

// this interface is for reading the current sesnor values
export interface ISensorService {
    listSensors(): Observable<ISensor[]>;
    refresh(): void;
}

// this interface is for adding and removing sensors from the heating system
export interface ISensorConfigService {
    listSensors(): Observable<ISensor[]>;
    getSensor(id: string): Observable<ISensor>;
    updateSensor(sensor: ISensor): Observable<boolean>;
    removeSensor(sensor: string): Observable<boolean>;
}

export interface IProgramService {
    listPrograms(): Observable<Program[]>;
    getProgram(id: string): Observable<Program>;
    saveProgram(program: Program): Observable<any>;
    deleteProgram(id: string): Observable<any>;
}

export interface IProgramConfigService {
    
    getProgramConfig(): Observable<IProgramConfig>;
    setProgramConfig(config:IProgramConfig): Observable<any>;
}

export interface IAppConfig {
    apiBase: string;
}

export interface IDatedProgram {
    programId: string;
    activationDate: Date;
}

export interface IProgramConfig {
    weekdayProgramId: string;
    saturdayProgramId: string;
    sundayProgramId: string;
    datedPrograms: IDatedProgram[],
    clone(): IProgramConfig;
}

export interface ISensor {
    id: string;
    value: number;
    description: string;
    role: string;
}