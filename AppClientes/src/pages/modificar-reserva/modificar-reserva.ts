import { MisReservasPage } from './../mis-reservas/mis-reservas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { UsersProvider } from './../../providers/users/users';
import { PerfilPage } from './../perfil/perfil';

@IonicPage()
@Component({
  selector: 'page-modificar-reserva',
  templateUrl: 'modificar-reserva.html',
})
export class ModificarReservaPage {
  reserva={dia: '', hora: '', comensales: '', turno:'', restauranter:''}
  eliminar={dia: '', turno:'', restaurante:''}
  startDate:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService:UsersProvider, public restaurantService:RestaurantsProvider) {
    this.startDate=this.userService.modificarreserva.dia;
    this.eliminar.dia=this.userService.modificarreserva.dia;
    this.reserva.comensales=this.userService.modificarreserva.comensales;
    var aux=this.userService.modificarreserva.hora.split(':');
    var hora=aux[0]+":"+aux[1];
    this.reserva.hora=hora;
  }

  modificar_reserva(){

    if(this.reserva.hora!=''){
      var aux=this.reserva.hora.split(':');
      var aux2=parseInt(aux[0]);
      if(aux2<16){
        this.reserva.turno="Comida";
        this.eliminar.turno="Comida";
      }else{
        this.reserva.turno="Cena";
        this.eliminar.turno="Cena";
      }
    }
    

    if(this.startDate!=undefined){
      this.reserva.dia=this.startDate;
    }

    var i=0;
    for (i=0;i<this.userService.reservafutura.length;i++){
      if(this.userService.reservafutura[i].idReserva==this.userService.reservaactual){
        this.reserva.restauranter=this.userService.reservafutura[i].idRestaurante;
        this.eliminar.restaurante=this.userService.reservafutura[i].idRestaurante;
        if(this.reserva.comensales==""){
          this.reserva.comensales==this.userService.reservafutura[i].comensales;
        }
      }
      
    }

    this.userService.comprobar_aforo(this.reserva)
        .subscribe(()=>{
          if(this.userService.nuevareserva==true){
            this.userService.eliminar_reserva(this.userService.reservaactual,this.eliminar);
            this.userService.add_reserva(this.reserva).subscribe(()=>{
              this.navCtrl.setRoot(MisReservasPage);
            })
            this.userService.nuevareserva = false;
            this.userService.reservasfuturas();
          }
      });
  }
}
