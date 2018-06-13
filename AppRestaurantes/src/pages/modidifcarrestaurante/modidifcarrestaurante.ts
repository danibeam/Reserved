import { RestaurantePage } from './../restaurante/restaurante';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modidifcarrestaurante',
  templateUrl: 'modidifcarrestaurante.html',
})
export class ModidifcarrestaurantePage {

  restaurant= { nombre: '', password: '', email: '',horario: '',descripcion: '',direccion: '',telefono: '',ciudad: '',aforo: '',tipoComida: '',coordenadas: ''};
  pass={confirmarpassword:''};

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider,private alertCtrl:AlertController, private menu:MenuController, private modalCtrl:ModalController) {
    this.menu.enable(true, 'menu2');
  }

  modify_restaurant(){

    if(this.restaurantService.latlng!=undefined){
      this.restaurant.coordenadas=this.restaurantService.latlng;
    }

    if(this.restaurant.password!=''){
      if(this.restaurant.password==this.pass.confirmarpassword){
        this.restaurantService.modify_restaurant(this.restaurant)
        .subscribe(()=>{
            this.navCtrl.setRoot(RestaurantePage);
        });
      }else{
        this.alertCtrl.create({
          title:"Error",
          subTitle:"Las contraseñas no coinciden",
          buttons:["OK"]
        }).present();
      }
    }

    if(this.restaurant.password==''){
      this.restaurantService.modify_restaurant(this.restaurant)
      .subscribe(()=>{
          this.navCtrl.setRoot(RestaurantePage);
      });
    } 
    
    
  }

  openMap() {
    let modal = this.modalCtrl.create('MapaPage');
    modal.present();
  }



}
