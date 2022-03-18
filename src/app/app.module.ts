import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { API_URL, TripplannerCommonModule } from '@tripplanner/common';
import { TripsModule } from '@tripplanner/trips';
import { EffectsModule } from '@ngrx/effects';
import { TripDetailComponent } from './trip-detail/trip-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TripplannerCommonModule,
    TripsModule,
    StoreModule.forRoot({}, {}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot(),
  ],
  providers: [{ provide: API_URL, useValue: environment.apiUrl }],
  bootstrap: [AppComponent]
})
export class AppModule { }
