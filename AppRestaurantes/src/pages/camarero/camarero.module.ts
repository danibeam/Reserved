import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamareroPage } from './camarero';

@NgModule({
  declarations: [
    CamareroPage,
  ],
  imports: [
    IonicPageModule.forChild(CamareroPage),
  ],
})
export class CamareroPageModule {}
