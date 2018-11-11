import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SystemStatus } from "../common/system-status";
import { INJECTABLES, ISystemStatusService, ISensorService, ISensor, minutesPerSlot } from "../common/injectables";
import { List } from 'linqts';

@Component({
    selector: 'app-summary-info',
    templateUrl: './summary-info.component.html',
    styleUrls: ['./summary-info.component.css']
})
export class SummaryInfoComponent implements OnInit {
    private status: SystemStatus;
    private sensors: ISensor[];
    private successMessage: string;
    private minutesPerSlot = minutesPerSlot;

    constructor(
        private router: Router,  
        @Inject(INJECTABLES.SystemStatusService) private statusService: ISystemStatusService,
        @Inject(INJECTABLES.SensorService) private sensorService: ISensorService
        ) {
    }

    ngOnInit() {
        this.statusService.getStatus().subscribe((s) => this.status = s);

        this.sensorService.listSensors()
        .subscribe(
            (sensors) => {
                this.sensors = new List<ISensor>(sensors)
                    .OrderBy(s => s.description)
                    .ToArray();
            },
            (error) => {
                this.successMessage = "Failed to get the system status info: " + error;
            }
        );
    }

    clearMessage(): void {
        this.successMessage = null;
    }

    refresh(): void {
        this.statusService.refresh();
        this.sensorService.refresh();
    }

    private editProgram(id: string) {
        this.router.navigate(["program-edit", id]);
    }
}
