import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PreviewImagePage } from './preview-image';

@NgModule({
  declarations: [
    PreviewImagePage,
  ],
  imports: [
    IonicPageModule.forChild(PreviewImagePage),
  ],
})
export class PreviewImagePageModule {}
