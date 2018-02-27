import { Component, OnInit, Inject } from '@angular/core';
import { IControlService, ISystemStatusService, slotsPerHour } from "../common/injectables";
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

    constructor(
        @Inject(INJECTABLES.SystemStatusService) private statusService: ISystemStatusService,
        @Inject(INJECTABLES.ControlService) private controlService: IControlService) { }

    ngOnInit() {
        this.statusService.getStatus()
        .catch((error) => null)
        .subscribe((s: SystemStatus) => this.status = s);
    }

    clearMessage(): void {
        this.successMessage = null;
    }

    setOverride(): void {
        this.successMessage = null;

        // send a message to the server to do something

        this.controlService.setOverride(1 * slotsPerHour)
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

    clearOverride(): void {
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

}
