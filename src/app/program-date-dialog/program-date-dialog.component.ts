import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { IDatedProgram } from '../common/injectables';
import * as moment from "moment";

@Component({
    selector: 'app-program-date-dialog',
    templateUrl: './program-date-dialog.component.html',
    styleUrls: ['./program-date-dialog.component.css']
})
export class ProgramDateDialogComponent implements OnInit {

    private form: FormGroup;
    private minDate: string = moment().format("YYYY-MM-DD");

    constructor(
        private formBuilder: FormBuilder,
        private dialogRef: MatDialogRef<ProgramDateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private data: IDatedProgram
    ) { }

    ngOnInit() {
        // this.form = this.formBuilder.group({ activationDate: this.data.activationDate.toDateString() });

        this.form = new FormGroup({
            activationDate: new FormControl(moment(this.data.activationDate).format("YYYY-MM-DD")),
            programId: new FormControl(this.data.programId),
          });
        
    }

    submit(form: FormGroup) {
        this.data.activationDate = new Date(form.value.activationDate);
        this.dialogRef.close(this.data);
    }
}
