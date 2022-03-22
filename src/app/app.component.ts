import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { loadTripDetailsAction } from './+state/TripDetails.actions';
import { loadTripsAction } from './+state/trips.actions';
import { selectCurrentTrip } from './+state/trips.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subs = [];

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    // Always redirect back to list on refresh
    this.subs.push(
      this.store.pipe(select(selectCurrentTrip),
      filter((bool) => !!bool)
      )
      .subscribe((trip) => {
        this.store.dispatch(
          loadTripDetailsAction({ search: { tripId: trip.id }})
        )
      })
    );
    this.router.navigate(['']);
    this.store.dispatch(loadTripsAction({ search: {account_id: 'lisa'} }));
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
