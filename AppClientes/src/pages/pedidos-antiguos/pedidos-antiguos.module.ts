import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosAntiguosPage } from './pedidos-antiguos';

@NgModule({
  declarations: [
    PedidosAntiguosPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosAntiguosPage),
  ],
})
export class PedidosAntiguosPageModule {}
