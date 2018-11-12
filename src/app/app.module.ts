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
import { SettingsComponent } from './settings/settings.component';

import { SensorService } from './services/sensor.service';
import { ControlService } from "./services/control.service";
import { ProgramService } from './services/program.service';
import { ProgramConfigService } from './services/program-config.service';
import { SystemStatusService } from "./services/system-status.service";

// import { ControlDummyService } from "./services/dummy/control-dummy.service";
// import { ProgramConfigDummyService } from './services/dummy/program-config-dummy.service';
// import { ProgramDummyService } from './services/dummy/program-dummy.service';
// import { SensorDummyService } from './services/dummy/sensor-dummy.service';
// import { SystemStatusDummyService } from "./services/dummy/system-status-dummy.service";

import { OneWireService } from './services/onewire.service';
import { SensorEditComponent } from './sensor-edit/sensor-edit.component';
import { SensorConfigService } from './services/sensor-config.service';
import { environment } from '../environments/environment.prod';

const appConfig: IAppConfig = {
    
    get apiBase(): string {
        return environment.apiEndpoint;
        // return "http://cherrypi:3000/api/"
        //return = "http://localhost:3000/api/"
    }
}

const appRoutes: Routes = [
    { path: '', redirectTo: '/info', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'info', component: SummaryInfoComponent },
    { path: 'settings', component: SettingsComponent },
    { path: 'programs', component: ProgramListComponent },
    { path: 'program-edit/:id', component: ProgramEditComponent },
    { path: 'sensor-edit/:id', component: SensorEditComponent },
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
        ProgramEditComponent,
        SettingsComponent,
        SensorEditComponent,
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { useHash: true })
    ],
    providers: [
        //  { provide: INJECTABLES.ControlService, useClass: ControlDummyService },
        //  { provide: INJECTABLES.SystemStatusService, useClass: SystemStatusDummyService },
        //  { provide: INJECTABLES.ProgramService, useClass: ProgramDummyService },
        //  { provide: INJECTABLES.SensorService, useClass: SensorDummyService },
        //  { provide: INJECTABLES.ProgramConfigService, useClass: ProgramConfigDummyService },

        { provide: INJECTABLES.ControlService, useClass: ControlService },
        { provide: INJECTABLES.SensorService, useClass: SensorService },
        { provide: INJECTABLES.SensorConfigService, useClass: SensorConfigService },
        { provide: INJECTABLES.OneWireService, useClass: OneWireService },
        { provide: INJECTABLES.SystemStatusService, useClass: SystemStatusService },
        { provide: INJECTABLES.ProgramService, useClass: ProgramService },
        { provide: INJECTABLES.ProgramConfigService, useClass: ProgramConfigService },

        { provide: INJECTABLES.SlotsPerDay, useValue: 10 },
        { provide: INJECTABLES.AppConfig, useValue: appConfig },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

