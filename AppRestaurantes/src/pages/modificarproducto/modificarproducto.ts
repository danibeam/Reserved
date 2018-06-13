import { Camera } from '@ionic-native/camera';
import { CartarestaurantePage } from './../cartarestaurante/cartarestaurante';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { RestaurantProvider } from '../../providers/restaurant/restaurant';


@IonicPage()
@Component({
  selector: 'page-modificarproducto',
  templateUrl: 'modificarproducto.html',
})
export class ModificarproductoPage {

  producto={nombre: '', precio: '', tipo: '',informacion:'',restauranteP:'',categoria:'',gluten:0,crustaceos:0,huevos:0,pescado:0,cacahuetes:0,soja:0,lacteos:0,frutos_cascara:0,apio:0,mostaza:0,sesamo:0,dioxido_azufre:0,moluscos:0,altramuces:0}

  imageData: any;

  subirimagen:boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public restaurantService:RestaurantProvider,private camera:Camera,private actionSheetCtrl:ActionSheetController) {
    restaurantService.see_category();
    if(this.subirimagen==false){
      this.imageData="api/"+restaurantService.session.idRestaurante+"/"+this.restaurantService.infoproductoactual[0].nombre+"/imageproducto"
    }
    
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
      this.subirimagen=true;
      
    }, (err) => {
      console.log('Error: ', err);
    });
  }

  modify_producto(){
    if(this.subirimagen==true){
      if(this.producto.nombre!=""){
        this.restaurantService.upload_imageproducto(this.imageData,this.producto.nombre);
      }else{
        this.restaurantService.upload_imageproducto(this.imageData,this.restaurantService.infoproductoactual[0].nombre);
      }
      
    }
    this.producto.restauranteP=this.restaurantService.session.idRestaurante;
    this.restaurantService.modify_producto(this.producto)
      .subscribe(()=>{
        if(this.restaurantService.modificar_producto==true){
          this.navCtrl.setRoot(CartarestaurantePage);
        }
    });
  }

  datachanged(e:any,alergeno){
    if(alergeno=="gluten"){
      if(e.checked==true){
        this.producto.gluten=1;
      }else{
        this.producto.gluten=2;
      }
    }
    if(alergeno=="crustaceos"){
      if(e.checked==true){
        this.producto.crustaceos=1;
      }else{
        this.producto.crustaceos=2;
      }
    }
    if(alergeno=="huevos"){
      if(e.checked==true){
        this.producto.huevos=1;
      }else{
        this.producto.huevos=2;
      }
    }
    if(alergeno=="pescado"){
      if(e.checked==true){
        this.producto.pescado=1;
      }else{
        this.producto.pescado=2;
      }
    }
    if(alergeno=="cacahuetes"){
      if(e.checked==true){
        this.producto.cacahuetes=1;
      }else{
        this.producto.cacahuetes=2;
      }
    }
    if(alergeno=="soja"){
      if(e.checked==true){
        this.producto.soja=1;
      }else{
        this.producto.soja=2;
      }
    }
    if(alergeno=="lacteos"){
      if(e.checked==true){
        this.producto.lacteos=1;
      }else{
        this.producto.lacteos=2;
      }
    }
    if(alergeno=="frutos_cascara"){
      if(e.checked==true){
        this.producto.frutos_cascara=1;
      }else{
        this.producto.frutos_cascara=2;
      }
    }
    if(alergeno=="apio"){
      if(e.checked==true){
        this.producto.apio=1;
      }else{
        this.producto.apio=2;
      }
    }
    if(alergeno=="mostaza"){
      if(e.checked==true){
        this.producto.mostaza=1;
      }else{
        this.producto.mostaza=2;
      }
    }
    if(alergeno=="sesamo"){
      if(e.checked==true){
        this.producto.sesamo=1;
      }else{
        this.producto.sesamo=2;
      }
    }
    if(alergeno=="dioxido_azufre"){
      if(e.checked==true){
        this.producto.dioxido_azufre=1;
      }else{
        this.producto.dioxido_azufre=2;
      }
    }
    if(alergeno=="moluscos"){
      if(e.checked==true){
        this.producto.moluscos=1;
      }else{
        this.producto.moluscos=2;
      }
    }
    if(alergeno=="altramuces"){
      if(e.checked==true){
        this.producto.altramuces=1;
      }else{
        this.producto.altramuces=2;
      }
    }

  }

}
