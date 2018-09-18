import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { OnOffPipe } from './common/on-off.pipe';
import { INJECTABLES, IAppConfig } from "./common/injectables";

import { SummaryInfoComponent } from './summary-info/summary-info.component';
import { ProgramChartComponent } from './program-chart/program-chart.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { HomeComponent } from './home/home.component';
import { ProgramInfoComponent } from './program-info/program-info.component';
import { PageTitleComponent } from './page-title/page-title.component';
import { ProgramEditComponent } from './program-edit/program-edit.component';

import { SystemStatusService } from "./services/system-status.service";
import { ControlService } from "./services/control.service";
import { ProgramService } from './services/program.service';

//import { SystemStatusDummyService } from "./services/system-status-dummy.service";
import { SensorService } from './services/sensor.service';
import { ProgramConfigService } from './services/program-config.service';
// import { ControlDummyService } from "./services/control-dummy.service";
// import { ProgramDummyService } from './services/program-dummy.service';

const appConfig: IAppConfig = {
    get apiBase(): string { return "http://cherrypi:3000"; }
}

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
        // { provide: INJECTABLES.ControlService, useClass: ControlDummyService },
        // { provide: INJECTABLES.SystemStatusService, useClass: SystemStatusDummyService },
        // { provide: INJECTABLES.ProgramService, useClass: ProgramDummyService },
        { provide: INJECTABLES.ControlService, useClass: ControlService },
        { provide: INJECTABLES.SystemStatusService, useClass: SystemStatusService },
        { provide: INJECTABLES.ProgramService, useClass: ProgramService },
        { provide: INJECTABLES.ProgramConfigService, useClass: ProgramConfigService },
        { provide: INJECTABLES.SensorService, useClass: SensorService },
        { provide: INJECTABLES.SlotsPerDay, useValue: 10 },
        { provide: INJECTABLES.AppConfig, useValue: appConfig },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
