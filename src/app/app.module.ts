import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { SummaryInfoComponent } from './summary-info/summary-info.component';
import { SystemStatusService } from "./services/system-status.service";
import { SystemStatusDummyService } from "./services/system-status-dummy.service";
import { OnOffPipe } from './common/on-off.pipe';
import { ProgramChartComponent } from './program-chart/program-chart.component';
import { INJECTABLES } from "./common/injectables";
import { ControlService } from "./services/control.service";
import { ControlDummyService } from "./services/control-dummy.service";
import { ProgramListComponent } from './program-list/program-list.component';
import { HomeComponent } from './home/home.component';
import { ProgramDummyService } from './services/program-dummy.service';
import { ProgramInfoComponent } from './program-info/program-info.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ProgramEditComponent } from './program-edit/program-edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/info', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'info', component: SummaryInfoComponent },
    { path: 'programs', component: ProgramListComponent },
    { path: 'program-edit/:id', component: ProgramEditComponent },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    declarations: [
        AppComponent,
        SummaryInfoComponent,
        OnOffPipe,
        ProgramChartComponent,
        ProgramListComponent,
        HomeComponent,
        ProgramInfoComponent,
        PageTitleComponent,
        ProgramEditComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    providers: [
        { provide: INJECTABLES.ControlService, useClass: ControlDummyService },
        { provide: INJECTABLES.SystemStatusService, useClass: SystemStatusDummyService },
        { provide: INJECTABLES.ProgramService, useClass: ProgramDummyService },
        { provide: INJECTABLES.SlotsPerDay, useValue: 10 }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
