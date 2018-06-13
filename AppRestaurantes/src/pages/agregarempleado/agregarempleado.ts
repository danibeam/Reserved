import { ListaempleadosPage } from './../listaempleados/listaempleados';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';


@IonicPage()
@Component({
  selector: 'page-agregarempleado',
  templateUrl: 'agregarempleado.html',
})
export class AgregarempleadoPage {

  empleado={nick: '', password: '', tipoempleado: '',empleador:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider) {
  }

  add_empleado(){
    this.empleado.empleador=this.restaurantService.session.idRestaurante;
    this.restaurantService.add_empleado(this.empleado)
      .subscribe(()=>{
        if(this.restaurantService.agregar_correcto==true){
          this.navCtrl.setRoot(ListaempleadosPage);
        }
    });
  }
}
