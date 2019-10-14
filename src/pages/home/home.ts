import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController, Popover, PopoverController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { LoadingController, MenuController } from 'ionic-angular';
import * as firebase from 'firebase';
import { CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileComponent } from '../../components/profile/profile';


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

amount;
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

   
  docId : string;

  myObjec: any;

  Picture: string;

  MyValue : boolean;
  MyValue1 : boolean;
  
  update = false;

 constructor(public navCtrl: NavController, public menuCtrl: MenuController,private toastCtrl: ToastController,formBuilder: FormBuilder,public forms: FormBuilder,public navParams: NavParams, public alertCtrl: AlertController, private camera: Camera, public loadingCtrl: LoadingController) {
  this.itemForm = this.forms.group({ 
  name: new FormControl('', Validators.compose([Validators.required])),
  quantity: new FormControl('', Validators.compose([Validators.required])),
   price: new FormControl('', Validators.compose([Validators.required]))
    })
  }

 expandDiv(){
  this.item.name = ''
  this.item.price = ''
  this.item.quantity = 1
  this.item.image = ''
  this.CheckData();
  this.toggle = !this.toggle;
 }
 ionViewDidLoad(){
   this.pullData();
 
  }
  
  checkboxClick(item, isChecked:boolean){
    
    if(isChecked){
      item.total=!this.total;
    }else{
    this.total =this.total-item.doc.price
    }
  }
 addData(){
   console.log()
   this.total = 0
   this.Items = []
    this.item.totalPrice =this.item.price*this.item.quantity
  // totAmount = totAmount+this.item.totalPrice,
  this.database.collection("Item").doc().set(this.item).then(res => {
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
  

deleteData(docid, item) {
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
          console.log('Saved clicked', item.doc.price);
          this.database.collection("Item").doc(docid).delete();
          this.total = this.total - item.doc.price;
          this.Items = [];
        //  this.pullData();
        // window.location.reload();
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
        }
      }
    ]
  });
  prompt.present();
}
CheckData(){
  if(this.item.name === ''){
    console.log("Data is empty");
    this.MyValue = true;
    
  }else{
    // this.item.totalPrice=document.doc.price*document.doc.quantity
    
  }
}

expandDiv1(i){
  this.myObjec = i;
 this.toggle = !this.toggle;
 console.log("This is your item ",  this.myObjec);

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
          //  this.pullData();   
            }
}

edit(document) {
  this.item.name = document.doc.name
   this.item.price = document.doc.price
   this.item.quantity = document.doc.quantity
   this.item.image = document.doc.image
   this.docId = document.docid
   
   console.log(document);
   this.toggle = !this.toggle;

   this.CheckData();
}

}
