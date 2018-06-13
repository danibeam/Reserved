import { EmpleadoPage } from './../empleado/empleado';
import { AgregarproductopedidoPage } from './../agregarproductopedido/agregarproductopedido';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';

@IonicPage()
@Component({
  selector: 'page-productosdepedido',
  templateUrl: 'productosdepedido.html',
})
export class ProductosdepedidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider) {
    restaurantService.mi_carta();
  }

  agregar_productopedido(){
    this.restaurantService.categorias_restaurante();
    this.navCtrl.push(AgregarproductopedidoPage);
  }

  eliminar_productodepedido(id,idproducto){
    this.restaurantService.eliminar_productodepedido(id,idproducto);
    this.navCtrl.setRoot(ProductosdepedidoPage);
  }

  volver_pedidos(){
    this.navCtrl.setRoot(EmpleadoPage);
  }

  borrar_pin(){
    this.restaurantService.borrar_pin();
    this.navCtrl.setRoot(ProductosdepedidoPage);
  }

}
