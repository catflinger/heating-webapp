import { Component, OnInit, Inject } from '@angular/core';
import { SystemStatus } from "../common/system-status";
import { ISystemStatusService } from "../common/system-status.interface";
import { INJECTABLES } from "../common/injectables";

@Component({
    selector: 'app-summary-info',
    templateUrl: './summary-info.component.html',
    styleUrls: ['./summary-info.component.css']
})
export class SummaryInfoComponent implements OnInit {
    private status: SystemStatus;

    constructor(@Inject(INJECTABLES.SystemStatusService) private statusService: ISystemStatusService) { }

    ngOnInit() {
        this.statusService.getStatus().subscribe((status) => {
            this.status = status;
        });
    }

    heatButton(): void {
        // send a message to the server to do something
        
    }

}
