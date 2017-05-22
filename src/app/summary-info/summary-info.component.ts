import { Component, OnInit } from '@angular/core';
import { SystemStatus } from "../common/system-status";
import { SystemStatusService } from "../services/system-status.service";

@Component({
    selector: 'app-summary-info',
    templateUrl: './summary-info.component.html',
    styleUrls: ['./summary-info.component.css']
})
export class SummaryInfoComponent implements OnInit {
    private status: SystemStatus;

    constructor(private statusService: SystemStatusService) { }

    ngOnInit() {
        this.statusService.getStatus().subscribe((status) => {
            this.status = status;
        });
    }

}
