import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import * as firebase from 'firebase';
import {Storage} from '@ionic/storage'
import { ItemsProvider } from '../../providers/items/items';
import { DragulaModule, DragulaService } from 'ng2-dragula';

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
   totals=0;
   totals1=0;
   totals2=0;
   totals3=0;
   totals4=0;
   totals5=0;
   totals6=0;
   total7=0;
   totals8=0;
   totals9=0
   totals10=0;
   total=0
  //  MyItems:[];
   docId
  
 MyItems = [];
 newItems = []

 rice : number = 0;

  Items: any[];
  constructor(public vw:ViewController,public items:ItemsProvider,private dragulaService: DragulaService, public navCtrl: NavController, public navParams: NavParams,private toastController: ToastController,public storage:Storage) {
    this.saveDataa()
    

    
    firebase.firestore().collection(this.items.usernumber+this.items.supermarket).onSnapshot(data => {
      data.forEach(item => {
        console.log("This is your data", item.data());
        this.q1.push(item.data());
        
      })
     
    })


   
    firebase.firestore().collection("Saved").where("phone","==",this.items.usernumber).get().then(val=>{
val.forEach(res=>{

  this.q2.push(res.data());
  console.log("Quadrant 2 = ",this.q2);
  console.log(res.data())
})

    })
    
    
    
    
    
    
    
    
    
    this.dragulaService.drag('bag')
    .subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'danger');
      console.log(name )
      console.log("look here1")
    });
 
    this.dragulaService.removeModel('bag')
    .subscribe(({ item }) => {

      console.log(item )



   firebase.firestore().collection(this.items.usernumber).add(item).then(val=>
        {
          console.log("added")

          let toast = this.toastController.create({
            message: 'Item moved from saved list to your current list.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })
        
     
    });
 
    this.dragulaService.dropModel('bag')
      .subscribe(({ item }) => {
        item['color'] = 'success';
      });
      console.log("look here3")
    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });

    this.database.collection(this.items.usernumber+'Shoprite').get().then(doc => {
      this.Items = []
         doc.forEach(item => {
         var cost =0;
         cost =parseFloat(item.data().totalPrice);

           this.totals = this.totals +cost;
          console.log(this.totals)
           
         })
         
         console.log('Finals' ,this.totals)
  })

  this.database.collection(this.items.usernumber+'Pick n Pay').get().then(doc => {
    this.Items = []
       doc.forEach(item => {
       var cost =0;
       cost =parseFloat(item.data().totalPrice);

         this.totals1 = this.totals1 +cost;
        console.log(this.totals1)
         
       })
       
       console.log('Finals1' ,this.totals1)
})


this.database.collection(this.items.usernumber+'Checkers').get().then(doc => {
  this.Items = []
     doc.forEach(item => {
     var cost =0;
     cost =parseFloat(item.data().totalPrice);

       this.totals2 = this.totals2 +cost;
      console.log(this.totals2)
       
     })
     
     console.log('Finals2' ,this.totals2)
})


this.database.collection(this.items.usernumber+'Game').get().then(doc => {
  this.Items = []
     doc.forEach(item => {
     var cost =0;
     cost =parseFloat(item.data().totalPrice);

       this.totals3 = this.totals3 +cost;
      console.log(this.totals3)
       
     })
     
     console.log('Finals3' ,this.totals3)
})


this.database.collection(this.items.usernumber+'Spar').get().then(doc => {
  this.Items = []
     doc.forEach(item => {
     var cost =0;
     cost =parseFloat(item.data().totalPrice);

       this.totals4 = this.totals4 +cost;
      console.log(this.totals4)
       
     })
     
     console.log('Finals4' ,this.totals4)
})


this.database.collection(this.items.usernumber+'Cambridge').get().then(doc => {
  this.Items = []
     doc.forEach(item => {
     var cost =0;
     cost =parseFloat(item.data().totalPrice);

       this.totals5 = this.totals5 +cost;
      console.log(this.totals5)
       
     })
     
     console.log('Finals5' ,this.totals5)
})


this.database.collection(this.items.usernumber+'Cambridge').get().then(doc => {
  this.Items = []
     doc.forEach(item => {
     var cost =0;
     cost =parseFloat(item.data().totalPrice);

       this.totals6 = this.totals6 +cost;
      console.log(this.totals6)
       
     })
     
     console.log('Finals6' ,this.totals6)
})






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
  this.database.collection(this.items.usernumber+this.items.supermarket).where('saved', '==', true) .onSnapshot(data => {
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















q1 = [];
  q2 = [];
   
 
 


  todo = { value: '', color: '' };
  selectedQuadrant = 'q1';



  addTodo() {
    switch (this.selectedQuadrant) {
      case 'q1':
        this.todo.color = 'primary';
        break;
      case 'q2':
        this.todo.color = 'secondary';
        break;
      case 'q3':
        this.todo.color = 'tertiary';
        break;
      case 'q4':
        this.todo.color = 'warning';
        break;
    }
    this[this.selectedQuadrant].push(this.todo);
    this.todo = { value: '', color: '' };
  }

close()
{
  this.vw.dismiss();
}



























}