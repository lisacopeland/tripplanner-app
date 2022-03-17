import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Trip, selectAllTrips, setCurrentTripAction } from '@tripplanner/trips';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  constructor(private router: Router, private store: Store) { }

  trips$: Observable<Trip[]> = this.store.pipe(
    select(selectAllTrips),
    filter((trips) => !!trips && trips.length > 0)
  );
  
  ngOnInit(): void {
    console.log('hi from lisa');
  }

  onGotoDetail(trip: Trip) {
    this.store.dispatch(setCurrentTripAction({ id: trip.id }));
    this.router.navigate(['/tripdetail']);
  }

}
