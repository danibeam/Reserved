import { Camera } from '@ionic-native/camera';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';

@IonicPage()
@Component({
  selector: 'page-masfotos',
  templateUrl: 'masfotos.html',
})
export class MasfotosPage {

  urlfotosec1:any;
  urlfotosec2:any;
  urlfotosec3:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private restaurantService:RestaurantProvider, private camera:Camera,private actionSheetCtrl: ActionSheetController) {
    this.url_foto();
  }

  url_foto(){
    this.urlfotosec1="api/"+this.restaurantService.session.idRestaurante+"/imagesec1";
    this.urlfotosec2="api/"+this.restaurantService.session.idRestaurante+"/imagesec2";
    this.urlfotosec3="api/"+this.restaurantService.session.idRestaurante+"/imagesec3";
  }

  openImage1() {
    this.restaurantService.urlfotopreview=null;
    this.restaurantService.urlfotopreview=this.urlfotosec1;
    let modal = this.modalCtrl.create('PreviewImagePage', { img: this.restaurantService.urlfotopreview });
    modal.present();
  }

  openImage2() {
    this.restaurantService.urlfotopreview=null;
    this.restaurantService.urlfotopreview=this.urlfotosec2;
    let modal = this.modalCtrl.create('PreviewImagePage', { img: this.restaurantService.urlfotopreview });
    modal.present();
  }

  openImage3() {
    this.restaurantService.urlfotopreview=null;
    this.restaurantService.urlfotopreview=this.urlfotosec3;
    let modal = this.modalCtrl.create('PreviewImagePage', { img: this.restaurantService.urlfotopreview });
    modal.present();
  }

  presentActionSheet1() {
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

  presentActionSheet2() {
    this.restaurantService.numfoto=null;
    this.restaurantService.numfoto=2;
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
          text: 'Usar Cámara',
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

  presentActionSheet3() {
    this.restaurantService.numfoto=null;
    this.restaurantService.numfoto=3;
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
          text: 'Usar Cámara',
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
      targetWidth: 1024,
      targetHeight: 1024,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };
 
    this.camera.getPicture(options).then((imagePath) => {
      let modal = this.modalCtrl.create('SubirimgsecundariaPage', { data: imagePath });
      modal.present();
      modal.onDidDismiss(data => {
        if (data && data.reload) {
          this.navCtrl.setRoot(MasfotosPage);
        }
      });
    }, (err) => {
      console.log('Error: ', err);
    });
  }

}
