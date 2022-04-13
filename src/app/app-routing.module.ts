import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@tripplanner/auth';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { TripDetailComponent } from './trip-detail/trip-detail.component';
import { TripListComponent } from './trip-list/trip-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'triplist', pathMatch: 'full' },
  { path: 'triplist', component: TripListComponent, canActivate : [AuthGuard] },
  { path: 'tripdetail', component: TripDetailComponent, canActivate: [AuthGuard] },
  { path: 'signin', component: SigninPageComponent },
  { path: 'signup', component: SignupPageComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
