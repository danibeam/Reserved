import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { PedidoProvider } from '../../providers/pedido/pedido';
import { CategoriaspedidoPage } from './../categoriaspedido/categoriaspedido';
import { AllrestaurantsPage } from './../allrestaurants/allrestaurants';
import { UsersProvider } from '../../providers/users/users';

@IonicPage()
@Component({
  selector: 'page-productospedido',
  templateUrl: 'productospedido.html',
})
export class ProductospedidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public restaurantService:RestaurantsProvider,public pedidoService:PedidoProvider,public userService:UsersProvider) {
  }

  anayadirplato(){
    this.restaurantService.restauranteactual=this.userService.reservaconfirmada[0].idRestaurante;
    this.restaurantService.categorias_restaurante();
    this.navCtrl.push(CategoriaspedidoPage);
  }
  pedirCuenta(){
    this.alertCtrl.create({
    title:"Cuenta pedida",
    subTitle:"El camarero le traera la cuenta enseguida, gracias por su visita",
    buttons:["OK"]
  }).present();
  }
  eliminarplato(id,idproducto){
    this.restaurantService.eliminar_plato(id,idproducto);
    this.restaurantService.anyadir_precio_productodepedido(this.userService.reservation, idproducto);
    this.navCtrl.setRoot(ProductospedidoPage);
  }
  doRefresh(refresher) {
    setTimeout(() => {
      this.restaurantService.productospedido();
      refresher.complete();
    }, 1000);
  }
}
