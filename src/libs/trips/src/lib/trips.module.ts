import { NgModule } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tripsReducer } from './+state/trips.reducer';
import { TripsEffects } from './+state/trips.effects';
import { TripService } from './trips.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature('trips', tripsReducer),
    EffectsModule.forFeature([TripsEffects]),
  ],
  declarations: [
    // tripEditComponent,
  ],
  exports: [
    // tripEditComponent,
  ],
  entryComponents: [],
  providers: [TripService],
})
export class TripsModule { }
