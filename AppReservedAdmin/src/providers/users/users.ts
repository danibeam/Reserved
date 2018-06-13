import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';


@Injectable()
export class UsersProvider {

  login_correcto=false;
  users: any=[];
  session:any;

  logueado=false;

  //Guardamos la info del usuario que se acaba de loguear.
  infouser:any;

  reservasusuario:any;

  //pagina de carga de los usuario
  pagina:number=0;

  //variable auxiliar para infinite scroll
  usuarios: any;

  mostrartodos:boolean=true;

  constructor(public http: HttpClient, private alertCtrl:AlertController, public storage:Storage) {
   
  }
 

  login_user(data){
    let url="https://reserved.ovh/apireserved/loginadmin";

    return this.http.post(url,data,{responseType:'json'})
      .map(resp=>{
        //si entra, significa que el nick no existe.
        if(resp==='Login incorrecto'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Nick y/o contraseña incorrectos",
            buttons:["OK"]
          }).present();
        }else if(resp==='Login incorrecto'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Nick y/o contraseña incorrectos",
            buttons:["OK"]
          }).present();
        }else{
          console.log("Login correcto");
          this.logueado=true;
          this.login_correcto=true;
          //guardamos la informacion del usuario
          this.session=resp;
          //Guardar en el storage
          this.storage.set('idUsuario', this.session.idUsuario);
          this.storage.set('token', this.session.token);

        }
      })
  }

 

  mostrar_todos_usuarios(){
    let promesa=new Promise((resolve,reject)=>{
      let url="https://reserved.ovh/apireserved/users/page/";
      this.http.get(url+this.pagina,{headers: {'token-acceso':this.session.token}})
        .subscribe(data=>{
          this.usuarios=data;
          for(let i=0; i<this.usuarios.length; i++) {
            this.users.push(this.usuarios[i]);
          }
          this.pagina+=1;
          resolve();
        });
    });

    return promesa;

  }

  borrar_usuario(id)
  {
    let url="https://reserved.ovh/apireserved/users/";

    this.http.delete(url+id,{headers: {'token-acceso':this.session.token}})
    .subscribe(data=>{
      this.mostrar_todos_usuarios();
    });

  }

  find_usuario(nombre){
    let url="https://reserved.ovh/apireserved/users/find/";
      this.http.get(url+nombre,{headers: {'token-acceso':this.session.token}}).subscribe(data=>{
        this.users=data;
        this.pagina=0;
      });

  }



}
