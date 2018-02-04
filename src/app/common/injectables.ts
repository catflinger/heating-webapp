import { InjectionToken } from "@angular/core";


export let INJECTABLES = {
    SystemStatusService: new InjectionToken("SystemStatusService"),
    ControlService: new InjectionToken("ControlService")
};