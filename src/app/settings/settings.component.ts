import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { INJECTABLES, IOneWireService, ISensorService, ISensor } from '../common/injectables';
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
    private allSesnors: List<ISensor>;

    constructor(
        private router: Router,
        @Inject(INJECTABLES.OneWireService) private oneWireServcie: IOneWireService,
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
                .Select(d => new TemperatureSensor({ id: d, description: "unknown", role: "", reading: 0 }));

            this.allSesnors = this.configuredSensors.Union(this.unconfiguredSensors);
        });
    }
}
