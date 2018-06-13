import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-mostrarreservas',
  templateUrl: 'mostrarreservas.html',
})
export class MostrarreservasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public restaurantService:RestaurantProvider) {
  }


}
