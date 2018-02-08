import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { IProgramService, INJECTABLES } from '../common/injectables';
import { Program } from '../common/program';

@Component({
    selector: 'app-program-edit',
    templateUrl: './program-edit.component.html',
    styleUrls: ['./program-edit.component.css']
})
export class ProgramEditComponent implements OnInit {
    private sub: any;
    private program: Program;

    public loginForm = this.fb.group({
        name: ["", Validators.required],
        hwTemp: ["", Validators.required]
      });

    constructor(public fb: FormBuilder, private route: ActivatedRoute, @Inject(INJECTABLES.ProgramService) private programService: IProgramService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let id = params['id']; 

            this.programService.getProgram(id).subscribe(
                (p) => {
                    this.program = p;
                }
            );
        });
    }

    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
