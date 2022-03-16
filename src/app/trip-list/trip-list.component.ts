import { Component, OnInit } from '@angular/core';
import { TripService } from '@tripplanner/trips';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.tripService.query({ account_id: 'lisa'}).subscribe((data) => {
      console.log('got data', data);
    });
  }

}
