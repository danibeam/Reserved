import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedirPage } from './pedir';

@NgModule({
  declarations: [
    PedirPage,
  ],
  imports: [
    IonicPageModule.forChild(PedirPage),
  ],
})
export class PedirPageModule {}
