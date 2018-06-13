import { RestaurantPage } from './../pages/restaurant/restaurant';
import { HomePage } from './../pages/home/home';
import { AllrestaurantsPage } from './../pages/allrestaurants/allrestaurants';
import { RestauranteliminadoPage } from './../pages/restauranteliminado/restauranteliminado';
import { UsuarioeliminadoPage } from './../pages/usuarioeliminado/usuarioeliminado';
import { AllusersPage } from './../pages/allusers/allusers';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { UsersProvider } from '../providers/users/users';
import { RestaurantsProvider } from '../providers/restaurants/restaurants';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';

import { IonicStorageModule } from '@ionic/storage';
import { DenunciasPage } from '../pages/denuncias/denuncias';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AllrestaurantsPage,
    RestaurantPage,
    AllusersPage,
    RestauranteliminadoPage,
    HomePage,
    UsuarioeliminadoPage,
    DenunciasPage
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
    AllrestaurantsPage,
    RestaurantPage,
    AllusersPage,
    RestauranteliminadoPage,
    HomePage,
    UsuarioeliminadoPage,
    DenunciasPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    RestaurantsProvider
  ]
})
export class AppModule {}
