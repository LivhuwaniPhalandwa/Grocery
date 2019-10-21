import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
 
/**
 * Generated class for the BudgetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {
Items=[];
total:0;
item={
  totalbudget:0,

}
  constructor(public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
  }
  landing(){
    this.storage.set('my-hotel', true);
    this.navCtrl.setRoot(HomePage, this.navParams.data);
  }

  budget()
{
 if(this.total>=this.item.totalbudget) {
   let alert = this.alertCtrl.create({
     title: 'warning',
     subTitle: 'you reached your limit',
     buttons: ['exit']
   });
   alert.present();
 }
}

// if(this.total==this.totalBudget) {
//   console.log('You have reached your limit');

}







