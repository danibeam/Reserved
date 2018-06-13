import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';

@IonicPage()
@Component({
  selector: 'page-infoproducto',
  templateUrl: 'infoproducto.html',
})
export class InfoproductoPage {

  icongluten:string;
  iconcrustaceos:string;
  iconhuevos:string;
  iconpescado:string;
  iconcacahuetes:string;
  iconsoja:string;
  iconlacteos:string;
  iconcascara:string;
  iconapio:string;
  iconmostaza:string;
  iconsesamo:string;
  icondioxido:string;
  iconmoluscos:string;
  iconaltramuces:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private restaurantService:RestaurantsProvider,private viewCtrl:ViewController) {
    if(restaurantService.masinfoproductoactual[0].gluten==false){
      this.icongluten="radio-button-off";
    }else{
      this.icongluten="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].crustaceos==false){
      this.iconcrustaceos="radio-button-off";
    }else{
      this.iconcrustaceos="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].huevos==false){
      this.iconhuevos="radio-button-off";
    }else{
      this.iconhuevos="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].pescado==false){
      this.iconpescado="radio-button-off";
    }else{
      this.iconpescado="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].cacahuetes==false){
      this.iconcacahuetes="radio-button-off";
    }else{
      this.iconcacahuetes="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].soja==false){
      this.iconsoja="radio-button-off";
    }else{
      this.iconsoja="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].lacteos==false){
      this.iconlacteos="radio-button-off";
    }else{
      this.iconlacteos="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].frutos_cascara==false){
      this.iconcascara="radio-button-off";
    }else{
      this.iconcascara="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].apio==false){
      this.iconapio="radio-button-off";
    }else{
      this.iconapio="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].mostaza==false){
      this.iconmostaza="radio-button-off";
    }else{
      this.iconmostaza="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].sesamo==false){
      this.iconsesamo="radio-button-off";
    }else{
      this.iconsesamo="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].dioxido_azufre==false){
      this.icondioxido="radio-button-off";
    }else{
      this.icondioxido="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].moluscos==false){
      this.iconmoluscos="radio-button-off";
    }else{
      this.iconmoluscos="radio-button-on"
    }

    if(restaurantService.masinfoproductoactual[0].altramuces==false){
      this.iconaltramuces="radio-button-off";
    }else{
      this.iconaltramuces="radio-button-on"
    }


  }

  close() {
    this.viewCtrl.dismiss();
  }

}
