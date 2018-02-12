import { Component, OnInit, Inject } from '@angular/core';
import { SystemStatus } from "../common/system-status";
import { ISystemStatusService } from "../common/injectables";
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
        ) {
    }

    ngOnInit() {
        this.refresh();
    }

    clearMessage(): void {
        this.successMessage = null;
    }

    refresh(): void {
        this.statusService.getStatus()
            .subscribe(
                (status) => {
                    this.status = status;
                },
                (error) => {
                    this.successMessage = "Failed to get the system status info: " + error;
                }
            );
    }
}
