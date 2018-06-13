import { CamareroPage } from './../camarero/camarero';
import { CocineroPage } from './../cocinero/cocinero';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modificarempleado',
  templateUrl: 'modificarempleado.html',
})
export class ModificarempleadoPage {

  employee= {password: ''};
  pass={confirmarpassword:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,private restaurantService:RestaurantProvider, private menu:MenuController,private alertCtrl:AlertController) {
    if(this.restaurantService.session.tipoEmpleado=="Cocinero"){
      this.menu.enable(true, 'menu3');
    }
  }

  modify_employee(){
    if(this.employee.password==this.pass.confirmarpassword){
      this.restaurantService.modify_employee(this.employee)
      .subscribe(()=>{
          if(this.restaurantService.session.tipoEmpleado=="Cocinero"){
            this.navCtrl.setRoot(CocineroPage);
          }else{
            this.navCtrl.setRoot(CamareroPage);
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

}
