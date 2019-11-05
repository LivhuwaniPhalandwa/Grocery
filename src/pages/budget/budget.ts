import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Item, ToastController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { ItemsProvider } from '../../providers/items/items';
// import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-budget',
  templateUrl: 'budget.html',
})
export class BudgetPage {
  Items = [];
  total: 0;
  item = {
    totalbudget: 0,

  }
  constructor(public vw: ViewController, private toastCtrl: ToastController, public items: ItemsProvider, public navCtrl: NavController, private storage: Storage, public navParams: NavParams, private alertCtrl: AlertController) {
  }
  num;
  ionViewDidLoad() {
    console.log('ionViewDidLoad BudgetPage');
  }
  landing() {

    // this.navCtrl.push(LoginPage);
    this.showPrompt();

  }

  budget() {
    if (this.total >= this.item.totalbudget) {
      let alert = this.alertCtrl.create({
        title: 'warning',
        subTitle: 'you reached your limit',
        buttons: ['exit']
      });
      alert.present();
    }
  }


<<<<<<< HEAD
  showPrompt() {
    const prompt = this.alertCtrl.create({
      title: 'Login',
      message: "Enter your phone number before you proceed.",
      inputs: [
        {
          name: 'title',
          placeholder: 'Enter phone number ',
          type: "number"
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.num = data.title;
            if (this.num.length != 10){
              let toast = this.toastCtrl.create({
                message: 'Phone number cannot be less than or more than 10 digits',
                duration: 4000,
                position: 'bottom'
              });
              toast.present();
            }
            else {
              this.items.usernumber = data.title;
            }
          }
        }
      ]
    });
    prompt.present();
    prompt.onDidDismiss(() => {

        firebase.firestore().collection("CustomerBudget").doc(this.items.usernumber).get().then(val => {
          console.log("Budget = ", val.data())
          
          if (!val.exists ) {

            let alert = this.alertCtrl.create({
              title: 'Customer Budget',
              inputs: [
                {
                
                  type: "number",
                  name: 'title',
                  placeholder: 'What is your current budget? ',

                  
                
                 
                }],
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel'
                },
                {
                  text: 'Save',
                  handler: (name) => {
                    console.log('Buy clicked = ', name.title);
                    this.items.budget = name.title;
                    firebase.firestore().collection("CustomerBudget").doc(this.items.usernumber).set({ budget: name.title }).then(res => {
                       this.shopalert();
                    })
                   
                  }
                }
              ]
            });
            alert.present()
// .then(result =>{document.getElementById('maxLength10').setAttribute('maxlength','10');});
=======
showPrompt() {
  const prompt = this.alertCtrl.create({
    title: 'Login',
    message: "Enter your phone number before you proceed.",
    inputs: [
      {
        name: 'title',
        placeholder: 'Enter phone number ',
        type:"number"
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel'
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
>>>>>>> 1970c5dfdf6c01cabacbbaaf931c4677ae1ed32a

          }
          else {
            this.items.budget = val.data().budget;
            this.shopalert();
          }

          console.log()

<<<<<<< HEAD
        })
      
=======
  prompt.present();
  prompt.onDidDismiss(() => {
    
  
    if(typeof(this.num.length)!==undefined && this.num.length!=10)
    {
      const toast = this.toastCtrl.create({
        message: 'Your phone number must be 10 digits long.',
        duration: 3000
      });
      toast.present();
    }
    else
    {
>>>>>>> 1970c5dfdf6c01cabacbbaaf931c4677ae1ed32a


<<<<<<< HEAD
=======
        let alert = this.alertCtrl.create({
          title: 'Customer Budget',
          inputs: [
            {
              name: 'title',
              placeholder: 'What is your current budget? ',
              type:"tel",
              min: "1",
              max:"7"
              
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
                this.shopalert();
              }
            }
          ]
        });
        alert.present(); 
        
       }
       else{
        this.shopalert();
       }
      
  console.log()
  
>>>>>>> 1970c5dfdf6c01cabacbbaaf931c4677ae1ed32a
    })
  }
  //////////////////////////////

  shopalert() {
    let alert = this.alertCtrl.create({
      title: 'Select Supermarket',
      inputs: [
        {
          name: 'Shoprite',
          type: 'radio',
          value: 'Shoprite',
          label: 'Shoprite',
        },
        {
          name: 'Pick n Pay',
          type: 'radio',
          value: 'Pick n Pay',
          label: 'Pick n Pay',
        },
        {
          name: 'Checkers',
          type: 'radio',
          value: 'Checkers',
          label: 'Checkers'
        },
        {
          name: 'Game',
          type: 'radio',
          value: 'Game',
          label: 'Game'
        },
        {
          name: 'Spar',
          type: 'radio',
          value: 'Spar',
          label: 'Spar'
        },
        {
          name: 'Cambridge',
          type: 'radio',
          value: 'Cambridge',
          label: 'Cambridge'
        },
        {
          name: 'Boxer',
          type: 'radio',
          value: 'Boxer',
          label: 'Boxer'
        },
        {
          name: 'Other',
          type: 'radio',
          value: 'Other',
          label: 'Other',
          checked: true,
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: data => {
            this.items.supermarket = data;
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    alert.present();

    
  }


}

