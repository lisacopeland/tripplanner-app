import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable, filter } from 'rxjs';
import { setCurrentTripAction, updateTripAction } from '../+state/trips.actions';
import { selectAllTrips } from '../+state/trips.reducer';
import { Trip, TRIP_STATUS_NEW } from '../models/trips.model';
import { TripEditComponent } from '../trip-edit/trip-edit.component';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  constructor(private router: Router, private store: Store, public dialog: MatDialog) { }

  trips$: Observable<Trip[]> = this.store.pipe(
    select(selectAllTrips),
    filter((trips) => !!trips && trips.length > 0)
  );
  newTripTitle = '';
  selectedTrip: Trip = null;

  ngOnInit(): void {
    console.log('hi from lisa');
  }

  menuOpened(trip: Trip) {
    this.selectedTrip = trip;
  }

  onGotoDetail() {
    this.store.dispatch(setCurrentTripAction({ id: this.selectedTrip.id }));
    this.router.navigate(['/tripdetail']);
  }

  createTrip() {
    this.selectedTrip = new Trip({
      admin_title: this.newTripTitle,
      admin_status: TRIP_STATUS_NEW,
      account_id: 'lisa'
    });
    this.onEdit();
  }

  onEdit() {
    const dialogRef = this.dialog.open(TripEditComponent, {
      width: '400px',
      data: this.selectedTrip,
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

}
