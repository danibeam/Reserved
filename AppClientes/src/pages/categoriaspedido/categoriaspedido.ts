import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { CartaPage} from './../carta/carta';
import { PedirPage} from './../pedir/pedir';

@IonicPage()
@Component({
  selector: 'page-categoriaspedido',
  templateUrl: 'categoriaspedido.html',
})
export class CategoriaspedidoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantsProvider) {
  }

  mis_productos(id){
    this.restaurantService.productos_porcategoria(id);
    this.navCtrl.push(PedirPage);
  }
}
