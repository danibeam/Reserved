import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CocineroPage } from './cocinero';

@NgModule({
  declarations: [
    CocineroPage,
  ],
  imports: [
    IonicPageModule.forChild(CocineroPage),
  ],
})
export class CocineroPageModule {}
