import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaempleadosPage } from './listaempleados';

@NgModule({
  declarations: [
    ListaempleadosPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaempleadosPage),
  ],
})
export class ListaempleadosPageModule {}
