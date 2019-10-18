import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController, Popover, PopoverController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { LoadingController, MenuController } from 'ionic-angular';
import * as firebase from 'firebase';
import { CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileComponent } from '../../components/profile/profile';
import { Profile1Component } from '../../components/profile1/profile1';
import {StatusBar} from '@ionic-native/status-bar';
<<<<<<< HEAD
import { isCheckedProperty } from 'ionic-angular/umd/util/util';
=======
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { ItemsProvider } from '../../providers/items/items';



>>>>>>> 69eee41b51c7edab72e8bd175806bc2bf8e257ba
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  selectedAll: boolean = false;
 toggle: boolean=true;
Storage =firebase.storage;
itemForm: FormGroup;
database=firebase.firestore();
Items=[];
MyItems = [];
total=0
amt:number

<<<<<<< HEAD
amount;
=======


>>>>>>> 69eee41b51c7edab72e8bd175806bc2bf8e257ba
item = {
 name:'',
 price:null,
 quantity: 1,
 image: '',
 totalPrice:0,
}
docId:string;
  validation_messages = {
    'name': [
      {type: 'required', message: 'Name  is required.'},
      
    ],
    'price': [
      {type: 'required', message: 'Price  is required.'},
     
   ],
   'quantity': [
    {type: 'required', message: 'quantity  is required.'},
   ],
  
  }
  myObjec: any;
  Picture: string;
  MyValue : boolean;
  MyValue1 : boolean;

  update = false;
  productState: boolean;
  produto: any;
  itemname:string;
  image:string;


  MyItem : string = 'Freshpack';
  MyArray = [];

 constructor(public navCtrl: NavController,public items:ItemsProvider,public menuCtrl: MenuController,public http: Http,private toastCtrl: ToastController,formBuilder: FormBuilder,public forms: FormBuilder,public navParams: NavParams, public alertCtrl: AlertController, private camera: Camera, public loadingCtrl: LoadingController,private popoverCtrl: PopoverController,private statusbar: StatusBar)
  {
   this.itemname=this.navParams.get('itemname') ;
   this.itemname=this.navParams.get('image');
      this.items.getData().subscribe(data => {
        this.MyArray = data.Item;
        console.log("eeeeeeeee", this.MyArray);
      });
    this.CheckInArray();
  
    const loader = this.loadingCtrl.create({
      // spinner: 'hide',
      content: "Just a sec...",
      duration: 3000
    });
    loader.present();

    
    this.statusbar.backgroundColorByHexString('#3657AF');
  this.itemForm = this.forms.group({ 
  name: new FormControl('', Validators.compose([Validators.required])),
   price: new FormControl('', Validators.compose([Validators.required])),
    });

    this.database.collection("Item").onSnapshot(data => {
      data.forEach(item => {
        console.log("This is your data", item.data());
        this.MyItems.push(item.data())
        
      })
    })
    
  }
