import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadTripsAction } from './+state/trips.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tripplanner-app';
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadTripsAction({ search: {account_id: 'lisa'} }));
  }
}


