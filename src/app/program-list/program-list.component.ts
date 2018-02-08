import { Component, OnInit, Inject } from '@angular/core';
import { INJECTABLES, IProgramService } from '../common/injectables';
import { Program } from '../common/program';
import { Router } from '@angular/router';

@Component({
    selector: 'app-program-list',
    templateUrl: './program-list.component.html',
    styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {

    private programs: Program[] = null;

    constructor(private router: Router,  @Inject(INJECTABLES.ProgramService) private programServcie: IProgramService) {
        programServcie.list().subscribe( (programs: Program[]) => {
            this.programs = programs;
            });
     }

    ngOnInit() {
    }

    private btnActivate(program: Program) {

    }

    private btnEdit(program: Program) {
        this.router.navigateByUrl(`/program-edit/${program.id}`);
    }

    private btnDelete(program: Program) {
        
    }

}