<<<<<<< HEAD
  
  check(event, item): void{
      let checked: boolean;
      if(checked==true){
        
        console.log("hahaha");
      // if (this.name !== undefined && this.name !== null) {
      //   this.database.collection('Item').doc().update({
      //      totalPrice:this.item.totalPrice,
      //      total:this.total - (this.item.totalPrice)
      //   })
      // }
    
    } else {
      console.log("krikrikri");
        // this.database.collection('Item').doc(this.docId).update({
        //   total: this.total - parseFloat(item.data().totalPrice),
          
    //     });
    //     this. expandDiv()
    //     this.Items=[];
    //     this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }
  
}
=======

  CheckInArray(){
    this.MyArray.forEach(item => {
      if(item.itemname === this.MyItem){
        console.log("My item just matched",item.image)
        
      }else{
        console.log("Item not found");
      }
    })
  }
>>>>>>> 69eee41b51c7edab72e8bd175806bc2bf8e257ba

  expandDiv(){
    this.item.name = ''
    this.item.price = ''
    this.item.quantity = 1
    this.item.image = ''
    this.CheckData();

    this.toggle = !this.toggle;
 }
 CheckData(){
  if(this.item.name === ''){
    console.log("Data is empty");
    this.MyValue = true;
    
  }else{
    console.log("Data is not empty");
    this.MyValue = false;
  }
}

 ionViewDidLoad(){
   this.pullData();
 
 }

 addData(itemForm){
  console.log(itemForm.valid);

  if (itemForm.valid) {
  this.total=0
  this.Items = [] 
  this.item.totalPrice =this.item.price*this.item.quantity,
  this.database.collection("Item").doc().set(this.item).then(res => {
    this.item={name:'',
    price:null,
    quantity: 1,
    image: '',
    totalPrice:0,}
    this.toastCtrl.create({
      message: 'Item added',
      duration: 2000

    }).present()
    this.pullData();
    this.itemForm.reset();
    this.item.image = '';
    this.toggle = !this.toggle;
    
  }).catch(err => {
    this.toastCtrl.create({
      message: 'Error adding item',
      duration: 2000
    }).present()
  })
  }
}
addData1(data){
  console.log(data, 'Update data');
  
  if (data.name !== undefined && data.name !== null) {
              this.database.collection('Item').doc(this.docId).update({
                 name:data.name ,
                 price:data.price ,
                 quantity:data.quantity,
                 image:data.image,
                 totalPrice:this.item.price*this.item.quantity,

              });
              this. expandDiv()
              this.Items=[];
              this.navCtrl.setRoot(this.navCtrl.getActive().component);
            }
}

  incrementQ(){
    this.item.quantity = this.item.quantity + 1
  }
  decrementQ() {
    if (this.item.quantity > 1) {
      this.item.quantity--;
    }
  }
  takePicture(sourcetype: number) {
    
    console.log(';;;;;;;;;');

    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: sourcetype,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 500,
      targetWidth: 500
    }
    this.camera.getPicture(options).then((picture) => {
     this.item.image= 'data:image/jpeg;base64,' + picture;
     
   //  this.itemForm.reset();
  /*    console.log('IMG: ',this.Picture); */
    }, (err) => {
      console.log('error: ', err);
      // Handle error
    });
 
  let storageRef = firebase.storage().ref();
  const filename = Math.floor(Date.now() / 1000);
  let file = 'my-hotel/'+filename+'.jpg';
  const imageRef =storageRef.child(file);
  imageRef.putString(this.item.image, firebase.storage.StringFormat.DATA_URL)
  .then((snapshot) => {
    this.item.image = '';
    console.log('image uploaded');
    this.item.image = snapshot.downloadURL;
    let alert = this.alertCtrl.create({
      title: 'Image Upload',
      subTitle: 'Image Uploaded to firebase',
      buttons: ['Ok']
     
    }).present()

  })
  
  
}
  pullData() {
    let data = {
      docid: "",
      doc: {}
    }
   this.database.collection("Item").get().then(doc => {
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



deleteData(docid ,item){
  console.log(item.doc.price)
  const prompt = this.alertCtrl.create({
    title: 'DELETE!',
    message: "Are you sure you want to delete this item?",

    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Delete',
        handler: data => {
          console.log('Saved clicked' ,item.doc.price);
          this.database.collection("Item").doc(docid).delete();
          this.total=this.total - item.doc.price
          this.Items = []
          // this.pullData();
          // window.location.reload();
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
          
        }
      }
    ]
  });
  prompt.present();
 
}


expandDiv1(i){
  this.myObjec = i;
 this.toggle = !this.toggle;
 console.log("This is your item ",  this.myObjec);

}



edit(document) {
  this.update = true;
  this.item.name = document.doc.name
  this.item.price = document.doc.price
  this.item.quantity = document.doc.quantity
  this.item.image = document.doc.image
  this.docId = document.docid
  console.log(document);
  this.toggle = !this.toggle;
  this.CheckData();
  
 

}

viewProfile(myEvent) {
  let popover = this.popoverCtrl.create(ProfileComponent, { image: myEvent });
  popover.present({
    ev: myEvent
  });

}
viewProfile1(myEvent) {
  let popover = this.popoverCtrl.create(Profile1Component, { image: myEvent });
  popover.present({
    ev: myEvent
  });
}

}