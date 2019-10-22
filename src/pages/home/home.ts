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
import { HistoryPage } from '../history/history';
import { SuccessPage } from '../success/success';
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
MyItems = [];
total=0
amt:number
checked:boolean

////////////////////////////////////////////////////////////




Item = [
  { "itemname": "Milk",  "image":"../../assets/imgs/clover-milk-full-cream-1-litre.jpg"},
  { "itemname": "Maize meal",  "image":"../../assets/imgs/maize meal.jpg"},
  { "itemname": "Brown bread", "image": "../../assets/imgs/brown bread.jpg"},
  { "itemname": "Sunlight-Liquid", "image": "../../assets/imgs/Sunlight-Liquid.png"},
  { "itemname": "Rice",  "image": "../../assets/imgs/rice.jpg"},
  { "itemname": "Protex Soap", "image": "../../assets/imgs/protex soap.jpg"},
  { "itemname": "selati sugar", "image": "../../assets/imgs/selati sugar.jpg"},
  {"itemname": "Twinsaver tissue", "image":"../../assets/imgs/Twinsaver tissue.jpg"},
  { "itemname": "Colgate", "image": "../../assets/imgs/colgate.jpg"},
  { "itemname": "Nivea body lotion", "image": "../../assets/imgs/nivea body lotion.jpg"},
  { "itemname": "koo beans", "image": "../../assets/imgs/koo beans.jpg"},
  { "itemname": "Salt", "image": "../../assets/imgs/salt.jpg"},
  {"itemname": "Always pads","image": "../../assets/imgs/always pads.jpg"},
  {"itemname": "Parmalat cheese", "image": "../../assets/imgs/parmalat cheese.jpg"},
  {"itemname": "kellogs cornflakes", "image": "../../assets/kellogs cornflakes.jpg"},
  {"itemname": "jungle oats.jpg", "image": "../../assets/imgs/jungle oats.jpg"},
  {"itemname": "Eggs", "image": "../../assets/imgs/eggs.jpg"},
  { "itemname": "Freshpack","image": "../../assets/imgs/Freshpak (1).jpg"},
  { "itemname": "Goldi braaipack", "image": "../../assets/imgs/goldi braaipack.jpg"},
  { "itemname": "washing powder", "image": "../../assets/imgs/washing powder.jpg"},
  { "itemname": "Beef meat", "image": "../../assets/imgs/beef meat.jpeg"},
  { "itemname": "Nola mayonaise", "image": "../../assets/imgs/nola mayonaise.jpg"}

]


/////////////////////////////////////////////////

loaderAnimate = true
item = {
 name:'',
 price:null,
 quantity: 1,
 image: '',
 totalPrice:0,
 saved: false
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
  MyArray= [];
  MyItem="Milk";
 constructor(public toastController: ToastController,public navCtrl: NavController, public menuCtrl: MenuController,private toastCtrl: ToastController,formBuilder: FormBuilder,public forms: FormBuilder,public navParams: NavParams, public alertCtrl: AlertController, private camera: Camera, public loadingCtrl: LoadingController,private popoverCtrl: PopoverController,private statusbar: StatusBar)
 
  {

setTimeout(()=>{
this.loaderAnimate = false;
},2000)

   

    
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
   console.log();
   
 }

 addData(itemForm){
  
  console.log(itemForm.value.name.toUpperCase());

  for(var r = 0;r<this.Item.length;r++)
  {
  
  
    console.log("matched",this.Item[r].itemname.toUpperCase().search(itemForm.value.name.toUpperCase()))
    console.log("Look =",this.Item[r].itemname)
    if(this.Item[r].itemname.toUpperCase().search(itemForm.value.name.toUpperCase())>=0){

     

      console.log("My item just matched",this.Item[r].image);
      this.item.image = this.Item[r].image;
      
  
    }else{
      console.log("Item not found");

    }
  }





  if (itemForm.valid) {
  this.total=0
  this.Items = [] 
  this.item.totalPrice =this.item.price*this.item.quantity,
  this.database.collection("Item").doc().set(this.item).then(res => {
    this.item={name:'',
    price:null,
    quantity: 1,
    saved: false,
    image: '',
    totalPrice:0,}
    this.navCtrl.setRoot(SuccessPage);
 
/* LOADER  */
    setTimeout(()=>{
      this.loaderAnimate = false;
      },5000)

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
  this.loaderAnimate = true;
  }
  else{

    const prompt = this.alertCtrl.create({
      title: '',
      message: "Please insert following item details!",
  
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        // {
        //   text: 'Delete',
        //   handler: data => {
          
        //   }
        // }
      ]
    });
    prompt.present();

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
  
  this.item.image = '' 
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

togohistory(){
  this.navCtrl.push(HistoryPage)
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


saveData(obj){

  







  this.database.collection('Item').doc(obj.docid).update(
    {saved: true}
    ).then(res => {
      console.log('Document updated');
      
    }).catch(err =>{
      console.log('An error occuerd', err);
      
    })
  console.log(obj);
  
  const prompt = this.alertCtrl.create({
    title: 'Item saved!',
    message: "Would you like to view the saved items list?",
    buttons: [
      {
        text: 'No',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Yes',
        handler: data => {
          console.log('Saved clicked');
          this.navCtrl.push(HistoryPage);
        }
      }
    ]
  });
  prompt.present();



  }


check(item){
  if(item.checked==true){
    console.log("Am checked")

  }else{
    console.log("Am not checked")
  }
}





}
