import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DenunciasPage } from './denuncias';

@NgModule({
  declarations: [
    DenunciasPage,
  ],
  imports: [
    IonicPageModule.forChild(DenunciasPage),
  ],
})
export class DenunciasPageModule {}
