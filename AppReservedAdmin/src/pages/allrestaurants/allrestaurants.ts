import { RestaurantPage } from './../restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';


@IonicPage()
@Component({
  selector: 'page-allrestaurants',
  templateUrl: 'allrestaurants.html',
})
export class AllrestaurantsPage {

  restaurante={nombre: ''}

  constructor(public navCtrl: NavController, public navParams: NavParams,private restaurantService:RestaurantsProvider) {
    //Si dejo esta linea aqui, cada vez que entremos a esta paguina, hara un get de restaurantes. Si la ponemos en restaurants.ts, solo lo hará una vez  (poner arriba el restaurants provider)
    if(restaurantService.mostrartodos==true){
      restaurantService.mostrar_todos();
    }
    restaurantService.mostrartodos=true;

    
  }


  ver_restaurante(id){
    this.restaurantService.restaurante_id(id);
    this.restaurantService.comentarios_restaurante(id);
    this.navCtrl.push(RestaurantPage);
  }

  find_restaurante(){
    this.restaurantService.find_restaurant(this.restaurante.nombre);
    this.navCtrl.setRoot(AllrestaurantsPage);
    this.restaurantService.mostrartodos=false;
  }


}
