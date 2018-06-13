import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';

@IonicPage()
@Component({
  selector: 'page-pedidos-antiguos',
  templateUrl: 'pedidos-antiguos.html',
})
export class PedidosAntiguosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public restaurantService: RestaurantsProvider) {
   
  }


}
