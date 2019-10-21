import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';

declare var google;

@IonicPage()
@Component({
 selector: 'page-history',
 templateUrl: 'history.html',
})
export class HistoryPage {


 database=firebase.firestore();
 toggle: boolean=true;
 MyItems = [];
 newItems = []

 rice : number = 0;

 constructor(public navCtrl: NavController, public navParams: NavParams) {
 }

 ionViewDidLoad() {
   console.log('ionViewDidLoad HistoryPage');
 }

 ionViewWillEnter(){
  this.database.collection("Item").onSnapshot(data => {
    data.forEach(item => {
      this.newItems.push([item.data().name, item.data().quantity])
      this.MyItems.push(item.data())
      
    })
  })

 
  
 }

 showChart(){

this.MyItems.forEach(data => {


// this.newItems.push([{name:data.name, number:data.quantity}])

})

console.log('sssssssssssssssssssss', this.newItems);


   var data = new google.visualization.DataTable();
   data.addColumn('string', 'Topping');
   data.addColumn('number', 'Slices');
  //  data.addRows([
  //    ['Rice', this.rice],
  //    ['Bread', 1],
  //    ['Sugar', 1],
  //    ['Meat', 1],
  //    ['Coke', 2],
  //    ['Juice', 2],
  //    ['Coffee', 1],
  //    ['Chicken', 1],
  //    ['Tea', 1],
  //    ['Fish', 3]
  //  ]);

  data.addRows(
    this.newItems
  );
   // Set chart options
   var options = {'title':' Grocery Item Total Overview ',
                  'width':350,
                  'height':350};

   // Instantiate and draw our chart, passing in some options.
   var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
   chart.draw(data, options);


 }

}
