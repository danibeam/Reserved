import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComentariosPage } from './comentarios';

@NgModule({
  declarations: [
    ComentariosPage,
  ],
  imports: [
    IonicPageModule.forChild(ComentariosPage),
  ],
})
export class ComentariosPageModule {}
