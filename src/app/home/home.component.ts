import { Component, OnInit, Inject } from '@angular/core';
import { IControlService, ISystemStatusService } from "../common/injectables";
import { INJECTABLES } from "../common/injectables";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private successMessage: string;
    constructor(@Inject(INJECTABLES.ControlService) private controlService: IControlService) { }

    ngOnInit() {
    }

    setOverride(state: boolean): void {
        this.successMessage = null;

        // send a message to the server to do something

        this.controlService.setOverride(state)
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
