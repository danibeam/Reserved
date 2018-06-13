import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  restaurant= { nombre: '', password: '', email: '',horario: '',descripcion: '',direccion: '',telefono: '',ciudad: '',aforo: '',tipoComida: '',coordenadas: ''};
  pass={confirmarpassword:''};


  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider,private modalCtrl:ModalController, private alertCtrl:AlertController) {
  }

  add_restaurant() {
    if(this.restaurantService.latlng!=undefined){
      this.restaurant.coordenadas=this.restaurantService.latlng;
    }
    if(this.restaurant.password==this.pass.confirmarpassword){
      this.restaurantService.add_restaurant(this.restaurant)
      .subscribe(()=>{
        if(this.restaurantService.login_correcto==true){
          let alert = this.alertCtrl.create({
            title: 'Restaurante creado',
            subTitle: 'El restaurante ha sido registrado correctamente',
            buttons: ['Ok']
          });
          this.navCtrl.setRoot(LoginPage);
          alert.present();
        }
      });
    }else{
      this.alertCtrl.create({
        title:"Error",
        subTitle:"Las contraseñas no coinciden",
        buttons:["OK"]
      }).present();
    }
    
  }

  openMap() {
    let modal = this.modalCtrl.create('MapaPage');
    modal.present();
  }

}
