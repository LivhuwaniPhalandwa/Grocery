import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { IonicStorageModule } from '@ionic/storage';
import {Camera} from '@ionic-native/camera';
import { ProfileComponent } from '../components/profile/profile';
import { Profile1Component } from '../components/profile1/profile1';
import { HistoryPage } from '../pages/history/history';
import { SuccessPage } from '../pages/success/success';
import { OnboardingPage } from '../pages/onboarding/onboarding';
import { BudgetPage } from '../pages/budget/budget';
import {ItemsProvider} from '../providers/items/items'


@NgModule({
  declarations: [
    MyApp,
  HomePage,
  Profile1Component,
  ProfileComponent,
  HistoryPage,
  SuccessPage,
  OnboardingPage,
  BudgetPage
  
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    

    IonicModule.forRoot(MyApp, {
      scrollPadding: false,
      scrollAssist: false,
      autoFocusAssist:false,

    }),
    IonicStorageModule.forRoot()
    
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    Profile1Component,
    ProfileComponent,
    HistoryPage,
    SuccessPage,
    OnboardingPage,
    BudgetPage

  
  ],
  providers: [Camera,
    StatusBar,
    SplashScreen,
   
    {provide: ErrorHandler, useClass: IonicErrorHandler,},
    ItemsProvider
  ]
})
export class AppModule {}
