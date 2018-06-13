import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservasPage } from './reservas';

@NgModule({
  declarations: [
    ReservasPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservasPage),
  ],
})
export class ReservasPageModule {}
