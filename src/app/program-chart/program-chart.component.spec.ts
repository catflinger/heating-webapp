import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProgramChartComponent } from './program-chart.component';
import { Program } from "../common/program";

describe('ProgramChartComponent', () => {
    let component: ProgramChartComponent;
    let fixture: ComponentFixture<TestComponentWrapper>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponentWrapper,
                ProgramChartComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();

        fixture = TestBed.createComponent(TestComponentWrapper);
        component = fixture.debugElement.children[0].componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

@Component({
    selector: 'test-component-wrapper',
    template: '<app-program-chart [program]="program"></app-program-chart>'
})
class TestComponentWrapper {
    program = new Program({
        slotsPerDay: 10,
        hwmin: 40,
        hwmax: 50,
        slots: [
            true,
            true,
            true,
            false,
            false,
            false,
            false,
            true,
            true,
            true
        ]
    })
}
