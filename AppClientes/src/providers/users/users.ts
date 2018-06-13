import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { RestaurantsProvider } from '../restaurants/restaurants';
import { Storage } from '@ionic/storage';


@Injectable()
export class UsersProvider {

  login_correcto=false;
  modificar_perfil=false;
  modificar_reserva= false;
  pinmodi=false;
  session:any;
  nuevopedido:any;
  logueado=false;
  nuevareserva = false;
  nuevopin=false;
  pedidos=false;
  idpedido=false;

  infouser:any;
  pininfo:any;
  reservaactual:any;
  reservapinactual:any;
  pedidoactual:any;
  reservasusuario:any;
  reservation:any;
  reservaconfirmada:any;
  reservafutura:any;
  botonhistorial:boolean=false;
  botonpendientes:boolean=false;

  modificarreserva={dia: '', hora: '', comensales: ''};

  constructor(public http: HttpClient, private alertCtrl:AlertController, public storage:Storage) {

  }

  add_user(data){
    let url="api/adduser";

    return this.http.post(url, data, {responseType: 'json'} )
      .map(resp=>{
        if(resp==='Nick no disponible'){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Nick ya en uso",
            buttons:["OK"]
          }).present();
        }else{
          console.log("Usuario creado");
          this.logueado=true;
          this.login_correcto=true;
          this.session=resp;
          this.storage.set('idUsuario', this.session.idUsuario);
          this.storage.set('token', this.session.token);
        };

      })

  }


  login_user(data){
    let url="api/login";

    return this.http.post(url,data,{responseType:'json'})
      .map(resp=>{
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
          this.session=resp;
          this.storage.set('idUsuario', this.session.idUsuario);
          this.storage.set('token', this.session.token);


        }
      })
  }

  user_profile(id,token){
    let url="api/users/";
    this.http.get(url+id,{headers: {'token-acceso':token}}).subscribe(data=>{
      this.infouser=data;
    });

  }

  mis_reservas(){
    let url="api/users/";
    this.storage.get('idUsuario').then((val) => {
      this.storage.get('token').then((val2) => {
        this.http.get(url+val+"/reservations",{headers: {'token-acceso':val2}}).subscribe(data=>{
          this.reservasusuario=data;
        });
      });
    });

  }

  modify_user(data){
    let url="api/users/";
    return this.http.put(url+this.session.idUsuario, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
          this.modificar_perfil=true;

      })

  }

  aforoaux:any;

  comprobar_aforo(data){
    let url = "api/users/comprobaraforo";
    return this.http.post(url,data, {headers: {'token-acceso':this.session.token} , responseType:'json'})
    .map(resp=>{
      this.aforoaux=resp;
      if(this.aforoaux[0]==undefined){
        this.nuevareserva = true;
      }else{
        if(this.aforoaux[0].aforo-data.comensales<0){
          this.alertCtrl.create({
            title:"Error",
            subTitle:"Aforo completo, escoja otro dia",
            buttons:["OK"]
          }).present();
        }else{
          this.nuevareserva = true;
        }
      }

    })

  }

  add_reserva(data){
    let url = "api/users/";
    return this.http.post(url+this.session.idUsuario+"/reservations",data, {headers: {'token-acceso':this.session.token} , responseType:'text'})
    .map(resp=>{
      this.mis_reservas();
    })
  }

  pedido_actual(id){
    let url = "api/users/";
    this.http.get(url+this.session.idUsuario+"/reservations/orders/"+id,{headers:{'token-acceso':this.session.token}})
    .subscribe(data=>{
      this.pedidoactual =data;
      this.reservation=this.pedidoactual[0].idPedido;
      this.idpedido=true;
    })
  }


  add_pedido(data){
    let url = "api/restaurants/orders/";
    return this.http.post(url+this.reservation+"/orderproducts",data, {headers: {'token-acceso':this.session.token} , responseType:'text'})
    .map(resp=>{
      this.nuevopedido = true;
    })

  }
  modify_reserva(data){
    let url="api/users/";
    return this.http.put(url+this.session.idUsuario+"/reservation/"+this.reservaactual, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .map(resp=>{
        this.user_profile(this.session.idUsuario, this.session.token);
          this.modificar_reserva=true;

      })

  }
  eliminar_reserva(id,data){
    let url="api/users/";
    this.http.put(url+this.session.idUsuario+"/reservations/"+id,data, {headers: {'token-acceso':this.session.token}}).subscribe(data=>{
      this.user_profile(this.session.idUsuario, this.session.token);
    });

  }
  reservasconfirmadas(){
    let url="api/users/";
    this.http.get(url+this.session.idUsuario+"/reservations/confirmadas", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(data=>{
          this.reservaconfirmada=data;
      })
  }
  add_pin(data){
    let url = "api/users/addpin";
    return this.http.post(url,data, {headers: {'token-acceso':this.session.token} , responseType:'json'})
    .map(resp=>{
      if(resp==='Pin incorrecto'){
        this.alertCtrl.create({
          title:"Error",
          subTitle:"Pin incorrecto",
          buttons:["OK"]
        }).present();
      }else{
        this.nuevopin = true;
        this.pininfo= resp;
      }
    })
  }
  reservasfuturas(){
    let url="api/users/";
    this.http.get(url+this.session.idUsuario+"/reservations/future", {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
      .subscribe(data=>{
          this.reservafutura=data;
      })
  }
  
  modificarpin(id,data){
      let url="api/users/pin/";
      return this.http.put(url+id, data, {headers: {'token-acceso':this.session.token} , responseType: 'json'} )
        .map(resp=>{
            this.pinmodi=true;
  
        })
  
    }
  }

 
