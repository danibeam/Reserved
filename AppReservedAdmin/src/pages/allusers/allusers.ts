import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { Storage } from '@ionic/storage';
import { UsuarioeliminadoPage } from '../usuarioeliminado/usuarioeliminado';




@IonicPage()
@Component({
  selector: 'page-allusers',
  templateUrl: 'allusers.html',
})

export class AllusersPage {

  usuario={nombre: ''}

  constructor(public navCtrl: NavController, public storage:Storage, public navParams: NavParams,private usersService:UsersProvider) {
    if(usersService.mostrartodos==true){
      usersService.mostrar_todos_usuarios();
    }
    usersService.mostrartodos=true;
    
  }

  siguiente_pag(infiniteScroll){
    this.usersService.mostrar_todos_usuarios()
    .then(()=>{
      infiniteScroll.complete();
    })

  }

  borrar_usuario(id)
  {
    this.usersService.borrar_usuario(id);
    this.navCtrl.push(UsuarioeliminadoPage);
  }

  find_usuario(){
    this.usersService.find_usuario(this.usuario.nombre);
    this.navCtrl.setRoot(AllusersPage);
    this.usersService.mostrartodos=false;
  }

}
