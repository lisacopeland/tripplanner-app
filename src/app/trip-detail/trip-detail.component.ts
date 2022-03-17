import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { Trip, selectCurrentTrip } from '@tripplanner/trips';

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
