import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { UsersProvider } from './../../providers/users/users';
import { RestaurantPage } from './../restaurant/restaurant';

@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {

comentario={ contenido:'',valoracion:0, usuarioc:'', restaurantec:''}
  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider, public restaurantService:RestaurantsProvider) {
  }

  add_comentario(){
    this.comentario.restaurantec=this.restaurantService.restauranteactual;
    this.comentario.usuarioc=this.userService.session.idUsuario;
    this.restaurantService.add_comentario(this.comentario)
      .subscribe(()=>{
        if(this.restaurantService.nuevacomentario==true){
          this.navCtrl.setRoot(RestaurantPage);
        }
    });
  }
}
