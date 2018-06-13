import { AgregarempleadoPage } from './../agregarempleado/agregarempleado';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';


@IonicPage()
@Component({
  selector: 'page-listaempleados',
  templateUrl: 'listaempleados.html',
})
export class ListaempleadosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider, private menu:MenuController) {
    this.menu.enable(true, 'menu2');
  }

  eliminar_empleado(id){
    this.restaurantService.eliminar_empleado(id);
    this.navCtrl.push(ListaempleadosPage);
  }

  agregar_empleado(){
    this.navCtrl.push(AgregarempleadoPage);
  }

}
