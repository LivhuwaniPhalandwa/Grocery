import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { LoadingController ,MenuController} from 'ionic-angular';
import * as firebase from 'firebase';
import { CameraOptions } from '@ionic-native/camera';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
 selector: 'page-home',
 templateUrl: 'home.html'
})
export class HomePage {
 toggle: boolean=true;
Storage =firebase.storage;
itemForm: FormGroup;
database=firebase.firestore();
Items=[];
total=0
amt:number


item = {
 name:'',
 price:null,
 quantity:1,
 image: '',
 totalPrice:0,
}
  validation_messages = {
    'name': [
      {type: 'required', message: 'name  is required.'},
      
    ],
    'price': [
      {type: 'required', message: 'price  is required.'},
     
   ]
   }

 constructor(public navCtrl: NavController, public menuCtrl: MenuController,private toastCtrl: ToastController,formBuilder: FormBuilder,public forms: FormBuilder,public navParams: NavParams, public alertCtrl: AlertController, private camera: Camera, public loadingCtrl: LoadingController) {
  this.itemForm = this.forms.group({ 
  name: new FormControl('', Validators.compose([Validators.required])),
  quantity: new FormControl('', Validators.compose([Validators.required])),
   price: new FormControl('', Validators.compose([Validators.required]))
    })
}

 expandDiv(){
  this.toggle = !this.toggle;
 }
 ionViewDidLoad(){
   this.pullData();
 }
 addData(item){
  if (item !== undefined || item!== null) {
  let totAmount=0;
  this.item.totalPrice=this.item.price*this.item.quantity,
  this.database.collection("Item").doc().set(this.item).then(res => {
    this.toastCtrl.create({
      message: 'Item added',
      duration: 2000

    }).present()
    this.Items = []
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
  incrementQ(){
    this.item.quantity = this.item.quantity + 1
  }
  decrementQ(){
    if(this.item.quantity>1){
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
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.item.image= 'data:image/jpeg;base64,' + picture;
     this.itemForm.reset();
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
    console.log('image uploaded');
    this.item.image = snapshot.downloadURL;
    let alert = this.alertCtrl.create({
      title: 'Image Upload',
      subTitle: 'Image Uploaded to firebase',
      buttons: ['Ok']
      
    }).present()
  
  }).catch(err => {
    this.toastCtrl.create({
      message: 'Error uploading image',
      duration: 2000
    }).present()
  })
}

 
 pullData(){
  let data = {
    docid: "",
    doc: {}
  }
  
   this.database.collection("Item").onSnapshot(doc => {
      this.Items = []
         doc.forEach(item => {
           data.docid = item.id
           data.doc = item.data();
           this.Items.push(data);
           this.total +=Number(item.data().totalPrice);
           data = {
            docid: "",
            doc: {}
          }

           
         })
         this.amt=this.total
         console.log(this.amt)
  })
 
}

deleteData(docid){
  console.log(docid)
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
        text: 'Del',
        handler: data => {
          console.log('Saved clicked');
          this.database.collection("Item").doc(docid).delete();
          this.Items = []
           this.pullData()
        }
      }
    ]
  });
  prompt.present();

 
}

edit(document) {
  this.item.name = document.doc.name
  this.item.price = document.doc.price
  this.item.quantity = document.doc.quantity
  this.item.image = document.doc.image
  console.log(document);
  const alert = this.alertCtrl.create({
    title: 'Edit Item',
    inputs: [
      {
        name: 'name',
        placeholder: 'Enter your name',
        value: document.doc.name
      },
      {
        name: 'price',
        placeholder: 'Enter your name',
        value: document.doc.price
      },
      {
        name: 'quantity',
        placeholder: 'Enter your name',
        value: document.doc.quantity ,
      
      }
    ],
    buttons: [
      {
        text: 'cancel',
      },
      {
        text: 'update',
        handler: data => {
          if (data.name !== undefined && data.name !== null) {
            this.database.collection('Item').doc(document.docid).update({
               name:data.name ,
               price:data.price ,
               quantity:data.quantity
            });
          }
        }
      }
    ]
  });
  alert.present();
}


onSubmit() {
  if (this.itemForm.valid) {
    console.log("Form Submitted!");
    this.itemForm.reset();
  }
}
}

