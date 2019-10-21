import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import {BudgetPage} from '../budget/budget'

/**
 * Generated class for the OnboardingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-onboarding',
  templateUrl: 'onboarding.html',
})
export class OnboardingPage {
 

  constructor(public navCtrl: NavController, private storage: Storage,public navParams: NavParams, private menuCtrl: MenuController) {

    this.storage.get('my-hotel').then(val => {
      if(val == true)  {
        console.log(val);
        this.navCtrl.setRoot(BudgetPage);
        
      }else {
        console.log('on-boarding now');
        this.navCtrl.setRoot(BudgetPage)
        
      }
      
    });
    
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnboardingPage');
  }
  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(false);
  }
  ionViewWillLeave(){
    this.menuCtrl.swipeEnable(false);
  }
  skip(){
    this.storage.set('my-hotel', true);
    this.navCtrl.setRoot(BudgetPage,this.navParams.data);
   }
  


  landing(){
    this.storage.set('my-hotel', true);
    this.navCtrl.setRoot(BudgetPage, this.navParams.data);
  }
  }
