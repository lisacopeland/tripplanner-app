import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, filter } from 'rxjs';
import { Trip, selectCurrentTrip } from '@tripplanner/trips';
import { DEFAULT_BACKGROUND } from '@tripplanner/common';

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
  DEFAULT_BACKGROUND = DEFAULT_BACKGROUND;
  menuOpened = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
  
  }

  onEdit() {
    
  }

  onMenuToggle(menuOpened: boolean) {
    this.menuOpened = menuOpened;
    console.log('menu opened is ', this.menuOpened);
  }

  onAddPerson() {

  }

  onAddItinerary() {

  }

}
