import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PerfilPage } from './../perfil/perfil';
import { UsersProvider } from './../../providers/users/users';


@IonicPage()
@Component({
  selector: 'page-modificarperfil',
  templateUrl: 'modificarperfil.html',
})
export class ModificarperfilPage {
  usuario={password: '', email: ''}
  pass={confirmarpassword:''};

  constructor(public navCtrl: NavController, public navParams: NavParams,public userService: UsersProvider,private alertCtrl:AlertController) {
  }

  modify_user(){
    if(this.usuario.password!=''){
      if(this.usuario.password==this.pass.confirmarpassword){
        this.userService.modify_user(this.usuario)
        .subscribe(()=>{
          if(this.userService.modificar_perfil==true){
         this.navCtrl.setRoot(PerfilPage);
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

    if(this.usuario.password==''){
      this.userService.modify_user(this.usuario)
        .subscribe(()=>{
          if(this.userService.modificar_perfil==true){
         this.navCtrl.setRoot(PerfilPage);
          }
        });

    } 
  }
}
