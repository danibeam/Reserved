import { MisReservasPage } from './../mis-reservas/mis-reservas';
import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ModificarperfilPage } from './../modificarperfil/modificarperfil';
import { ModificarReservaPage } from './../modificar-reserva/modificar-reserva';
import { HistorialPage } from './../historial/historial';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public userService:UsersProvider) {
    storage.get('idUsuario').then((val) => {
      storage.get('token').then((val2) => {
        userService.user_profile(val,val2);
      });
    });
  }
  modificarperfil(){
    this.navCtrl.push(ModificarperfilPage);
  }
  verhistorial(){
    this.navCtrl.push(HistorialPage);
    this.userService.mis_reservas();
  }
}
