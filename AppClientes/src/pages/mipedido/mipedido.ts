import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PedidoProvider } from './../../providers/pedido/pedido';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { UsersProvider } from './../../providers/users/users';
import { MisReservasPage } from './../mis-reservas/mis-reservas';
import { ProductospedidoPage } from './../productospedido/productospedido';

@IonicPage()
@Component({
  selector: 'page-mipedido',
  templateUrl: 'mipedido.html',
})
export class MipedidoPage {
  pedido ={pedidop: '', productop: '', tipoproducto: '', hora:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public pedidoService: PedidoProvider,public userService: UsersProvider,public restaurantService: RestaurantsProvider) {
  }

  add_pedido(){
    var i =0;
    for( i=0;i<this.pedidoService.plato.length;i++){
      var date = new Date();
      var currentdate=date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
      this.pedido.hora=currentdate;
      this.pedido.productop= this.pedidoService.plato[i].idProducto;
      this.pedido.tipoproducto = this.pedidoService.plato[i].tipo;
      this.pedido.pedidop = this.userService.reservation;
    this.restaurantService.sumar_precio(this.pedido.productop);
      this.userService.add_pedido(this.pedido)
      .subscribe(()=>{
          this.pedidoService.plato.splice(0,i);
          this.pedidoService.suma=0;
          this.restaurantService.productospedido();
          this.navCtrl.setRoot(ProductospedidoPage);  
        });
    }
  }
}
