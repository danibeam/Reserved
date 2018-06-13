import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AllrestaurantsPage } from './../allrestaurants/allrestaurants';

@IonicPage()
@Component({
  selector: 'page-carta',
  templateUrl: 'carta.html',
})
export class CartaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantsProvider, private modalCtrl:ModalController, private loadingCtrl:LoadingController) {
  }

  mas_info(){
    let modal = this.modalCtrl.create('InfoproductoPage');
    modal.present();
  }

  presentLoadingCustom(idproducto) {
    this.restaurantService.masinfoproducto(idproducto);
    let loading = this.loadingCtrl.create({
      content: 'Cargando...',
      duration: 1000,
    });

    loading.onDidDismiss(() => {
      this.mas_info();
    });

    loading.present();
  }
  restaurante(){
    this.navCtrl.setRoot(AllrestaurantsPage);
  }
}
