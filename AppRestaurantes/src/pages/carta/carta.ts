import { EmpleadoPage } from './../empleado/empleado';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { PedidoProvider } from './../../providers/pedido/pedido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoPage } from './../carrito/carrito';
@IonicPage()
@Component({
  selector: 'page-carta',
  templateUrl: 'carta.html',
})
export class CartaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private restaurantService:RestaurantProvider,public pedidoService: PedidoProvider) {
  }

  verpedido(){
    this.navCtrl.push(CarritoPage);
  }
  mis_productos(id){
    this.restaurantService.productos_porcategoria(id);
    this.navCtrl.push(CartaPage);
  }

  volver_pedidos(){
    this.navCtrl.setRoot(EmpleadoPage);
  }

}
