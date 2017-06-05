import { Component, OnInit, Inject } from '@angular/core';
import { SystemStatus } from "../common/system-status";
import { IControlService, ISystemStatusService } from "../common/system-status.interface";
import { INJECTABLES } from "../common/injectables";

@Component({
    selector: 'app-summary-info',
    templateUrl: './summary-info.component.html',
    styleUrls: ['./summary-info.component.css']
})
export class SummaryInfoComponent implements OnInit {
    private status: SystemStatus;
    private successMessage: string;

    constructor(
        @Inject(INJECTABLES.SystemStatusService) private statusService: ISystemStatusService,
        @Inject(INJECTABLES.ControlService) private controlService: IControlService) {
    }

    ngOnInit() {
        this.refresh();
    }

    clearMessage(): void {
        this.successMessage = null;
    }

    setOverride(state: boolean): void {
        this.successMessage = null;

        // send a message to the server to do something

        this.controlService.setOverride(state)
        .subscribe(
            (result) => {
                this.successMessage = result ? "Heating boost set." : "Failed to set the heating override";
                this.refresh();
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
                this.refresh();
            },
            (error) => {
                console.log("Error: " + error);
                this.successMessage = "Failed to clear the heating override: " + error;
            }
        );        
    }

    refresh(): void {
        this.statusService.getStatus()
            .subscribe(
                (status) => {
                    this.status = status;
                    console.log(JSON.stringify(this.status));
                },
                (error) => {
                    console.log("Error: " + error);
                    this.successMessage = "Failed to get the system status info: " + error;
                }
            );
    }
}
