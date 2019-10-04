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
 toggle: boolean;
Storage =firebase.storage;
itemForm: FormGroup;
database=firebase.firestore();
Items=[];
total = 0
amt : number
Picture_url: string;
item = {
 name:'',
 price:null,
 quantity:1,
 image: '',
 totalPrice:0,
 totalAmount:null,
}
Picture: string;
 
 
 formlogin : FormGroup;

 constructor(public navCtrl: NavController, public formBuilder : FormBuilder, private toastCtrl: ToastController,public navParams: NavParams, public alertCtrl: AlertController, private camera: Camera, public loadingCtrl: LoadingController) {
  this.formlogin = formBuilder.group({
    name : new FormControl('', Validators.compose([
        Validators.required
    ])),        
    price : new FormControl('', Validators.compose([
         Validators.required
    ]))
});
}
 expandDiv(){
  this.toggle = !this.toggle;
 }
 ionViewDidLoad(){
   this.pullData();
 }
 addData(){
 
  this.item.totalPrice=this.item.price*this.item.quantity,
  // this.item.totalAmount = this.item.totalAmount+this.item.totalPrice,
  this.doValidate();
  this.database.collection("Item").doc().set(this.item).then(res => {
    this.toastCtrl.create({
      message: 'Item added',
      duration: 2000

    }).present()
    this.Items = []
    this.pullData();
  }).catch(err => {
    this.toastCtrl.create({
      message: 'Error adding item',
      duration: 2000
    }).present()
  })
}
ngOnInit() { }
doValidate(){
  let me = this;    
        if(me.formlogin.valid){
          // alert('form is valid');
        } else {
          alert('empty fields');
        }    
}
  incrementQ(){
    this.item.quantity = this.item.quantity + 1
  }
  decrementQ(){
    this.item.quantity = this.item.quantity - 1
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
    }).present();
  })
 
 }
 
 pullData(){
  let data = {
    docid: "",
    doc: {}
  }
  
   this.database.collection("Item").onSnapshot(doc => {
      this.Items = [];
         doc.forEach(item => {
           data.docid = item.id
           data.doc = item.data();
           this.Items.push(item);
           this.total += Number(item.data().totalPrice);
           data = {
            docid: "",
            doc: {}
          }

           
         })
this.amt = this.total
         console.log(this.amt)
  })
 
}
// pullData(){
//   this.database.collection("Item").onSnapshot(doc => {
//     doc.forEach(item => {
//      this.Items.push(item.data());
//      console.log(this.Items);
     
//       // this.Items = []
//       // this.Items.push(item.data);
//     /*   this.database.collection('').doc(item.id) */
//     })
//   })
// }
deleteData(docid){
  console.log(docid)
   this.database.collection("Item").doc(docid).delete();
  this.Items = []
   this.pullData()
}

 
 }

