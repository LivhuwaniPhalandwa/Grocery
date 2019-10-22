import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Item, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { ItemsProvider } from '../../providers/items/items';
 
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
  constructor(private toastCtrl: ToastController,public items:ItemsProvider,public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private alertCtrl: AlertController ) {
  
   
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
  }
  landing(){

    this.showPrompt();
    
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


showPrompt() {
  const prompt = this.alertCtrl.create({
    title: 'Login',
    message: "Enter your phone number before you proceed.",
    inputs: [
      {
        name: 'title',
        placeholder: 'Enter phone number '
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          console.log('Saved clicked = ',data.title );
         let num = data.title;
         if((parseFloat(num)).toString().length<10)
          {

            let toast = this.toastCtrl.create({
              message: 'Phone number cannot be less than 10 digits',
              duration: 4000,
              position: 'bottom'
            });


toast.present();

         
          }
          else
          {
            this.items.usernumber =data.title;
            console.log("Usernumber = ", this.items.usernumber)
            firebase.firestore().collection(data.title);
            this.storage.set('my-hotel', true);
            this.navCtrl.setRoot(HomePage, this.navParams.data);
          }
        }
      }
    ]
  });
  prompt.present();
}



// if(this.total==this.totalBudget) {
//   console.log('You have reached your limit');

}







