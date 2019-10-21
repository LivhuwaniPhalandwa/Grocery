import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  toggle: boolean=true;
  database=firebase.firestore();
  item = {
    name:'',
    price:null,
    quantity: 1,
    image: '',
    totalPrice:0,
   }
   total=0
  //  MyItems:[];
   docId
  Items: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.saveDataa();
    this.database.collection("Item").get(this.docId).then(data => {
      data.forEach(item => {
        console.log("This is your data", item.data());
        // this.MyItems.push(item.data())
        
      })
    })
  }
  

  ionViewDidLoad(){
this.saveData();
    
  }
  saveDataa(){   
    this.database.collection('Item').get(this.docId).then(res => {
      res.forEach(doc => {

        console.log(doc.data());
        this.item.image = doc.data().image
        this.item.name = doc.data().name
        this.item.price = doc.data().price 
        this.item.quantity = doc.data().quantity
        this.total=(this.item.price*this.item.quantity)
      })
})

  }
  saveData() {
    let data = {
      docid: "",
      doc: {}
    }
   this.database.collection("Item").get(this.docId).then(doc => {
      this.Items = []
         doc.forEach(item => {
           data.docid = item.id
           data.doc = item.data();
           this.Items.push(data);
           this.total = this.total + parseFloat(item.data().totalPrice);
           data = {
            docid: "",
            doc: {}
          }
          console.log(this.total)
           
         })
         
         console.log('Final' ,this.total)
  })
}


}