import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartaPage } from './carta';

@NgModule({
  declarations: [
    CartaPage,
  ],
  imports: [
    IonicPageModule.forChild(CartaPage),
  ],
})
export class CartaPageModule {}
