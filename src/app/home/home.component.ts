import { Component, OnInit, Inject } from '@angular/core';
import { IControlService, ISystemStatusService, slotsPerHour, ISensorService, ISensor } from "../common/injectables";
import { INJECTABLES } from "../common/injectables";
import { SystemStatus } from '../common/system-status';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private successMessage: string;
    private status: SystemStatus;
    private sensors: ISensor[];

    constructor(
        @Inject(INJECTABLES.SystemStatusService) private statusService: ISystemStatusService,
        @Inject(INJECTABLES.ControlService) private controlService: IControlService,
        @Inject(INJECTABLES.SensorService) private sensorService: ISensorService) { }

    ngOnInit() {
        this.statusService.getStatus()
        .catch((error) => null)
        .subscribe((s: SystemStatus) => this.status = s);

        this.sensorService.listSensors()
        .catch((error) => null)
        .subscribe((s: ISensor[]) => this.sensors = s);
    }

    private clearMessage(): void {
        this.successMessage = null;
    }

    private setOverride(hours: number): void {
        this.successMessage = null;

        this.controlService.setOverride(hours * slotsPerHour)
            .subscribe(
            (result) => {
                this.successMessage = result ? "Heating boost set." : "Failed to set the heating override";
            },
            (error) => {
                console.log("Error: " + error);
                this.successMessage = "Failed to set the heating override: " + error;
            }
            );
    }

    private clearOverride(): void {
        this.successMessage = null;

        // send a message to the server to do something

        this.controlService.clearOverride()
            .subscribe(
            (result) => {
                this.successMessage = result ? "Heating overrides cleared." : "Failed to clear the heating override";
            },
            (error) => {
                console.log("Error: " + error);
                this.successMessage = "Failed to clear the heating override: " + error;
            }
            );
    }
    
    getSensorReadingByRole(role: string): number {
        return this.sensors.find((s) => s.role === role).value;
    }

    getSensorReading(id: string): number {
        return this.sensors.find((s) => s.id === id).value;
    }
}
