import { OpaqueToken } from "@angular/core";

export let INJECTABLES = {
    SystemStatusService: new OpaqueToken("ISystemStatusService"),
    ControlService: new OpaqueToken("IControlService")
};