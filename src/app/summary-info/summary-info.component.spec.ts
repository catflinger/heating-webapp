import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { SummaryInfoComponent } from './summary-info.component';
import { SystemStatusService } from "../services/system-status.service";
import { OnOffPipe } from "../common/on-off.pipe";
import { ProgramChartComponent } from "../program-chart/program-chart.component";
import { INJECTABLES } from "../common/injectables";
import { MockSystemStatusService } from "../services/mock-system-status.service";

describe('SummaryInfoComponent', () => {
    let component: SummaryInfoComponent;
    let fixture: ComponentFixture<SummaryInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            declarations: [
                SummaryInfoComponent,
                OnOffPipe,
                ProgramChartComponent
                ],
            providers: [
                { provide: INJECTABLES.SystemStatusService, useClass: MockSystemStatusService }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SummaryInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
