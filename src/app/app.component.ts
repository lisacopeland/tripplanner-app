import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { loadTripsAction, loadTripDetailsAction, selectCurrentTrip } from '@tripplanner/trips';
import { loadPeopleAction } from '@tripplanner/people';
import { selectUserLoggedIn } from '@tripplanner/auth';

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
        if (trip) {
          this.store.dispatch(
            loadTripDetailsAction({ search: { account_id: trip.account_id, tripId: trip.id }})
          )
        }
      })
    );

    this.store.select(selectUserLoggedIn).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['/signin']);
      }
    })    
    this.store.dispatch(loadTripsAction({ search: {account_id: 'lisa'} }));
    this.store.dispatch(loadPeopleAction({ search: { account_id: 'lisa' } }));
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
