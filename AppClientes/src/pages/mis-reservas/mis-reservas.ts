import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { ModificarReservaPage } from './../modificar-reserva/modificar-reserva';
import { PedidosAntiguosPage } from './../pedidos-antiguos/pedidos-antiguos';
import { AllrestaurantsPage } from './../allrestaurants/allrestaurants';

@IonicPage()
@Component({
  selector: 'page-mis-reservas',
  templateUrl: 'mis-reservas.html',
})
export class MisReservasPage {
  eliminar={dia: '', turno:'', restaurante:''}
   constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider,public restaurantService: RestaurantsProvider) {
    this.userService.reservasfuturas();
  }

  modificar_reserva(id){
    this.userService.reservaactual=id;
    var i=0;
    for (i=0;i<this.userService.reservafutura.length;i++){
      if(this.userService.reservafutura[i].idReserva==id){
        this.userService.modificarreserva.comensales=this.userService.reservafutura[i].comensales;
        this.userService.modificarreserva.hora=this.userService.reservafutura[i].hora;
        var dateData = this.userService.reservafutura[i].dia.split('-');
        var year = dateData [0];
        var month = dateData [1];
        var aux1 = dateData [2];
        var day = aux1.split('T');
        var aux2=parseInt(day[0]);
        var diadef=aux2+1;
        var dia=year+"-"+month+"-"+diadef;
        this.userService.modificarreserva.dia=dia;
      }
    }
    this.navCtrl.push(ModificarReservaPage);
  }
  eliminar_reserva(id){
    var i=0;
    for(i=0;i<this.userService.reservafutura.length;i++){
      if(id==this.userService.reservafutura[i].idReserva){
        this.eliminar.restaurante=this.userService.reservafutura[i].idRestaurante;
        this.eliminar.dia=this.userService.reservafutura[i].dia;
        this.eliminar.turno=this.userService.reservafutura[i].turno;
      }
    }

    var dateData = this.eliminar.dia.split('-');
    var year = dateData [0];
    var month = dateData [1];
    var aux1 = dateData [2];
    var day = aux1.split('T');
    var aux2=parseInt(day[0]);
    var diadef=aux2+1;
    var dia=year+"-"+month+"-"+diadef;
    this.eliminar.dia=dia;
    

    this.userService.eliminar_reserva(id,this.eliminar);
    this.navCtrl.setRoot(AllrestaurantsPage);
    
  }
  restaurante(){
    this.navCtrl.setRoot(AllrestaurantsPage);
  }
}
