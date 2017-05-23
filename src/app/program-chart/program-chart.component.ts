import { Component, OnInit, Input } from '@angular/core';
import { Program } from "../common/program";

@Component({
    selector: 'app-program-chart',
    templateUrl: './program-chart.component.html',
    styleUrls: ['./program-chart.component.css']
})
export class ProgramChartComponent implements OnInit {
    private chartWidth: number = 800;
    private chartHeight: number = 40;
    private slotWidth: number;
    private slotHeight = 40;

    @Input() private program: Program;

    constructor() {
     }

    ngOnInit() {
         this.slotWidth = this.chartWidth / this.program.slotsPerDay;
    }

}
