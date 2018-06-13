import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoProvider } from './../../providers/pedido/pedido';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { CamareroPage } from './../camarero/camarero';

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
  producto={productop:'',tipoproducto:'',hora:''}
  constructor(public navCtrl: NavController, public navParams: NavParams,public pedidoService: PedidoProvider,private restaurantService:RestaurantProvider) {
  }

  anyadirproductopedido(){
    var i=0;
    for( i=0;i<this.pedidoService.plato.length;i++){
    this.producto.productop=this.pedidoService.plato[i].idProducto;
    this.producto.tipoproducto=this.pedidoService.plato[i].tipo;
    var fecha=new Date().toISOString();
    this.producto.hora=fecha;

    let fecha2=fecha.split('-');
    let anyo=fecha2[0];
    let mes=fecha2[1];
    let fecha3=fecha2[2].split('T');
    let aux=parseInt(fecha3[0]);
    let day=aux;
    let finishdate=anyo+"-"+mes+"-"+day;

    let aux2=fecha.split('T');
    let hours=aux2[1].split(':');
    let hour=parseInt(hours[0])+1;
    let min=hours[1];
    let seg=hours[2].split('.');
    let finishHour=hour+":"+min+":"+seg[0];
    
    this.producto.hora=finishdate+" "+finishHour;
    this.restaurantService.sumar_precio(this.producto.productop);
    this.restaurantService.anyadir_producto_pedido(this.producto)
    .subscribe(()=>{
      this.pedidoService.plato.splice(0,i);
      this.pedidoService.suma=0;
      this.navCtrl.setRoot(CamareroPage); 
    });
  }
  }
}
