import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable, filter, combineLatest, map } from 'rxjs';
import { setCurrentTripAction, updateTripAction } from '@tripstore/trips.actions';
import { selectTripsAndPeopleLoaded, selectTripsWithParticipants, TripWithParticipants } from '@tripstore/trips.reducer';
import { DEFAULT_BACKGROUND } from '../common/constants';
import { Trip, TRIP_STATUS_ARCHIVED, TRIP_STATUS_NEW } from '../models/trips.model';
import { TripEditComponent } from '../trip-edit/trip-edit.component';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  constructor(private router: Router, private store: Store, public dialog: MatDialog) { }

  ready$ = this.store.select(selectTripsAndPeopleLoaded);
  tripsWithParticipants$: Observable<TripWithParticipants[]> = this.store.pipe(
    select(selectTripsWithParticipants),
    filter((trips) => !!trips && trips.length > 0)
  );

  vm$ = combineLatest([this.ready$, this.tripsWithParticipants$]).pipe(
    map(([ready, trips]) => ({ ready, trips }))
  );

  newTripTitle = 'New trip';
  aid = 'lisa';
  selectedTrip: Trip = null;
  showArchived = false;
  archiveToggleLabel = 'Show archived';
  TRIP_STATUS_NEW = TRIP_STATUS_NEW;
  TRIP_STATUS_ARCHIVED = TRIP_STATUS_ARCHIVED;
  DEFAULT_BACKGROUND = DEFAULT_BACKGROUND;

  ngOnInit(): void {

  }

  onGotoDetail(trip: Trip) {
    this.store.dispatch(setCurrentTripAction({ id: trip.id }));
    this.router.navigate(['/tripdetail']);
  }

  createTrip() {
    this.selectedTrip = new Trip({
        admin_title: this.newTripTitle,
        admin_status: TRIP_STATUS_NEW,
        account_id: this.aid
      })
    this.onEdit();
  }

  onEdit() {
    const dialogRef = this.dialog.open(TripEditComponent, {
      width: '400px',
      data: this.selectedTrip
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.newTripTitle = '';
    });
  }

  onArchive() {
    this.selectedTrip.admin_status = 'archived';
    this.store.dispatch(updateTripAction({ id: this.selectedTrip.id, changes: this.selectedTrip }));
  }

  archiveToggle() {
    this.showArchived = !this.showArchived;
    this.archiveToggleLabel = (this.showArchived) ? 'Hide archived' : 'Show archived';
  }

}
