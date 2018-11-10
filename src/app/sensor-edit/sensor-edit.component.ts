import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { INJECTABLES, ISensor, ISensorConfigService } from '../common/injectables';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sensor-edit',
  templateUrl: './sensor-edit.component.html',
  styleUrls: ['./sensor-edit.component.css']
})
export class SensorEditComponent implements OnInit {
    private statusMessage: string = null;
    private sensor: ISensor = null;
    private form: FormGroup;

    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        @Inject(INJECTABLES.SensorConfigService) private sensorConfigService: ISensorConfigService) { }

        ngOnInit() {

            let id: any = this.route.snapshot.params.id;
    
            // get an existing program
            this.sensorConfigService.getSensor(id)
            .subscribe(
                (s: ISensor) => {
                    this.sensor = s;

                    this.form = new FormGroup ({
                        id: new FormControl({value: s.id, disabled: true}),
                        description: new FormControl(s.description,  Validators.required),
                        role: new FormControl(s.role)
                    });
                },
                (err: Error) => alert("could not find sensor " + err));
        }

        close(): void {
            this.router.navigateByUrl("/settings");
        }

        onSave(): void {
            // copy the modified data back into the model
            if (this.form.valid) {
                this.sensor.description = this.form.get("description").value;
                this.sensor.role = this.form.get("role").value;

            this.sensorConfigService.updateSensor(this.sensor).subscribe(
                result => { this.close() },
                err => { this.statusMessage = "Could not save data " });
            } else {

            }
        }
}
