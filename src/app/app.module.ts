import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

const appRoutes: Routes = [
    { path: '', redirectTo: '/info', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'info', component: SummaryInfoComponent },
    { path: 'programs', component: ProgramListComponent },
    { path: '**', redirectTo: '/info' }
];

@NgModule({
    declarations: [
        AppComponent,
        SummaryInfoComponent,
        OnOffPipe,
        ProgramChartComponent,
        ProgramListComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
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
