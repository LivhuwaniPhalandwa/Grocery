import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Item, ToastController, ViewController } from 'ionic-angular';
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
  constructor(public vw:ViewController,private toastCtrl: ToastController,public items:ItemsProvider,public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private alertCtrl: AlertController ) {
  
   
  
  }
num;
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
    cssClass: 'popOver',
    message: "Enter your phone number before you proceed.",
    inputs: [
      {
        name: 'title',
        placeholder: 'Enter phone number ',
        type:"string"
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
         this.num =num;
         console.log(parseFloat(num).toString().length)
         if(num.length!=10)
          {

            let toast = this.toastCtrl.create({
              message: 'Phone number cannot be less than or more than 10 digits',
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
          
          }

        }
      }
    ]
  });

   

  prompt.present();
  prompt.onDidDismiss(() => {
    console.log('Dismissed toast');
    if(this.num.length<10)
    {
     
    }

    else
{
  let alert = this.alertCtrl.create({
    title: 'Customer Budget',
    inputs: [
      {
        name: 'title',
        placeholder: 'What is your current budget? ',
        type:"string"
      }],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },

      {
        text: 'Save',
        handler: (name) => {
          console.log('Buy clicked = ',name.title );
          this.items.budget =name.title ;
          this.storage.set('my-hotel', true);
          firebase.firestore().collection("CustomerBudget").doc(this.items.usernumber).set({budget:name.title});
          
        }
      }
    ]
  });
  alert.present(); 


  alert.onDidDismiss(()=>{

    let alert = this.alertCtrl.create({
      title: 'Select Supermarket',
      inputs: [
        {
          name: 'Shoprite',
          type: 'radio',
          value:'Shoprite',
          label: 'Shoprite',
        },
        {
          name: 'Pick n Pay',
          type: 'radio',
          value:'Pick n Pay',
          label: 'Pick n Pay',
        },
        {
          name: 'Checkers',
          type: 'radio',
          value:'Checkers',
          label:'Checkers'
        },
        {
          name: 'Game',
          type: 'radio',
          value:'Game',
          label:'Game'
        },
        {
          name: 'Spar',
          type: 'radio',
          value:'Spar',
          label:'Spar'
        },
        {
          name: 'Cambridge',
          type: 'radio',
          value:'Cambridge',
          label:'Cambridge'
        },
        {
          name: 'Boxer',
          type: 'radio',
          value:'Boxer',
          label:'Boxer'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        
          handler: data => {
    
    
            console.log('Cancel clicked',data);
            if(data ==undefined)
            {
    
            }
          }
        },
        {
          text: 'OK',
          handler: data => {
         
    console.log(data);
    
    
    this.items.supermarket =data;
    console.log(this.items.supermarket+this.items.usernumber)
    
    
    this.navCtrl.setRoot(HomePage, this.navParams.data);
    
    
          }
        }
      ]
    });
    alert.present();
    

  })
}
  });





 
}



// if(this.total==this.totalBudget) {
//   console.log('You have reached your limit');

}







