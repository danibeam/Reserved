import { ModificarproductoPage } from './../modificarproducto/modificarproducto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { CategoriasPage } from './../categorias/categorias';



@IonicPage()
@Component({
  selector: 'page-cartarestaurante',
  templateUrl: 'cartarestaurante.html',
})
export class CartarestaurantePage {
  constructor(public navCtrl: NavController, public navParams: NavParams,public restaurantService:RestaurantProvider, private menu:MenuController,private loadingCtrl:LoadingController) {
    this.menu.enable(true, 'menu2');
    restaurantService.categorias_restaurante();
  }


  eliminar_producto(id){
    this.restaurantService.eliminar_producto(id);
    this.navCtrl.push(CategoriasPage);
  }
  modificar_producto(id) {
    this.restaurantService.producto_id(id);
    this.restaurantService.productoactual=id;
    let loading = this.loadingCtrl.create({
      content: 'Cargando...',
      duration: 500,
    });

    loading.onDidDismiss(() => {
      this.navCtrl.push(ModificarproductoPage);
    });

    loading.present();
  }



}
