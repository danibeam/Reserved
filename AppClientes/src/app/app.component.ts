import { UsersProvider } from './../providers/users/users';
import { AllrestaurantsPage } from './../pages/allrestaurants/allrestaurants';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { RegistroPage } from '../pages/registro/registro';
import { PerfilPage } from '../pages/perfil/perfil';
import { IniciarpedidoPage } from '../pages/iniciarpedido/iniciarpedido';
import { LoginPage } from '../pages/login/login';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { Storage } from '@ionic/storage';
import { MisReservasPage } from '../pages/mis-reservas/mis-reservas';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  restaurantes = AllrestaurantsPage;
  registro = RegistroPage;
  perfil=PerfilPage;
  reserva=MisReservasPage;
  pedir = IniciarpedidoPage;
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private menuCtrl:MenuController,private alertCtrl:AlertController, public userservice:UsersProvider, public storage:Storage) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage( pagina:any ){

    if(this.userservice.logueado==true){
      this.rootPage=pagina;
      this.menuCtrl.close();
    }else{
      this.alertCtrl.create({
        title:"Error",
        subTitle:"No tienes acceso a este sitio",
        buttons:["OK"]
      }).present();
    }

  }

  closeSession(){
    this.userservice.logueado=false;
    this.userservice.login_correcto=false;
    this.storage.set('idUsuario',"null");
    this.storage.set('token',"null");
    this.rootPage=LoginPage;
    this.menuCtrl.close();

  }

}
