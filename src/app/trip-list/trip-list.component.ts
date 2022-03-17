import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Trip, selectAllTrips } from '@tripplanner/trips';
import { Observable, filter } from 'rxjs';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  constructor(private store: Store) { }

  trips$: Observable<Trip[]> = this.store.pipe(
    select(selectAllTrips),
    filter((trips) => !!trips && trips.length > 0)
  );
  
  ngOnInit(): void {
    console.log('hi from lisa');
  }

}
