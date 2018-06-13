import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmpleadoPage } from './empleado';

@NgModule({
  declarations: [
    EmpleadoPage,
  ],
  imports: [
    IonicPageModule.forChild(EmpleadoPage),
  ],
})
export class EmpleadoPageModule {}
