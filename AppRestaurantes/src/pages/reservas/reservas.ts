import { MostrarreservasPage } from './../mostrarreservas/mostrarreservas';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-reservas',
  templateUrl: 'reservas.html',
})
export class ReservasPage {

  reservas={dia: ''}
  startDate = new Date().toISOString();

  constructor(public navCtrl: NavController,public alertCtrl:AlertController, public navParams: NavParams,public restaurantService:RestaurantProvider, private menu: MenuController) {
    this.menu.enable(true, 'menu2');
  }

  see_reservas(){
    var dateData = this.startDate.split('-');
    var year = dateData [0];
    var month = dateData [1];
    var aux = dateData [2];
    var day = aux.split('T');
    var dia=year+"-"+month+"-"+day[0];
    this.reservas.dia=dia;

    this.restaurantService.see_reservas(this.reservas)
      .subscribe(()=>{
          if(this.restaurantService.aforo!=""){
            this.navCtrl.setRoot(ReservasPage);
          }else{
            this.alertCtrl.create({
              title:"Error",
              subTitle:"No se encuentran reservas para esta fecha",
              buttons:["OK"]
            }).present();
          }
    });
  }

  mostrar_reservas(dia,turno){
    this.restaurantService.mostrar_reservas(dia,turno);
    this.navCtrl.push(MostrarreservasPage);
  }

}
