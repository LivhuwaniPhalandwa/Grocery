import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {Camera} from '@ionic-native/camera';
import { ProfileComponent } from '../components/profile/profile';
import { Profile1Component } from '../components/profile1/profile1';
import { ItemsProvider } from '../providers/items/items';



@NgModule({
  declarations: [
    MyApp,
  HomePage,
  Profile1Component,
  ProfileComponent
  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Profile1Component,
    ProfileComponent
  
  ],
  providers: [Camera,
    StatusBar,
    SplashScreen,
    ItemsProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler,},
  
  ]
})
export class AppModule {}
