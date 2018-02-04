import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { SummaryInfoComponent } from './summary-info/summary-info.component';
import { SystemStatusService } from "./services/system-status.service";
import { MockSystemStatusService } from "./services/mock-system-status.service";
import { OnOffPipe } from './common/on-off.pipe';
import { ProgramChartComponent } from './program-chart/program-chart.component';
import { INJECTABLES } from "./common/injectables";
import { MockControlService } from "./services/mock-control.service";
import { ControlService } from "./services/control.service";

const appRoutes: Routes = [
  { path: '',   redirectTo: '/info', pathMatch: 'full' },
  { path: 'info', component: SummaryInfoComponent },
  { path: '**', redirectTo: '/info' }
];

@NgModule({
  declarations: [
    AppComponent,
    SummaryInfoComponent,
    OnOffPipe,
    ProgramChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [
      { provide: INJECTABLES.ControlService, useClass: MockControlService },
      // { provide: INJECTABLES.ControlService, useClass: ControlService },
      { provide: INJECTABLES.SystemStatusService, useClass: MockSystemStatusService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
