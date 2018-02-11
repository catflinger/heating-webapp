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
        this.listPrograms();
    }

    ngOnInit() {
    }

    private btnActivate(program: Program) {

    }

    private listPrograms() {
        this.programServcie.list().subscribe( (programs: Program[]) => {
            this.programs = programs;
        });
        
    }

    private btnEdit(program: Program) {
        this.router.navigateByUrl(`/program-edit/${program.id}`);
    }

    private btnAdd() {
        this.router.navigateByUrl("/program-edit/0");
    }

    private btnDelete(program: Program) {
        this.programServcie.deleteProgram(program.id)
        .subscribe( () => {
            this.programs = undefined;
            this.listPrograms();
        });
    }

}
