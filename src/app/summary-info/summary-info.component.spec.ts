import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { SummaryInfoComponent } from './summary-info.component';
import { SystemStatusService } from "../services/system-status.service";
import { OnOffPipe } from "../common/on-off.pipe";

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
                OnOffPipe],
            providers: [
                SystemStatusService
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
