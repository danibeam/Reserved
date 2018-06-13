import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, LoadingController } from 'ionic-angular';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { PedidoProvider } from './../../providers/pedido/pedido';
import { MipedidoPage } from './../mipedido/mipedido';

@IonicPage()
@Component({
  selector: 'page-pedir',
  templateUrl: 'pedir.html',
})
export class PedirPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantsProvider, public pedidoService: PedidoProvider,private modalCtrl:ModalController, private loadingCtrl:LoadingController ) {
  }

  verpedido(){
    this.navCtrl.push(MipedidoPage);
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
}
