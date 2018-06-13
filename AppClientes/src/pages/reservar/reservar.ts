import { AllrestaurantsPage } from './../allrestaurants/allrestaurants';
import { MisReservasPage } from './../mis-reservas/mis-reservas';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { UsersProvider } from './../../providers/users/users';
import { PerfilPage } from './../perfil/perfil';


@IonicPage()
@Component({
  selector: 'page-reservar',
  templateUrl: 'reservar.html',
})
export class ReservarPage {
  reserva={dia: '', hora: '', comensales: '', turno:'', restauranter:'',usuarior:''}
  startDate = new Date().toISOString();


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,   public userService:UsersProvider, public restaurantService:RestaurantsProvider) {
  }

  add_reserva(){
    var dateData = this.startDate.split('-');
    var year = dateData [0];
    var month = dateData [1];
    var aux1 = dateData [2];
    var day = aux1.split('T');
    var dia=year+"-"+month+"-"+day[0];
    this.reserva.dia=dia;

    var aux=this.reserva.hora.split(':');
    var aux2=parseInt(aux[0]);

    if(aux2<16){
      this.reserva.turno="Comida";
    }else{
      this.reserva.turno="Cena";
    }

    var regex = /^(0|[1-9][0-9]*)$/;

    if( !regex.test(this.reserva.comensales) ) {
      let alert = this.alertCtrl.create({
        title: 'Datos incorrectos',
        subTitle: 'Error al introducir los comensales',
        buttons: ['Ok']
      });
      alert.present(); 
    }else{
      if(this.reserva.restauranter !=null){
        this.reserva.restauranter=this.restaurantService.restauranteactual;
        this.reserva.usuarior=this.userService.session.idUsuario;
        this.userService.comprobar_aforo(this.reserva)
          .subscribe(()=>{
            if(this.userService.nuevareserva==true){
              this.userService.add_reserva(this.reserva).subscribe(()=>{
                let alert = this.alertCtrl.create({
                  title: 'Reserva Creada',
                  subTitle: 'La reserva ha sido creada',
                  buttons: ['Ok']
                });
                this.navCtrl.setRoot(AllrestaurantsPage);
                alert.present(); 
              })
              this.userService.nuevareserva = false;
            }
        });
  
      }
    }
  }
}
