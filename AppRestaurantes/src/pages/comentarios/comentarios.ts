import { RestaurantePage } from './../restaurante/restaurante';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';


@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {

  denunciarcomentario={usuarioU: '', restauranteR: '', comentarioC: ''}
  comentario={contenido: ''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider, private menu:MenuController) {

    this.menu.enable(true, 'menu2');

    if(restaurantService.todoscomentarios==true){
      restaurantService.mis_comentarios();
    }
    restaurantService.todoscomentarios=true;
  }

  denunciar_comentario(comentario,usuario){
    this.denunciarcomentario.usuarioU=usuario;
    this.denunciarcomentario.restauranteR=this.restaurantService.session.idRestaurante;
    this.denunciarcomentario.comentarioC=comentario;

    this.restaurantService.denunciar_comentario(this.denunciarcomentario)
    .subscribe(()=>{
      this.restaurantService.cambiar_estado_denunciado(comentario);
      if(this.restaurantService.denunciada==true){
        this.navCtrl.push(RestaurantePage);
        this.restaurantService.denunciada=false;
      }
        
    });;
    
  }

  find_comment(){
    this.restaurantService.find_comment(this.comentario.contenido);
    this.navCtrl.setRoot(ComentariosPage);
    this.restaurantService.todoscomentarios=false;
  }
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
  createRange2(number1){
    var number=5-number1;
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

}
