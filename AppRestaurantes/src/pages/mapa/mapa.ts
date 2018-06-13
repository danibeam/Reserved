import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  map: any;

  submit:boolean=false;

  address:any;

  markers:any[];

  markerboolean:boolean=false;

  lat:any;
  long:any;

  posicionactual:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation:Geolocation, private viewCtrl:ViewController, public restaurantService:RestaurantProvider) {
  }

  ionViewDidLoad(){
    this.initMap();
  }

  getPosition():any{
    this.geolocation.getCurrentPosition().then(response => {
      this.posicionactual=response;
      this.initMap2();
    })
    .catch(error =>{
      console.log(error);
    })
  }

  initMap2() {
      let latitude = this.posicionactual.coords.latitude;
      let longitude = this.posicionactual.coords.longitude;
      let myLatLng = {lat: latitude, lng: longitude};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: myLatLng,
      });

      let marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
      });

      this.markerboolean=true
      this.markers=marker;
  }

  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {lat: 38.3459963, lng: -0.4906855000000405}
    });
    map.addListener('click', function(event) {
      (document.getElementById("lat") as HTMLInputElement).value = event.latLng.lat();
      (document.getElementById("lng") as HTMLInputElement).value = event.latLng.lng();
      if(this.markerboolean==true){
          this.markers.setMap(null);
      }

      var marker = new google.maps.Marker({
        map: map,
        position: event.latLng
      });

      this.markerboolean=true
      this.markers=marker;
    });
  }

  geocodeAddress(geocoder, resultsMap) {
    geocoder.geocode({'address': this.address}, function(results, status) {
      if (status === 'OK') {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 15,
          center: {lat: 38.3459963, lng: -0.4906855000000405}
        });
        (document.getElementById("lat") as HTMLInputElement).value = results[0].geometry.location.lat();
        (document.getElementById("lng") as HTMLInputElement).value = results[0].geometry.location.lng();
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        this.markerboolean=true
        this.markers=marker;
        
      } else {
        alert('Geocode no funciona: ' + status);
      }
    });
  }

  add_marker(){
    var geocoder = new google.maps.Geocoder();
    this.geocodeAddress(geocoder, this.map);
  }

  close() {
    this.viewCtrl.dismiss();
  }

  validate(){
    this.viewCtrl.dismiss();
    this.restaurantService.latlng=(document.getElementById("lat") as HTMLInputElement).value+"_"+(document.getElementById("lng") as HTMLInputElement).value;
  }

}
