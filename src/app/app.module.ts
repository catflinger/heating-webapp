import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { SummaryInfoComponent } from './summary-info/summary-info.component';

const appRoutes: Routes = [
  { path: 'info', component: SummaryInfoComponent },
  { path: '',   redirectTo: '/info', pathMatch: 'full' },
  { path: '**', redirectTo: '/info' } // or PageNotFound component
];

@NgModule({
  declarations: [
    AppComponent,
    SummaryInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
