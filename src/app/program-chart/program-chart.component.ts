import { Component, OnInit, Input } from '@angular/core';
import { Program } from "../common/program";

@Component({
    selector: 'app-program-chart',
    templateUrl: './program-chart.component.html',
    styleUrls: ['./program-chart.component.css']
})
export class ProgramChartComponent implements OnInit {
    private chartWidth: number = 800;
    private chartHeight: number = 80;
    private slotWidth: number;
    private slotHeight = 40;
    private hourWidth: number;

    private hours: any[] = [];

    @Input() private program: Program;

    constructor() {
     }

    ngOnInit() {
         this.slotWidth = this.chartWidth / this.program.slotsPerDay;
         this.hourWidth = this.chartWidth / 24;

         for (let i = 0; i < 24; i++) {
            this.hours.push(i.toString());
         }
    }

}
