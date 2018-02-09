import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    constructor(private route: ActivatedRoute, @Inject(INJECTABLES.ProgramService) private programService: IProgramService) { }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
            let id = params['id']; 

            this.programService.getProgram(id).subscribe(
                (p) => {
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
            );
        });
    }

    get hourArray(): FormArray { return this.form.get('hours') as FormArray}

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}

