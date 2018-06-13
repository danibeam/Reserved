import { CamareroPage } from './../camarero/camarero';
import { CocineroPage } from './../cocinero/cocinero';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantePage } from '../restaurante/restaurante';


@IonicPage()
@Component({
  selector: 'page-loginempleados',
  templateUrl: 'loginempleados.html',
})
export class LoginempleadosPage {

  empleado= { nick: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider) {
  }

  login_empleado(){
    this.restaurantService.login_empleado(this.empleado)
      .subscribe(()=>{
        if(this.restaurantService.login_correcto==true){
          if(this.restaurantService.session.tipoEmpleado=="Camarero"){
            this.restaurantService.see_productosaentregar();
            this.navCtrl.setRoot(CamareroPage);
          }else{
            this.restaurantService.see_productoscocinar();
            this.navCtrl.setRoot(CocineroPage);
          }
          
        }
    });
  }

}
