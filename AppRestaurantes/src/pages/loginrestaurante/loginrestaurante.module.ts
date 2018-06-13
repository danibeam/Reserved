import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginrestaurantePage } from './loginrestaurante';

@NgModule({
  declarations: [
    LoginrestaurantePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginrestaurantePage),
  ],
})
export class LoginrestaurantePageModule {}
