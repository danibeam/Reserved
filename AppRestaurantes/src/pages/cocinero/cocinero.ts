import { ModificarempleadoPage } from './../modificarempleado/modificarempleado';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cocinero',
  templateUrl: 'cocinero.html',
})
export class CocineroPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider, private menu:MenuController) {
    this.menu.enable(true, 'menu3');
  }

  doRefresh(refresher) {

    setTimeout(() => {
      this.restaurantService.see_productoscocinar();
      refresher.complete();
    }, 1000);
  }

  producto_preparado(idproducto){
    this.restaurantService.producto_preparado(idproducto);
    this.navCtrl.setRoot(CocineroPage);
  }

  producto_preparando(idproducto){
    this.restaurantService.producto_preparando(idproducto);
    this.navCtrl.setRoot(CocineroPage);
  }

}
