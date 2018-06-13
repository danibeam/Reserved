import { ProductosdepedidoPage } from './../productosdepedido/productosdepedido';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { CrearpedidoPage } from './../crearpedido/crearpedido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-empleado',
  templateUrl: 'empleado.html',
})
export class EmpleadoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider) {
    restaurantService.pedidos_en_curso();
  }

  crear_pedido(){
    this.restaurantService.reservas_today();
    this.navCtrl.push(CrearpedidoPage);
  }

  cerrar_pedido(id){
    this.restaurantService.delete_pin(id);
    this.restaurantService.cerrar_pedido(id);
    this.navCtrl.setRoot(EmpleadoPage);
  }

  info_pedido(id){
    this.restaurantService.ver_pin(id);
    this.restaurantService.info_pedido(id);
    this.navCtrl.push(ProductosdepedidoPage);
  }

}
