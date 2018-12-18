import { Component, OnInit, Inject } from '@angular/core';
import { INJECTABLES, IProgramService, ProgramMode, IProgramConfig, IProgramConfigService, IDatedProgram } from '../common/injectables';
import { Program } from '../common/program';
import { Router } from '@angular/router';
import * as moment from "moment";
import { ProgramConfig } from '../common/program-config';
import { Observable } from 'rxjs';
import { filter } from "rxjs/operators";
import { List } from 'linqts';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ProgramDateDialogComponent } from '../program-date-dialog/program-date-dialog.component';
import { DatedProgram } from '../common/dated-program';

class ProgramConfigItem {
    constructor(
        public programId: string,
        public name: string,
        public description: string,
        public activationDate?: Date,
        public showButton?: boolean) {
        }
}

@Component({
    selector: 'app-program-list',
    templateUrl: './program-list.component.html',
    styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {
    private programs: List<Program>;
    private programConfig: IProgramConfig;
    private programModes = ProgramMode;
    private configItems: ProgramConfigItem[];

    private dialogRef: MatDialogRef<ProgramDateDialogComponent>; 

    constructor(
        private router: Router,
        private dialogService: MatDialog,
        @Inject(INJECTABLES.ProgramService) private programServcie: IProgramService,
        @Inject(INJECTABLES.ProgramConfigService) private programConfigService: IProgramConfigService) {
    }

    ngOnInit() {
        this.configItems = [];

        const programStream: Observable<Program[]> = this.programServcie.listPrograms();
        const configStream: Observable<IProgramConfig> = this.programConfigService.getProgramConfig();

        Observable.combineLatest(configStream, programStream).subscribe((results: [IProgramConfig, [Program]]) => {
            this.programConfig = results[0];
            this.programs = new List<Program>(results[1]).OrderBy(p => p.name);

            const weekdayProgram: Program = this.programs.Where(p => p.id === this.programConfig.weekdayProgramId).FirstOrDefault();
            const saturdayProgram: Program = this.programs.Where(p => p.id === this.programConfig.saturdayProgramId).FirstOrDefault();
            const sundayProgram: Program = this.programs.Where(p => p.id === this.programConfig.sundayProgramId).FirstOrDefault();
            
            this.configItems.push(new ProgramConfigItem(weekdayProgram.id, weekdayProgram.name, "Weekdays"));
            this.configItems.push(new ProgramConfigItem(saturdayProgram.id, saturdayProgram.name, "Saturdays"));
            this.configItems.push(new ProgramConfigItem(sundayProgram.id, sundayProgram.name, "Sundays"));
            
            this.programConfig.datedPrograms.forEach((dp: IDatedProgram) => {
                this.configItems.push(new ProgramConfigItem(
                    dp.programId,
                    this.programs.Where(p => p.id === dp.programId).First().name, 
                    moment(dp.activationDate).format("ddd DD MMM YYYY"),
                    dp.activationDate,
                    true))
            });
        });
    }

    private btnActivate(id: string, mode: ProgramMode) {
        const newConfig = this.programConfig.clone();
        if (mode === ProgramMode.Saturday) {
            newConfig.saturdayProgramId = id;
        } else if (mode === ProgramMode.Sunday) {
            newConfig.sundayProgramId = id;
        } else {
            newConfig.weekdayProgramId = id;
        }

        this.programConfigService.setProgramConfig(newConfig)
        .subscribe( () => {
            // TO DO this.listPrograms();
        });
    }

    private btnActivateForDay(program: Program) {

        this.dialogRef = this.dialogService.open(ProgramDateDialogComponent, {
            hasBackdrop: true,
            data: new DatedProgram(program.id, new Date(), program.name),
        });

        this.dialogRef
            .afterClosed()
            .subscribe((dp: IDatedProgram) => {
                this.programConfig.datedPrograms.push(dp);
                this.programConfigService.setProgramConfig(this.programConfig)
                .subscribe((x: any) => {
                    this.ngOnInit();
                });
            })
    }

    private onDeleteConfigItem(item: ProgramConfigItem) {

        let idx = this.programConfig.datedPrograms.findIndex((dp: IDatedProgram) => {
            return dp.programId === item.programId && 
                item.activationDate &&
                dp.activationDate.toDateString() === item.activationDate.toDateString()
            });
        
        if (idx >= 0) {
            this.programConfig.datedPrograms.splice(idx, 1);

            this.programConfigService.setProgramConfig(this.programConfig)
            .subscribe((x: any) => {
                this.ngOnInit();
            });
        }
    }

    // private listPrograms() {
    //     this.programServcie.listPrograms().subscribe( (programs: Program[]) => {
    //         this.programs = programs.sort((a, b) => a.name > b.name? 1 : 0);
    //         this.getProgramConfig();
    //     });
    // }

    // private getProgramConfig() {
    //     this.programConfigServcie.getProgramConfig().subscribe( (config: ProgramConfig) => {
    //         this.programConfig = config;
    //     });
    // }

    private btnEdit(id: string) {
        this.router.navigate(["program-edit", id]);
    }

    private btnAdd() {
        this.router.navigate(["program-edit", "0"]);
    }

    private btnDelete(program: Program) {
        this.programServcie.deleteProgram(program.id)
        .subscribe( () => {
            //  TO DO
            //this.programs = [];
            //this.listPrograms();
        });
    }

    // private getProgram(mode: ProgramMode): Program {
    //     if (mode === ProgramMode.Weekday) {
    //         return this.programs.find((p) => p.id === this.programConfig.weekdayProgramId);
    //     }
    //     if (mode === ProgramMode.Saturday) {
    //         return this.programs.find((p) => p.id === this.programConfig.saturdayProgramId);
    //     }
    //     if (mode === ProgramMode.Sunday) {
    //         return this.programs.find((p) => p.id === this.programConfig.sundayProgramId);
    //     }
    // }

}
