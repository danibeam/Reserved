import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurantePage } from './restaurante';

@NgModule({
  declarations: [
    RestaurantePage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurantePage),
  ],
})
export class RestaurantePageModule {}
