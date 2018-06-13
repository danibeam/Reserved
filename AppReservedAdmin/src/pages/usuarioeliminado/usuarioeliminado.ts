import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';




@Component({
  selector: 'page-usuarioeliminado',
  templateUrl: 'usuarioeliminado.html',
})
export class UsuarioeliminadoPage {

  constructor(public navCtrl: NavController) {
  }

  VolverAlMenu(){
    
    this.navCtrl.push(HomePage);
  }

}
