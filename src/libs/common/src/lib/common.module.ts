import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  imports: [CommonModule, MatToolbarModule, MatCardModule],
  exports: [CommonModule, MatToolbarModule, MatCardModule]
})
export class TripplannerCommonModule {}
