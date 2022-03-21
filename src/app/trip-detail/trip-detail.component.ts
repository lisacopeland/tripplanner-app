import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { selectCurrentTrip } from '../+state/trips.reducer';

import { Trip } from '../models/trips.model';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.component.html',
  styleUrls: ['./trip-detail.component.scss']
})
export class TripDetailComponent implements OnInit {
  trip$: Observable<Trip> = this.store.pipe(
    select(selectCurrentTrip),
    filter((trip) => !!trip)
  );
  constructor(private store: Store) { }

  ngOnInit(): void {
  
  }

}
