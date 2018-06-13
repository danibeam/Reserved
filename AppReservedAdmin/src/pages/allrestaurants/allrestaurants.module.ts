import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllrestaurantsPage } from './allrestaurants';

@NgModule({
  declarations: [
    AllrestaurantsPage,
  ],
  imports: [
    IonicPageModule.forChild(AllrestaurantsPage),
  ],
})
export class AllrestaurantsPageModule {}
