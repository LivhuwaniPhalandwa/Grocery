 
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
  total=0
  amt:number
  Picture_url: string;
  item = {
   name:'',
   price:null,
   quantity:1,
   image: '',
   totalPrice:0,
  }


  // quantity : number = 1;

  // Myitem = {
  //   name:'',
  //   price:null,
  //   quantity: this.quantity,
  //   image: '',
  //   totalPrice:0,
  //  }

   

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


   CheckData(){
     if(this.item.name === ''){
       console.log("Data is empty");
       this.MyValue = true;
       
     }else{
       console.log("Data is not empty");
       this.MyValue = false;
     }
   }

   expandDiv1(i){
     this.myObjec = i;
    this.toggle = !this.toggle;
    console.log("This is your item ",  this.myObjec);
   
   }




   ionViewDidLoad(){
     this.pullData();
   }

   addData(){
     console.log("Take data to database");
     
    let totAmount=0;
    this.item.totalPrice=this.item.price*this.item.quantity,
    // totAmount = totAmount+this.item.totalPrice,
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

    this.item.image = '';
    this.item.name = '';
    this.item.price = '';
    this.item.quantity = 1;
    this.Items=[];

  }


  addData1(data){
    console.log(data, 'Update data');
    
    if (data.name !== undefined && data.name !== null) {
                this.database.collection('Item').doc(this.docId).update({
                   name:data.name ,
                   price:data.price ,
                   quantity:data.quantity,
                   image:data.image
                });
                this. expandDiv()
                this.Items=[];
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
          text: 'Delete',
          handler: data => {
            console.log('Saved clicked');
            this.database.collection("Item").doc(docid).delete();
            this.Items = [];
             this.pullData()
          }
        }
      ]
    });
    prompt.present();
  
   
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
  }
  
  
    
  