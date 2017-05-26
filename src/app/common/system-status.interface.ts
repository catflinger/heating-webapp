
import { Observable } from "rxjs";

import { SystemStatus } from "./system-status";


export interface ISystemStatusService {
    getStatus(): Observable<SystemStatus>;
}