import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                RouterTestingModule.withRoutes([])
            ]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it("should have a title", async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Heating Controller');
    }));

    // describe("main menu", () => {
    //     let compiled;

    //     beforeEach(() => {

    //         const fixture = TestBed.createComponent(AppComponent);
    //         fixture.detectChanges();
    //         compiled = fixture.debugElement.nativeElement;
    //     });

    //     it('should be present', async(() => {
    //         expect(compiled.querySelector('#mainMenu')).not.toBeUndefined;
    //     }));

    //     it('should contain 3 menu items', async(() => {
    //         expect(compiled.querySelector('#mainMenu').childElementCount).toEqual(3);
    //     }));
    // });
});
