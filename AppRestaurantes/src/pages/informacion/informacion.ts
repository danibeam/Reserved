import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-informacion',
  templateUrl: 'informacion.html',
})
export class InformacionPage {
  startDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider, private menu:MenuController) {
    this.menu.enable(true, 'menu2');
  }

  see_informacion(){
    var dateData = this.startDate.split('-');
    var year = dateData [0];
    var month = dateData [1];
    var aux = dateData [2];
    var day = aux.split('T');
    var dia=year+"-"+month+"-"+day[0];

    this.restaurantService.see_info(dia);
    
    this.navCtrl.setRoot(InformacionPage);
    
  }

}
