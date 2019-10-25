import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { firebaseConfig } from './Firebase';
import { HomePage } from '../pages/home/home';
import {OnboardingPage} from '../pages/onboarding/onboarding'
import { Storage } from '@ionic/storage';
import { BudgetPage } from '../pages/budget/budget';
import {InsertPage} from '../pages/insert/insert';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  
  rootPage:any ='';
 
   constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {


    this.platform.ready().then(() => {

      this.storage.get('budget').then((result) => {
console.log(result)
        if(result){
          this.rootPage = BudgetPage;
        } else {
          this.rootPage = InsertPage;
          this.storage.set('budget', true);
        }

      

      });

    });



      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
        
      });
      firebase.initializeApp(firebaseConfig);
    }

    
  }

