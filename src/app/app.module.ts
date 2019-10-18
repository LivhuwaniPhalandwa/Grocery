import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {ItemsProvider} from '../providers/items/items';
import {Camera} from '@ionic-native/camera';
import { ProfileComponent } from '../components/profile/profile';
import { Profile1Component } from '../components/profile1/profile1';
import { HistoryPage } from '../pages/history/history';
import { SuccessPage } from '../pages/success/success';



@NgModule({
  declarations: [
    MyApp,
  HomePage,
  Profile1Component,
  ProfileComponent,
  HistoryPage,
  SuccessPage
  
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
    ProfileComponent,
    HistoryPage,
    SuccessPage
  
  ],
  providers: [Camera,
    StatusBar,
    SplashScreen,
   
    {provide: ErrorHandler, useClass: IonicErrorHandler,},
    ItemsProvider
  ]
})
export class AppModule {}
