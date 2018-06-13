import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { RestaurantPage } from '../restaurant/restaurant';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-denuncias',
  templateUrl: 'denuncias.html',
})
export class DenunciasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantsProvider) {
    restaurantService.mostrar_denuncias();
  }

  borrar_comentario(id){
    this.restaurantService.borrar_comentario(id);
    this.navCtrl.setRoot(HomePage);
  }

  permitir_comentario(id){
    this.restaurantService.permitir_comentario(id);
    this.navCtrl.setRoot(HomePage);
  }


}
