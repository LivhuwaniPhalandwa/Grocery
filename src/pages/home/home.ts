import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { CameraOptions } from '@ionic-native/camera';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  toggle: boolean;
 Storage =firebase.storage;
 database=firebase.firestore();
 Items=[];

 item = {
  name:"",
  price:null,
  quantity:0,
  
 }
  
 
 Picture: string;
  Picture_url: string;
 
  
  constructor(public navCtrl: NavController, private toastCtrl: ToastController,public navParams: NavParams, public alertCtrl: AlertController, private camera: Camera, public loadingCtrl: LoadingController) {
    
  }
  addData(){
    this.database.collection("Item").doc().set(this.item).then(res => {
      this.toastCtrl.create({
        message: 'Item added',
        duration: 2000
      }).present()
    }).catch(err => {
      this.toastCtrl.create({
        message: 'Error adding item',
        duration: 2000
      }).present()
    })
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
     this.Picture = 'data:image/jpeg;base64,' + picture;
     console.log('IMG: ',this.Picture);
    }, (err) => {
      console.log('error: ', err);
     // Handle error
    });
  
  let storageRef = firebase.storage().ref();
  const filename = Math.floor(Date.now() / 1000);
  let file = 'my-hotel/'+filename+'.jpg';
  const imageRef = storageRef.child(file);
  imageRef.putString(this.Picture, firebase.storage.StringFormat.DATA_URL)
  .then((snapshot) => {
    console.log('image uploaded');
    this.Picture_url = snapshot.downloadURL;
    let alert = this.alertCtrl.create({
      title: 'Image Upload', 
      subTitle: 'Image Uploaded to firebase',
      buttons: ['Ok']
    }).present();
  })

}  
 
 
}



