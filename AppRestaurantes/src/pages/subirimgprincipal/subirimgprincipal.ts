import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-subirimgprincipal',
  templateUrl: 'subirimgprincipal.html',
})
export class SubirimgprincipalPage {

  imageData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl: ViewController, private restaurantService: RestaurantProvider) {
    this.imageData = this.navParams.get('data');
    
  }

  saveImage() {
    this.restaurantService.upload_image(this.imageData).then(res => {
      this.viewCtrl.dismiss({reload: true});
    }, err => {
      this.dismiss();
    });
  }
 
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
