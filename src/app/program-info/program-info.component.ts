import { Component, OnInit, Input } from '@angular/core';
import { Program } from '../common/program';

@Component({
    selector: 'app-program-info',
    templateUrl: './program-info.component.html',
    styleUrls: ['./program-info.component.css']
})
export class ProgramInfoComponent implements OnInit {
    @Input() program: Program;

    constructor() { }

    ngOnInit() {
    }

}
