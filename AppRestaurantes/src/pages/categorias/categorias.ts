import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { CartarestaurantePage } from '../cartarestaurante/cartarestaurante';
import { AgregarproductoPage } from '../agregarproducto/agregarproducto';


@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  public buttonClicked: boolean = false;
  categoria={nombre: ''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider) {
    restaurantService. categorias_restaurante();
  }

  mostrar_formulario(){
    this.buttonClicked = !this.buttonClicked;
  }

  crear_categoria(){
    this.restaurantService.add_category(this.categoria)
      .subscribe(()=>{
        this.navCtrl.push(CategoriasPage);
    });
    
  }
  mis_productos(id){
    this.restaurantService.productos_porcategoria(id);
    this.navCtrl.push(CartarestaurantePage);
  }
  agregar_producto(){
    this.navCtrl.push(AgregarproductoPage);
  }
}
