import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { RestauranteliminadoPage } from './../restauranteliminado/restauranteliminado';



@IonicPage()
@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantsProvider) {

  }


  borrar_restaurante(id)
  {
    this.restaurantService.borrar_restaurante(id);
    this.navCtrl.push(RestauranteliminadoPage);
  }

 
}
