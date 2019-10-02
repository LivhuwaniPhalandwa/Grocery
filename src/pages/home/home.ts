import { Component } from '@angular/core';
 import { NavController } from 'ionic-angular';
import firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 toggle: boolean;
 Items = [];
item={
  name:'',
  price: '',
  quantity: ''
}

  database=firebase.firestore();
 
 
  
  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    this.pullData();
  }
  // addData(){
  //    this.database.collection("Item").get().then((res)=>{
  //     //console.log(res.);
  //      res.forEach((doc)=>{
  //         console.log(doc.data());
         
  //      })
  //    })
  // }

  
  pullData(){
    let data = {
      docid: "",
      doc: {}
    }
     this.database.collection("Item").onSnapshot(doc => {
           doc.forEach(item => {
             data.docid = item.id
             data.doc = item.data();
             data = {
              docid: "",
              doc: {}
            }
             
             this.Items.push(data);
           })
           console.log("Your data is", this.Items)
    })
  }

  deleteData(docid){
     this.database.collection("Item").doc(docid).delete();
    this.Items = []
     this.pullData()
  }

  
  expandDiv(){
    this.toggle = !this.toggle;
  }


  
}
