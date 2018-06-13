import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-preview-image',
  templateUrl: 'preview-image.html',
})
export class PreviewImagePage {

  urlfotoprincipal:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private restaurantService: RestaurantProvider) {
    this.url_foto();
  }

  close() {
    this.viewCtrl.dismiss();
  }

  url_foto(){
    this.urlfotoprincipal=this.restaurantService.urlfotopreview;
  }

}
