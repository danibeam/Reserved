import { RestaurantPage } from './../restaurant/restaurant';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { RestaurantsProvider } from '../../providers/restaurants/restaurants';


@IonicPage()
@Component({
  selector: 'page-allrestaurants',
  templateUrl: 'allrestaurants.html',
})
export class AllrestaurantsPage {

  busqueda = {nombre: '', ciudad:'', tipoComida:''}

  public buttonClicked: boolean = false;
  public buttonClicked2: boolean = false;
  public buttonClicked3: boolean = false;

  mediaestrella:boolean=false;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private restaurantService:RestaurantsProvider, private modalCtrl: ModalController, private loadingCtrl:LoadingController) {
    if(restaurantService.botontodosrestaurantes==true){
      this.buttonClicked2 = !this.buttonClicked2;
    }
  }

  createRange(number){
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
  createRange2(number1){
    var number=5-number1;
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    this.mediaestrella=false;
    return items;
  }

  createRange3(){
    var items: number[] = [];
    if(this.mediaestrella==true){
      for(var i = 1; i <= 1; i++){
        items.push(i);
      }
    }
    return items;

  }

  presentLoadingCustomfiltronovedades() {
    this.restaurantService.mostrar_todos_novedades();
    this.restaurantService.botontodosrestaurantes=false;
    let loading = this.loadingCtrl.create({
      content: 'Aplicando filtro...',
      duration: 1500,
    });

    loading.onDidDismiss(() => {
        this.navCtrl.setRoot(AllrestaurantsPage);
    });

    loading.present();
  }

  presentLoadingCustomtodos() {
    this.restaurantService.mostrar_todos();
    this.restaurantService.botontodosrestaurantes=false;
    let loading = this.loadingCtrl.create({
      content: 'Cargando información',
      duration: 1500,
    });

    loading.onDidDismiss(() => {
      this.navCtrl.setRoot(AllrestaurantsPage);
    });

    loading.present();
  }

  presentLoadingCustomfiltroproximidad() {
    this.restaurantService.mostrar_todos();
    this.restaurantService.botontodosrestaurantes=false;
    let loading = this.loadingCtrl.create({
      content: 'Aplicando filtro...',
      duration: 1500,
    });

    loading.onDidDismiss(() => {
        this.navCtrl.setRoot(AllrestaurantsPage);
    });

    loading.present();
  }

  presentLoadingCustomfiltrovaloracion() {
    this.restaurantService.mostrar_todos_valoracion();
    this.restaurantService.botontodosrestaurantes=false;
    let loading = this.loadingCtrl.create({
      content: 'Aplicando filtro...',
      duration: 1500,
    });

    loading.onDidDismiss(() => {
        this.navCtrl.setRoot(AllrestaurantsPage);
    });

    loading.present();
  }

  filtrar_resultados(){

    if(this.restaurantService.filtro=='novedades'){
      this.presentLoadingCustomfiltronovedades();
    }

    if(this.restaurantService.filtro=='proximidad'){
      this.presentLoadingCustomfiltroproximidad();
    }

    if(this.restaurantService.filtro=='valoracion'){
      this.presentLoadingCustomfiltrovaloracion();
    }
  }

  openImage(id) {
    let modal = this.modalCtrl.create('PreviewImagePage', { img: "api/"+id+"/imageprincipal" });
    modal.present();
  }

  presentLoadingCustom(id) {
    this.ver_restaurante(id);
    this.restaurantService.valoracion_media(id);
    
    let loading = this.loadingCtrl.create({
      content: 'Cargando información',
      duration: 1500,
    });

    loading.onDidDismiss(() => {
      this.ir_restaurante();
    });

    loading.present();
  }

  ver_restaurante(id){
    this.restaurantService.restaurante_id(id);
    this.restaurantService.comentarios_restaurante(id);
  }

  ir_restaurante(){
    this.navCtrl.push(RestaurantPage);
  }

  busquedaavanzada(){
    this.restaurantService.busqueda_avanzada(this.busqueda)
    .subscribe(()=>{
      this.restaurantService.botontodosrestaurantes=true;
      this.navCtrl.setRoot(AllrestaurantsPage);
    });
  }

  todos_restaurantes(){
    this.presentLoadingCustomtodos();
    
  }

  mostrar_formulario(){
    this.buttonClicked = !this.buttonClicked;
  }
  mostrar_formulario1(){
    this.buttonClicked2 = !this.buttonClicked2;
  }

  mostrar_formulario2(){
    this.buttonClicked3 = !this.buttonClicked3;
  }

}
