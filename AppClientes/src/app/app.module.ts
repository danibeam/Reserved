import { PreviewImagePage } from './../pages/preview-image/preview-image';
import { ReservarPage } from './../pages/reservar/reservar';
import { CartaPage } from './../pages/carta/carta';
import { MipedidoPage } from './../pages/mipedido/mipedido';
import { IniciarpedidoPage } from './../pages/iniciarpedido/iniciarpedido';
import { MiscategoriasPage } from './../pages/miscategorias/miscategorias';
import { HistorialPage } from './../pages/historial/historial';
import { CategoriaspedidoPage } from './../pages/categoriaspedido/categoriaspedido';
import { PedirPage } from './../pages/pedir/pedir';
import { ProductospedidoPage } from './../pages/productospedido/productospedido';
import { RestaurantPage } from './../pages/restaurant/restaurant';
import { ComentariosPage } from './../pages/comentarios/comentarios';
import { AllrestaurantsPage } from './../pages/allrestaurants/allrestaurants';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { UsersProvider } from '../providers/users/users';
import { RestaurantsProvider } from '../providers/restaurants/restaurants';
import { LoginPage } from '../pages/login/login';
import { PerfilPage } from '../pages/perfil/perfil';
import { ModificarReservaPage } from '../pages/modificar-reserva/modificar-reserva';
import { PedidosAntiguosPage } from '../pages/pedidos-antiguos/pedidos-antiguos';
import { RegistroPage } from '../pages/registro/registro';
import { ModificarperfilPage } from '../pages/modificarperfil/modificarperfil';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { MisReservasPage } from '../pages/mis-reservas/mis-reservas';
import { PedidoProvider } from '../providers/pedido/pedido';

import { Geolocation } from '@ionic-native/geolocation';

import { InAppBrowser } from '@ionic-native/in-app-browser';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PerfilPage,
    RegistroPage,
    AllrestaurantsPage,
    RestaurantPage,
    CartaPage,
    ReservarPage,
    MisReservasPage,
    ProductospedidoPage,
    PedirPage,
    MipedidoPage,
    ModificarperfilPage,
    ComentariosPage,
    MiscategoriasPage,
    CategoriaspedidoPage,
    IniciarpedidoPage,
    ModificarReservaPage,
    PedidosAntiguosPage,
    HistorialPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PerfilPage,
    RegistroPage,
    AllrestaurantsPage,
    RestaurantPage,
    CartaPage,
    ReservarPage,
    MisReservasPage,
    ProductospedidoPage,
    PedirPage,
    MipedidoPage,
    ModificarperfilPage,
    ComentariosPage,
    MiscategoriasPage,
    CategoriaspedidoPage,
    IniciarpedidoPage,
    ModificarReservaPage,
    PedidosAntiguosPage,
    HistorialPage
  ],
  providers: [
    InAppBrowser,
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    RestaurantsProvider,
    PedidoProvider
    
  ]
})
export class AppModule {}
