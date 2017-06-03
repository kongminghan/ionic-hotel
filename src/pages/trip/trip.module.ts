import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripPage } from './trip';

@NgModule({
  declarations: [
    TripPage,
  ],
  imports: [
    IonicPageModule.forChild(TripPage),
  ],
  exports: [
    TripPage
  ]
})
export class TripPageModule {}
