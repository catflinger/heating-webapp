import { Component, OnInit, Inject } from '@angular/core';
import { INJECTABLES, IProgramService } from '../common/injectables';
import { Program } from '../common/program';

@Component({
    selector: 'app-program-list',
    templateUrl: './program-list.component.html',
    styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {

    private programs: Program[] = null;

    constructor(@Inject(INJECTABLES.ProgramService) private programServcie: IProgramService) {
        programServcie.list().subscribe( (programs: Program[]) => {
            this.programs = programs;
            });
     }

    ngOnInit() {
    }

}
