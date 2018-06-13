import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Injectable()
export class PedidoProvider {
  plato:any[]=[];
  suma:number=0;
  constructor(public http: HttpClient, public storage:Storage, private alertCtrl:AlertController) {
    
  }

  agregarpedido(item:any) {
    this.plato.push(item);
    this.total();
  }

  eliminarplato(num){
    this.plato.splice(num,1);
    this.total();
  }
  total(){
    this.suma=0;
    let i=0;
    for(i=0;i<this.plato.length;i++){
     this.suma+=Number(this.plato[i].precio);
    }
  }
}
