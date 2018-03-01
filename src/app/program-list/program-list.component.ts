import { Component, OnInit, Inject } from '@angular/core';
import { INJECTABLES, IProgramService, ProgramMode, IProgramConfig, IProgramConfigService } from '../common/injectables';
import { Program } from '../common/program';
import { Router } from '@angular/router';
import { ProgramConfig } from '../common/program-config';

@Component({
    selector: 'app-program-list',
    templateUrl: './program-list.component.html',
    styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {
    private programs: Program[] = [];
    private programConfig: IProgramConfig;
    private programModes = ProgramMode;

    constructor(       
        private router: Router,  
        @Inject(INJECTABLES.ProgramService) private programServcie: IProgramService,
        @Inject(INJECTABLES.ProgramConfigService) private programConfigServcie: IProgramConfigService) {

        this.listPrograms();
    }

    ngOnInit() {
    }

    private btnActivate(program: Program, mode: ProgramMode) {
        this.programConfigServcie.setProgramConfig(new ProgramConfig())
        .subscribe( () => {
            this.programs = undefined;
            this.listPrograms();
        });
    }

    private listPrograms() {
        this.programServcie.listPrograms().subscribe( (programs: Program[]) => {
            this.programs = programs;
            this.getProgramConfig();
        });
    }

    private getProgramConfig() {
        this.programConfigServcie.getProgramConfig().subscribe( (config: ProgramConfig) => {
            this.programConfig = config;
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
    private getProgram(mode: ProgramMode): Program {
        if (mode === ProgramMode.Weekday) {
            return this.programs.find((p) => p.id === this.programConfig.weekdayProgramId);
        }
        if (mode === ProgramMode.Saturday) {
            return this.programs.find((p) => p.id === this.programConfig.saturdayProgramId);
        }
        if (mode === ProgramMode.Sunday) {
            return this.programs.find((p) => p.id === this.programConfig.sundayProgramId);
        }
    }

}
