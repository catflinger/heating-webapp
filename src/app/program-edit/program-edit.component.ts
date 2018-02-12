import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

import { IProgramService, INJECTABLES, hoursPerDay, slotsPerHour } from '../common/injectables';
import { Program } from '../common/program';

@Component({
    selector: 'app-program-edit',
    templateUrl: './program-edit.component.html',
    styleUrls: ['./program-edit.component.css']
})
export class ProgramEditComponent implements OnInit {
    private sub: any;
    private program: Program;

    private form: FormGroup;

    constructor(
        private router: Router, 
        private route: ActivatedRoute, 
        @Inject(INJECTABLES.ProgramService) private programService: IProgramService) { }

    ngOnInit() {

        let id: any = this.route.snapshot.params["id"];

        if (typeof id === "string" && id !== "0") {
            
            // get an existing program
            this.programService.getProgram(id).subscribe((p) => {
                this.useProgram(p);
            });

        } else {
            // create a new program
            this.useProgram(new Program(undefined));
        }
    }

    private useProgram(p: Program): void {

        this.program = p;

        this.form = new FormGroup ({
            id: new FormControl(p.id),
            name: new FormControl(p.name,  Validators.required),
            hwmax: new FormControl(p.hwmax,  Validators.required),
            hwmin: new FormControl(p.hwmin,  Validators.required),
            hours: new FormArray([])
        });

        for (let hour: number = 0; hour < hoursPerDay; hour++){
            let slotArray = new FormArray([]);
            this.hourArray.push(slotArray);

            for (let i = 0; i < slotsPerHour; i++) {
                slotArray.push(
                    new FormControl(p.slots[hour * slotsPerHour + i]));
            }
        }
    }

    get hourArray(): FormArray { return this.form.get('hours') as FormArray}

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }

    onCancel(): void {
        this.router.navigateByUrl("/programs");
    }

    onSave(): void {
        // copy the modified data back into the model
        if (this.form.valid) {
            this.program.name = this.form.get("name").value;
            this.program.hwmin = this.form.get("hwmin").value;
            this.program.hwmax = this.form.get("hwmax").value;
            let n: number = 0;
            this.hourArray.controls.forEach( (ctls: FormArray) => {
                ctls.controls.forEach( (ctl: FormControl) => {
                    this.program.slots[n] = ctl.value;
                    n++;
                });
            });
        }

        this.programService.saveProgram(this.program)
        .subscribe( () => {
            this.router.navigateByUrl("/programs");
        });
    }
}

