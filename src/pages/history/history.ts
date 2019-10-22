import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import {Storage} from '@ionic/storage'
import { ItemsProvider } from '../../providers/items/items';

declare var google;

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
  
 MyItems = [];
 newItems = []

 rice : number = 0;

  Items: any[];
  constructor(public items:ItemsProvider,public navCtrl: NavController, public navParams: NavParams,public storage:Storage) {
    this.saveDataa()
    
  }
  

  ionViewDidLoad(){
    this.MyItems=[]
    this.docId=this.navParams.data.docId
    this.item.name = this.navParams.data.name
    this.item.price = this.navParams.data.price
    this.item.quantity = this.navParams.data.quantity
    this.item.image = this.navParams.data.image
    this.total=(this.item.price*this.item.quantity)
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
 ionViewWillEnter(){
  this.database.collection(this.items.usernumber).where('saved', '==', true) .onSnapshot(data => {
    data.forEach(item => {
      this.newItems.push([item.data().name, item.data().quantity])
      this.MyItems.push(item.data())
      
    })
  })

 
  
 }

 showChart(){

this.MyItems.forEach(data => {


})

console.log('sssssssssssssssssssss', this.newItems);


   var data = new google.visualization.DataTable();
   data.addColumn('string', 'Topping');
   data.addColumn('number', 'Slices');
  

  data.addRows(
    this.newItems
  );
   
   var options = {'title':' Overall Grocery list items ',
                  'width':350,
                  'height':350};

   var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
   chart.draw(data, options);


  }
  

getdtata(){
  let itemsArray = []
  localStorage.setItem('Items', JSON.stringify(itemsArray))
  const data = JSON.parse(localStorage.getItem('items'))
}

}