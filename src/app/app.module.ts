import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {Camera} from '@ionic-native/camera';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ProfileComponent } from '../components/profile/profile';



@NgModule({
  declarations: [
    MyApp,
  HomePage,
  ProfileComponent
  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfileComponent
  
  ],
  providers: [Camera,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler,},
    AuthServiceProvider,
   
   
    
    
  ]
})
export class AppModule {}
