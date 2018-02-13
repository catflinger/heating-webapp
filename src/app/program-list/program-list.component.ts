import { Component, OnInit, Inject } from '@angular/core';
import { INJECTABLES, IProgramService, ProgramMode } from '../common/injectables';
import { Program } from '../common/program';
import { Router } from '@angular/router';
import { ProgramManager } from '../common/program-manager';

@Component({
    selector: 'app-program-list',
    templateUrl: './program-list.component.html',
    styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {

    private programManager: ProgramManager = null;
    private programModes = ProgramMode;

    constructor(private router: Router,  @Inject(INJECTABLES.ProgramService) private programServcie: IProgramService) {
        this.listPrograms();
    }

    ngOnInit() {
    }

    private btnActivate(program: Program, mode: ProgramMode) {
        this.programServcie.activateProgram(program.id, mode)
        .subscribe( () => {
            this.programManager = undefined;
            this.listPrograms();
        });
    }

    private listPrograms() {
        this.programServcie.getProgramManager().subscribe( (programManager: ProgramManager) => {
            this.programManager = programManager;
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
            this.programManager = undefined;
            this.listPrograms();
        });
    }

}
