import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { INJECTABLES, IOneWireService } from '../common/injectables';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
    private devices: string[] = [];
    constructor(
        private router: Router,
        @Inject(INJECTABLES.OneWireService) private oneWireServcie: IOneWireService
    ) { }

    ngOnInit() {
        this.oneWireServcie.getAvailableDevices().subscribe((devices: string[]) => {
            this.devices = devices;
        });
    }
}
