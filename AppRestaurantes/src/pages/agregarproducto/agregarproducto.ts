import { CartarestaurantePage } from './../cartarestaurante/cartarestaurante';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ModalController } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';
import { CategoriasPage } from './../categorias/categorias';

import { Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-agregarproducto',
  templateUrl: 'agregarproducto.html',
})
export class AgregarproductoPage {

  producto={nombre: '', precio: '', tipo: '',informacion:'',restauranteP:'',categoria:'',gluten:false,crustaceos:false,huevos:false,pescado:false,cacahuetes:false,soja:false,lacteos:false,frutos_cascara:false,apio:false,mostaza:false,sesamo:false,dioxido_azufre:false,moluscos:false,altramuces:false}

  imageData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public restaurantService:RestaurantProvider, private camera:Camera,private actionSheetCtrl: ActionSheetController, private modalCtrl: ModalController) {
    restaurantService.see_category();
  }

  add_producto(){
    this.restaurantService.upload_imageproducto(this.imageData,this.producto.nombre);
    this.producto.restauranteP=this.restaurantService.session.idRestaurante;
    this.restaurantService.add_producto(this.producto)
      .subscribe(()=>{
        if(this.restaurantService.anyadir_producto==true){
          this.navCtrl.setRoot(CategoriasPage);
        }
    });
    
  }

  presentActionSheet() {
    this.restaurantService.numfoto=null;
    this.restaurantService.numfoto=1;
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Selecciona una opción',
      buttons: [
        {
          text: 'Cargar desde galería',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Usar cámara',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    var options = {
      quality: 50,
      targetWidth: 400,
      targetHeight: 400,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
 
    this.camera.getPicture(options).then((imagePath) => {
      this.imageData=imagePath;
      
    }, (err) => {
      console.log('Error: ', err);
    });
  }

}
