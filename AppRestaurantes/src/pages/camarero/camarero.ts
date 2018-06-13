import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { EmpleadoPage } from './../empleado/empleado';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-camarero',
  templateUrl: 'camarero.html',
})
export class CamareroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider) {
    
  }

  ver_pedidos(){
    this.navCtrl.setRoot(EmpleadoPage)
  }

  //utilizar este para borrar producto a producto
  producto_entregado(idproducto){
    this.restaurantService.producto_entregado(idproducto);
    this.navCtrl.setRoot(CamareroPage);
  }

  producto_entregado_todo(idproducto){
    if(typeof(idproducto)=="string"){
      let aux=idproducto.split("_");
      let i=0;
      for(i=0;i<aux.length;i++){
        this.restaurantService.producto_entregado(aux[i]);
      }
    }else{
      this.restaurantService.producto_entregado(idproducto);
    }
    this.navCtrl.setRoot(CamareroPage);
  }

  doRefresh(refresher) {

    setTimeout(() => {
      this.restaurantService.see_productosaentregar();
      refresher.complete();
    }, 1000);
  }

}
