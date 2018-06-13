import { CartaPage } from './../carta/carta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { EmpleadoPage } from '../empleado/empleado';


@IonicPage()
@Component({
  selector: 'page-agregarproductopedido',
  templateUrl: 'agregarproductopedido.html',
})
export class AgregarproductopedidoPage {

  producto={productop:'',tipoproducto:'',hora:''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider) {

  }

  anyadirproductopedido(productoactual){
    this.producto.productop=productoactual.idProducto;
    this.producto.tipoproducto=productoactual.tipo;
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

    this.restaurantService.anyadir_producto_pedido(this.producto)
    .subscribe(()=>{
      console.log("Producto pedido");
      this.restaurantService.sumar_precio(this.producto.productop);
    });

  }

  volver_pedidos(){
    this.navCtrl.setRoot(EmpleadoPage);
  }

  mis_productos(id){
    this.restaurantService.productos_porcategoria(id);
    //console.log(id);
    this.navCtrl.push(CartaPage);
  }

}
