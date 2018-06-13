import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartarestaurantePage } from './cartarestaurante';

@NgModule({
  declarations: [
    CartarestaurantePage,
  ],
  imports: [
    IonicPageModule.forChild(CartarestaurantePage),
  ],
})
export class CartarestaurantePageModule {}
