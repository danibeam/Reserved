import { LoginrestaurantePage } from './../loginrestaurante/loginrestaurante';
import { LoginempleadosPage } from './../loginempleados/loginempleados';
import { RegistroPage } from './../registro/registro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { RestaurantePage } from '../restaurante/restaurante';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  restaurant= { email: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantService:RestaurantProvider) {
  }

  login_empleados(){
    this.navCtrl.push(LoginempleadosPage);
  }

  login_restaurante(){
    this.navCtrl.push(LoginrestaurantePage);
  }


}
