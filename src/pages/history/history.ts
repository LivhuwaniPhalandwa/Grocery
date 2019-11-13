import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ToastController, ViewController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import {Storage} from '@ionic/storage'
import { ItemsProvider } from '../../providers/items/items';
import { DragulaModule, DragulaService } from 'ng2-dragula';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';
// import { File } from '@ionic-native/file/ngx';

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
   totals00=0;
   total=0
   q5;
  //  pet='drags';
  //  MyItems:[];
   docId
  q3=[];
 MyItems = [];
 newItems = []

 rice : number = 0;

  Items: any[];
v1;
  data(x,v)
  {


this.presentLoadingText(x,v)
  }

  presentLoadingText(x,v) {

    console.log(x[v]);

    this.q1.push(x[v]);
    //this.q1.push(x[0]);

    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...',
      duration: 1000
    });
    loading.present();

    loading.onDidDismiss(val=>{
      firebase.firestore().collection(this.items.usernumber+this.items.supermarket).add(x[v]);
      
      let toast = this.toastController.create({
        message: 'Item copied from saved list to your current list.',
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      
    })
  }

item1:any;

toast()
{
  let alert = this.alertCtrl.create({
    title: 'To add item ',
    subTitle: 'Press and hold an item to move it to the shopping list.',
    buttons: ['Ok']
  });
  alert.present();

}
//   let toast = this.toastController.create({
//     message: "Long press an item, then release to remove it from the list.",
//     duration: 3000,
//     position: 'bottom'
//   });
//   toast.present();
// }

text:"";
Message:"";

  constructor(private alertCtrl:AlertController ,public loadingCtrl:LoadingController,public vw:ViewController,public items:ItemsProvider,private dragulaService: DragulaService, public navCtrl: NavController, public navParams: NavParams,private toastController: ToastController,public storage:Storage) {
    this.saveDataa()
    
    firebase.firestore().collection("Saved").where("phone","==",this.items.usernumber).get().then(val=>{
val.forEach(res=>{

  this.q2.push(res.data());
  console.log("Quadrant 2 = ",this.q2);
  console.log(res.data())
})

    })
    

    
    this.dragulaService.drag('oop')
    .subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'danger');
      console.log(name )
      console.log("look here1")

      


      let toast = this.toastController.create({
        message: 'Wrong selection',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    });
    
    
    
    console.log(this.v1)
    
    this.dragulaService.drag('bag')
    .subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'danger');
      console.log(name,source )
      console.log("look here1")

    });
 
  


    this.dragulaService.createGroup('bag', {
      removeOnSpill: true,
     
      
    });


    this.dragulaService.removeModel('bag')
    .subscribe(({ item }) => {

      console.log('look',item )

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

this.database.collection(this.items.usernumber+'Other').get().then(doc => {
  this.Items = []
     doc.forEach(item => {
     var cost =0;
     cost =parseFloat(item.data().totalPrice);

       this.totals00 = this.totals00 +cost;
      console.log(this.totals00)
       
     })
     
     console.log('Finals7' ,this.totals00)
})





  }



  ionViewDidLeave()
  {
    this.dragulaService.destroy('bag');
    console.log("He left")
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
 
 showChart(){

this.MyItems.forEach(data => {


})




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
   
 
 

ionViewDidEnter()
{
  this.q1 =[];
  firebase.firestore().collection(this.items.usernumber+this.items.supermarket).get().then(val=>{
    val.forEach(res=>{
      console.log(res.data());
      this.q1.push(res.data());
    })
  })
}




  addTodo(x) {
  console.log(x);
    this.q3.push(x);
    
  }

close()
{
  this.vw.dismiss();
}


}
























