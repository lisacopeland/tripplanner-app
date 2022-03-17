import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripListComponent } from './trip-list/trip-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'triplist', pathMatch: 'full' },
  { path: 'triplist', component: TripListComponent },
  { path: 'tripdetail', component: TripDetailComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
