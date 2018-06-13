
import { RestaurantsProvider } from './../../providers/restaurants/restaurants';
import { AllrestaurantsPage } from './../allrestaurants/allrestaurants';
import { RegistroPage } from './../registro/registro';
import { UsersProvider } from './../../providers/users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user= { nick: '', password: ''};

  constructor(public navCtrl: NavController, public navParams: NavParams,private userservice:UsersProvider, private loadingCtrl: LoadingController,private restaurantService:RestaurantsProvider) {

  }

  showRegistroPage() {
    this.navCtrl.push(RegistroPage);
  }

  presentLoadingCustom() {
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión',
      duration: 3000,
    });

    loading.onDidDismiss(() => {
        this.navCtrl.setRoot(AllrestaurantsPage);
    });

    loading.present();
  }

  login_user(){
    this.restaurantService.getPosition();
    this.userservice.login_user(this.user)
      .subscribe(()=>{
        if(this.userservice.login_correcto==true){
          this.restaurantService.mostrar_todos();
          this.presentLoadingCustom();
        }
        
    });
  }

}
