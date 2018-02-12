import { Component, OnInit, Input } from '@angular/core';
import { Program } from "../common/program";
import { v4 as guid } from "uuid";
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { slotsPerDay } from '../common/injectables';

@Component({
    selector: 'app-program-chart',
    templateUrl: './program-chart.component.html',
    styleUrls: ['./program-chart.component.css']
})
export class ProgramChartComponent implements OnInit, AfterViewInit {
    private slotAngle: number = (2 * Math.PI) / slotsPerDay;
    private hours: any[] = [];
    private canvas: PieCanvas;

    @Input() public program: Program;

    constructor() {
        this.canvas = new PieCanvas();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        const el: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(this.canvas.id);
        const ctx: CanvasRenderingContext2D = el.getContext("2d");

        ctx.fillStyle = "#AAAAAA";
        ctx.beginPath();
        ctx.arc(this.canvas.cx, this.canvas.cy, this.canvas.cx, 0, 2 * Math.PI, false);
        ctx.fill();

        this.program.slots.forEach( (val, idx) => {
            if (val) {
                this.drawSlot(ctx, idx);
            }
        });
    }

    private drawSlot(ctx: CanvasRenderingContext2D, slotNumber: number): void {

        ctx.fillStyle = "#AA0000";
        ctx.beginPath();
        ctx.moveTo(this.canvas.cx, this.canvas.cy);
        ctx.arc(
            this.canvas.cx, 
            this.canvas.cy, 
            this.canvas.radius, 
            slotNumber * this.slotAngle, 
            (slotNumber + 1) * this.slotAngle, 
            false);
        ctx.fill();
    }

}

class PieCanvas {
    public id: string;
    public radius: number = 100;
    public get height(): number { return this.radius * 2 };
    public get width(): number { return this.radius * 2 };
    public get cx(): number { return this.width / 2 };
    public get cy(): number { return this.height / 2 };

    constructor() {
        this.id = guid();
    }
}
