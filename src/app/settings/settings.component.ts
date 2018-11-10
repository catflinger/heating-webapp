import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { INJECTABLES, IOneWireService, ISensorConfigService, ISensor, ISensorService } from '../common/injectables';
import { Observable } from 'rxjs';
import { List } from "linqts";
import { TemperatureSensor } from '../common/temperature-sensor';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

    private devices: List<string>;
    private configuredSensors: List<ISensor>;
    private unconfiguredSensors: List<ISensor>;
    private allSensors: ISensor[];

    constructor(
        private router: Router,
        @Inject(INJECTABLES.OneWireService) private oneWireServcie: IOneWireService,
        @Inject(INJECTABLES.SensorConfigService)private sensorConfigService: ISensorConfigService,
        @Inject(INJECTABLES.SensorService)private sensorService: ISensorService
    ) { }

    ngOnInit() {
        const deviceStream: Observable<string[]> = this.oneWireServcie.getAvailableDevices();
        const sensorStream: Observable<ISensor[]> = this.sensorService.listSensors();

        Observable.forkJoin(deviceStream, sensorStream).subscribe((results: [string[], [ISensor]]) => {
            this.devices = new List<string>(results[0]);
            this.configuredSensors = new List<ISensor>(results[1]);

            this.unconfiguredSensors = this.devices
                .Where((d: string): boolean => {
                    return !this.configuredSensors.Any((s: ISensor): boolean => s.id === d);
                })
                .Select(d => new TemperatureSensor({ id: d, description: "unused", role: "", value: 0 }));

            this.allSensors = this.configuredSensors.ToArray().concat(this.unconfiguredSensors.ToArray());
        });
    }

    private btnEdit(id: string) {
        this.router.navigate(["sensor-edit", id]);
    }

    private btnRemove(id: string) {
        if (confirm("Confirm remove sensor?")) {
            this.sensorConfigService.removeSensor(id)
            .subscribe(response => this.ngOnInit(),
            err => /* show a message */ null );
        }
    }
}
