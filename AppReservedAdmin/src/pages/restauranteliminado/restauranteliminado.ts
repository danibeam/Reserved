import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import {  NavController,  } from 'ionic-angular';



@Component({
  selector: 'page-restauranteliminado',
  templateUrl: 'restauranteliminado.html',
})

export class RestauranteliminadoPage {

  constructor(public navCtrl: NavController) {
  }

  

  VolverAlMenu(){
    
    this.navCtrl.push(HomePage);
  }


}
