import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllusersPage } from './allusers';

@NgModule({
  declarations: [
    AllusersPage,
  ],
  imports: [
    IonicPageModule.forChild(AllusersPage),
  ],
})
export class AllusersPageModule {}
