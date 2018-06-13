import { ProductosdepedidoPage } from './../productosdepedido/productosdepedido';
import { EmpleadoPage } from './../empleado/empleado';
import { RestaurantProvider } from './../../providers/restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-crearpedido',
  templateUrl: 'crearpedido.html',
})
export class CrearpedidoPage {

  pedido={reservap: '', asignare: '', cuentatotal:0 ,mesa:'',dia:'',finalizado:0}

  reserva={comensales: '',restauranter: '',mesa:''};

  public buttonClicked: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService: RestaurantProvider) {
  }


  select_reserva(){
    this.buttonClicked=false;
  }

  crear_pedido(){
    if(this.buttonClicked==false){
      this.add_pedido();
    }else{
      this.add_reserva();
    }
  }


  add_pedido(){
    this.pedido.asignare=this.restaurantService.session.idEmpleado;

    var date = new Date();
    var currentdate=date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    this.pedido.dia=currentdate;
  
    this.restaurantService.add_pedido(this.pedido)
      .subscribe(()=>{
          this.navCtrl.setRoot(ProductosdepedidoPage);
    });

  }

  add_reserva(){
    this.reserva.mesa=this.pedido.mesa;
    this.reserva.restauranter=this.restaurantService.session.idRestaurante;
    this.restaurantService.add_reserva_pedido(this.reserva)
      .subscribe(()=>{
          this.pedido.reservap=this.restaurantService.idreservaaux.idReserva;
          this.add_pedido();
    });
    
  }

}
