import { NgModule } from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@tripplanner/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { tripsReducer } from './+state/trips.reducers';
import { TripsEffects } from './+state/trips.effects';
import { tripDetailsReducer } from './+state/tripdetails.reducers';
import { TripDetailsEffects } from './+state/tripdetails.effects';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ClipboardModule,
        MaterialModule,
        StoreModule.forFeature('trips', tripsReducer),
        StoreModule.forFeature('tripdetails', tripDetailsReducer),
        EffectsModule.forFeature([TripsEffects]),
        EffectsModule.forFeature([TripDetailsEffects]),
    ],
    declarations: [
        TripEditComponent,
    ],
    exports: [
        TripEditComponent,
    ],
    providers: []
})
export class TripsModule { }
