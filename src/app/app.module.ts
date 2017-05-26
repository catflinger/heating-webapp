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

const appRoutes: Routes = [
  { path: 'info', component: SummaryInfoComponent },
  { path: '',   redirectTo: '/info', pathMatch: 'full' },
  { path: '**', redirectTo: '/info' } // or PageNotFound component
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
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
      // { provide: INJECTABLES.SystemStatusService, useClass: MockSystemStatusService}
      { provide: INJECTABLES.SystemStatusService, useClass: SystemStatusService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
