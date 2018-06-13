import { AllrestaurantsPage } from './../allrestaurants/allrestaurants';
import { UsersProvider } from './../../providers/users/users';
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user= { nick: '', password: '', email: ''};
  pass={confirmarpassword:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,private loadingCtrl:LoadingController, public alertCtrl:AlertController, private userService:UsersProvider,private restaurantService:RestaurantsProvider) {
  }


  add_user() {

    if(this.user.password==this.pass.confirmarpassword){
      let confirm = this.alertCtrl.create({
        title: '¿Registrarse en Reserved?',
        message: '¿Aceptas las condiciones de uso de Reserved?',
        buttons: [
          {
            text: 'Acepto',
            handler: () => {
              this.userService.add_user(this.user)
              .subscribe(()=>{
                this.restaurantService.mostrar_todos();
                if(this.userService.login_correcto==true){
                  let loading = this.loadingCtrl.create({
                    content: 'Creando Usuario',
                    duration: 1500,
                  });
              
                  loading.onDidDismiss(() => {
                    this.navCtrl.setRoot(AllrestaurantsPage);
                  });
          
                  loading.present();
                }
            });
            }
          },
          {
            text: 'No acepto',
            handler: () => {
              console.log('No se registro');
            }
          },
  
        ]
      });
      confirm.present();

    }else{
      this.alertCtrl.create({
        title:"Error",
        subTitle:"Las contraseñas no coinciden",
        buttons:["OK"]
      }).present();
    }
    
  }

}
