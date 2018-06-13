import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { CategoriaspedidoPage } from '../categoriaspedido/categoriaspedido';
import { ProductospedidoPage } from '../productospedido/productospedido';

@IonicPage()
@Component({
  selector: 'page-iniciarpedido',
  templateUrl: 'iniciarpedido.html',
})
export class IniciarpedidoPage {
  usuario={usuarioR:''}
  pin={pin:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider,public restaurantService:RestaurantsProvider) {
    userService.reservasconfirmadas();
  }

  comprobar_pin(){
      this.userService.add_pin(this.pin).subscribe(()=>{
        if(this.userService.nuevopin==true){
          this.iniciarpedidopin();
        }
    });
  }
  iniciarpedido(){
        this.userService.pedido_actual(this.userService.reservaconfirmada[0].idReserva);
          this.restaurantService.restauranteactual=this.userService.reservaconfirmada[0].idRestaurante;
          this.navCtrl.push(CategoriaspedidoPage);
          this.restaurantService.categorias_restaurante();
  }

  iniciarpedidopin(){
    this.restaurantService.restauranteactual=this.userService.pininfo[0].restauranteR;
          this.usuario.usuarioR=this.userService.session.idUsuario;
          this.userService.reservapinactual=this.userService.pininfo[0].idReserva;
          this.userService.modificarpin(this.userService.reservapinactual,this.usuario).subscribe(()=>{
              this.navCtrl.push(IniciarpedidoPage);
  });
       
}
  verpedido(id){
    this.userService.pedido_actual(id);
    if(this.userService.idpedido==true){
      this.restaurantService.productospedido();
      this.navCtrl.push(ProductospedidoPage);
    }
  }
}
