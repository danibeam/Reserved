import { ReservarPage } from './../reservar/reservar';
import { CartaPage } from './../carta/carta';
import { PedirPage } from './../pedir/pedir';
import { ComentariosPage } from './../comentarios/comentarios';
import { Component , ViewChild ,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, Platform } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';
import { MiscategoriasPage } from './../miscategorias/miscategorias';
import { CategoriaspedidoPage } from '../categoriaspedido/categoriaspedido';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

declare var google;

@IonicPage()

@Component({
  selector: 'page-restaurant',
  templateUrl: 'restaurant.html',
})
export class RestaurantPage {

  map: any;
  mediaestrella:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private iab:InAppBrowser, public restaurantService:RestaurantsProvider, private modalCtrl:ModalController,private toastCtrl:ToastController, private geolocation:Geolocation) { 
    
  }

  ionViewDidLoad(){
    this.loadMap();
  }

  openLink(){
    var options:InAppBrowserOptions= {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no',
      hardwareback: 'yes'
   };

    let browser = this.iab.create('https:reserved.ovh/motorgrafico','_system','location=true');
  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
  createRange2(number1){
    var number=5-number1;
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  createRange4(number){
    var items: number[] = [];
    var aux=Math.floor(number);
    if(number-Math.round(number)<-0.01){
      this.mediaestrella=true;
    }
    if(number-Math.round(number)>0.01){
      aux=aux+1;
    }
    for(var i = 1; i <= aux; i++){
       items.push(i);
    }

    
    return items;
  }
  createRange5(number1){
    var number=5-number1;
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    this.mediaestrella=false;
    return items;
  }

  createRange6(){
    var items: number[] = [];
    if(this.mediaestrella==true){
      for(var i = 1; i <= 1; i++){
        items.push(i);
      }
    }
    return items;

  }

  loadMap(){
    var aux= this.restaurantService.inforestaurante[0].coordenadas.split("_");
    let latitude =parseFloat(aux[0]) ;
    let longitude = parseFloat(aux[1]);
    
    let mapEle: HTMLElement = document.getElementById('map');
    let myLatLng = {lat: latitude, lng: longitude};
  
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 15
    });
  
    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Mapa'
      });
      mapEle.classList.add('show-map');
    });
  }

  ver_carta(){
    this.restaurantService.categorias_restaurante();
    this.navCtrl.push(MiscategoriasPage);
  }

  reservar(){
    this.navCtrl.push(ReservarPage);
  }
  comentar(){
    this.navCtrl.push(ComentariosPage);
  }
  iniciarpedido(){
    this.restaurantService.categorias_restaurante();
    this.navCtrl.push(CategoriaspedidoPage);
  }
  openImageprincipal(id) {
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "api/"+id+"/imageprincipal" });
    modal.present();
  }
  openImagesec1(id) {
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "api/"+id+"/imagesec1" });
    modal.present();
  }
  openImagesec2(id) {
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "api/"+id+"/imagesec2" });
    modal.present();
  }
  openImagesec3(id) {
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "api/"+id+"/imagesec3" });
    modal.present();
  }

}
