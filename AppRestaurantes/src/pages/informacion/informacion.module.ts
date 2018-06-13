import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InformacionPage } from './informacion';

@NgModule({
  declarations: [
    InformacionPage,
  ],
  imports: [
    IonicPageModule.forChild(InformacionPage),
  ],
})
export class InformacionPageModule {}
