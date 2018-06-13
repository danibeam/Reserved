import { ModificarempleadoPage } from './../pages/modificarempleado/modificarempleado';
import { ModidifcarrestaurantePage } from './../pages/modidifcarrestaurante/modidifcarrestaurante';
import { RestaurantePage } from './../pages/restaurante/restaurante';
import { CartarestaurantePage } from './../pages/cartarestaurante/cartarestaurante';
import { ListaempleadosPage } from './../pages/listaempleados/listaempleados';
import { RestaurantProvider } from './../providers/restaurant/restaurant';
import { EmpleadoPage } from './../pages/empleado/empleado';
import { CamareroPage } from './../pages/camarero/camarero';
import { CategoriasPage } from './../pages/categorias/categorias';
import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { Storage } from '@ionic/storage';
import { ComentariosPage } from '../pages/comentarios/comentarios';
import { ReservasPage } from '../pages/reservas/reservas';
import { InformacionPage } from '../pages/informacion/informacion';
import { CocineroPage } from '../pages/cocinero/cocinero';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  pedidospendientes=CamareroPage;
  pedidos=EmpleadoPage;

  inicio=RestaurantePage;
  modificar=ModidifcarrestaurantePage;
  empleados=ListaempleadosPage;
  carta=CartarestaurantePage;
  categorias= CategoriasPage;
  comentarios=ComentariosPage;
  reservas=ReservasPage;
  informacion=InformacionPage;
  modificarempleado=ModificarempleadoPage;
  cocinero=CocineroPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private menuCtrl:MenuController,public storage:Storage, private restaurantService:RestaurantProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage( pagina:any ){
      if(pagina==this.empleados){
        this.restaurantService.mis_empleados();
      }
      if(pagina==this.carta){
        this.restaurantService.mi_carta();
      }
      if(pagina==this.comentarios){
        this.restaurantService.mis_comentarios();
      }
      this.rootPage=pagina;
      this.menuCtrl.close();
  }

  closeSession(){
    this.restaurantService.logueado=false;
    this.restaurantService.login_correcto=false;
    this.storage.set('idEmpleado',"null");
    this.storage.set('token',"null");
    this.rootPage=LoginPage;
    this.menuCtrl.close();

  }

  closeSessionRestaurante(){
    this.restaurantService.logueado=false;
    this.restaurantService.login_correcto=false;
    this.storage.set('token',"null");
    this.storage.set('idRestaurante',"null");
    this.rootPage=LoginPage;
    this.menuCtrl.close();

  }

}

