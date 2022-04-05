import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripListComponent } from './trip-list/trip-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { API_URL } from './common/constants';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { tripsReducer } from '@tripstore/trips.reducer';
import { TripsEffects } from '@tripstore/trips.effects';
import { HttpClientModule } from '@angular/common/http';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { DateTillPipe } from './common/date-till.pipe';
import { TripDetailsEffects } from '@tripstore/tripdetails.effects';
import { tripDetailsReducer } from '@tripstore/tripdetails.reducer';
import { appReducers } from '@tripstore/app.reducer';
import { peopleReducer } from '@tripstore/people.reducer';
import { PeopleEffects } from '@tripstore/people.effects';
import { AvatarComponent } from './avatar/avatar.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { authReducer } from '@tripstore/auth.reducer';
import { AuthEffects } from '@tripstore/auth.effects';

@NgModule({
  declarations: [
    AppComponent,
    TripListComponent,
    TripDetailComponent,
    TripEditComponent,
    HeaderComponent,
    DateTillPipe,
    AvatarComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatToolbarModule,
    StoreModule.forRoot(appReducers, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),    
    StoreModule.forRoot({ auth: authReducer, trips: tripsReducer, tripdetails: tripDetailsReducer, people: peopleReducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects, TripsEffects, TripDetailsEffects, PeopleEffects]),
  ],
  providers: [{ provide: API_URL, useValue: environment.apiUrl }],
  bootstrap: [AppComponent]
})
export class AppModule { }
