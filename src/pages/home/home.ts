import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ToastController, Popover, PopoverController, ModalController } from 'ionic-angular';
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
import { ItemsProvider } from '../../providers/items/items';
import { DragulaService } from 'ng2-dragula';
import { DreggerPage } from '../dregger/dregger';


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
total=0;
amt:number;
checked:boolean;
q1 = [];
  q2 = [];

////////////////////////////////////////////////////////////




Item = [
  { "itemname": "Fresh Milk",  "image":"../../assets/imgs/clover-milk-full-cream-1-litre.jpg"},
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
  { "itemname": "Nola mayonaise", "image": "../../assets/imgs/nola mayonaise.jpg"},
  { "itemname": "Six clover milk",  "image": "../../assets/imgs/6clover.jpg"},
  { "itemname": "CrystalValley",  "image": "../../assets/imgs/crystalvalley.png"},
  { "itemname": "Excella cookingoil",  "image": "../..assets/imgs/excell.jpg"},
  { "itemname": "Frisco",  "image": "../../assets/imgs/frisco.jpg"}, 
  { "itemname": "HandyAndy",  "image": "../../assets/imgs/handyandy.jpg"},
  { "itemname": "Nutriday Yoghurt",  "image": "../../assets/imgs/nutriday yoghurt.jpg"},
  { "itemname": "Nan2",  "image": "../../assets/imgs/nan2.jpg"},
  { "itemname": "Numel",  "image": "../../assets/imgs/Numel.png"},
  { "itemname": "Oros",  "image": "../../assets/imgs/oros-2l.jpg"},
  { "itemname": "Pampers",  "image": "../../assets/imgs/pampers.jpg"},
  { "itemname": "Rajah",  "image": "../../assets/imgs/rajah.jpg"},
  { "itemname": "Ricofy",  "image": "../../assets/imgs/ricofy.jpg"},
  { "itemname": "Vaseline",  "image": "../../assets/imgs/vaseline.jpg"},
  { "itemname": "7up",  "image": "../../assets/imgs/7up.png"},
  { "itemname": "Amasi",  "image": "../../assets/imgs/amasi.jpg"},
  { "itemname": "Coke 2l",  "image": "../../assets/imgs/Coke_2L_final__18488.1525935011.jpg"},
  { "itemname": "Golden cloud flour",  "image": "../../assets/imgs/golden cloud flour.jpg"},
  { "itemname": "Halls",  "image": "../../assets/imgs/halls.jpg"},
  { "itemname": "Liqui fruit",  "image": "../../assets/imgs/Liqui-Fruit-100-Fruit-Juice-Blend-Asstd.-1-Litre-EACH.jpg"},
  { "itemname": "Ponds",  "image": "../../assets/imgs/ponds.jpg"},
  { "itemname": "Pentyliners",  "image": "../../assets/imgs/pentiliners.jpg"},
  { "itemname": "Cremora",  "image": "../../assets/imgs/Cremora Original Coffee Creamer 800g.png"},
  { "itemname": "Aromat",  "image": "../../assets/imgs/Aromat Chilli Beef Seasoning 75g.png"},
  { "itemname": "Fatti's & Moni's",  "image": "../../assets/imgs/Fatti's & Moni's Large Pasta Shells 500g.png"},
  { "itemname": "Jacobs",  "image": "../../assets/imgs/Jacobs Krönung Instant Coffee 200g.png"},
  { "itemname": "Lucky star",  "image": "../../assets/imgs/Lucky Star Pilchards In Tomato Sauce 215g.png"},
  { "itemname": "Nescafe gold",  "image": "../../assets/imgs/Nescafé Gold Instant Coffee 200g.png"},
  { "itemname": "Weetbix",  "image": "../../assets/imgs/weetbix.jpg"},
  { "itemname": "Sunlight soap",  "image": "../../assets/imgs/sunlight-soap.jpg"},
  { "itemname": "Knorr soup",  "image": "../../assets/imgs/Knorr Tomato Base Cook-In-Sauce 48g.png"},
  { "itemname": "Boerewors",  "image": "../../assets/imgs/Bushveld's Finest Venison Boerewors Per kg.png"},
  { "itemname": "Apples",  "image": "../../assets/imgs/Apples.webp"},
  { "itemname": "Beetroot",  "image": "../../assets/imgs/beetroot.jpg"},
  { "itemname": "Banana",  "image": "../../assets/imgs/banana.jpg"},
  { "itemname": "Cabbage",  "image": "../../assets/imgs/cabbage.jpg"},
  { "itemname": "Carrots",  "image": "../../assets/imgs/carrots.jpg"},
  { "itemname": "Ice cream",  "image": "../../assets/imgs/country fresh ice cream.jpg"},
  { "itemname": "Cucumber",  "image": "../../assets/imgs/cucumber.jpg"}, 
  { "itemname": "Hake fish",  "image": "../../assets/imgs/hakes fish.jpg"},
  { "itemname": "Jam",  "image": "../../assets/imgs/jam.jpg"},
  { "itemname": "Johnson wipes",  "image": "../../assets/imgs/Johnson wipes.jpg"},
  { "itemname": "Lamb",  "image": "../../assets/imgs/lamb.jpg"},
  { "itemname": "Lettuce",  "image": "../../assets/imgs/lettuce.jpg"},
  { "itemname": "Danone",  "image": "../../assets/imgs/danone.png"},
  { "itemname": "Doritos",  "image": "../../assets/imgs/doritos.jpg"},
  { "itemname": "Flora-margarine",  "image": "../../assets/imgs/Flora-Margarine-500g_512x.jpg"},
  { "itemname": "Niknaks",  "image": "../../assets/imgs/niknaks.jpg"},
  { "itemname": "Pork",  "image": "../../assets/imgs/pork meat.jpg"},
  { "itemname": "Rama",  "image": "../../assets/imgs/Rama margarine.jpg"},
  { "itemname": "Roll on",  "image": "../../assets/imgs/roll on.jpg"},
  { "itemname": "Simba",  "image": "../../assets/imgs/simba.jpg"},
  { "itemname": "Black cat butter",  "image": "../../assets/imgs/black cat butter.jpg"},
  { "itemname": "White sugar",  "image": "../../assets/imgs/white sugar.jpg"},
  { "itemname": "Ultramel custard",  "image": "../../assets/imgs/ultramel custard.jpg"},
  { "itemname": "Trotters jelly",  "image": "../../assets/imgs/trotters jelly.jpg"},
  { "itemname": "Lasagne",  "image": "../../assets/imgs/lasagne.jpg"}

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

budget =this.items.budget;
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





  ionViewWillLoad()
{
  
  }

 




 constructor(public modalCtrl: ModalController,private dragulaService: DragulaService,public items:ItemsProvider,public toastController: ToastController,public navCtrl: NavController, public menuCtrl: MenuController,private toastCtrl: ToastController,formBuilder: FormBuilder,public forms: FormBuilder,public navParams: NavParams, public alertCtrl: AlertController, private camera: Camera, public loadingCtrl: LoadingController,private popoverCtrl: PopoverController,private statusbar: StatusBar)
 
  {

////////////////////////////////////////////























    ////////////////////////////////////////////////////////

setTimeout(()=>{
this.loaderAnimate = false;
},2000)

   

    
    this.statusbar.backgroundColorByHexString('#3657AF');
  this.itemForm = this.forms.group({ 
  name: new FormControl('', Validators.compose([Validators.required])),
   price: new FormControl('', Validators.compose([Validators.required])),
    });

   
  }

ionViewWillEnter()
{
  this.MyItems =[];
  console.log("yyyyyyyyyyyyyyyyyyyy")
  this.database.collection(this.items.usernumber+this.items.supermarket).onSnapshot(data => {
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

  this.num =1;
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
  this.database.collection(this.items.usernumber+this.items.supermarket).doc().set(this.item).then(res => {
    this.item={name:'',
    price:'',
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
              this.database.collection(this.items.usernumber+this.items.supermarket).doc(this.docId).update({
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

num:number =0;
val:number =0;
  incrementQ(x){
    this.num =this.num+1;
  console.log(this.num);
  this.item.quantity =this.num

  }
  decrementQ(x) {
    if(this.num>1)
    {
    this.num = this.num -1;
    console.log(this.num)
  this.item.quantity =this.num; 
  }

  }
  takePicture(sourcetype: number) {
    
    console.log(';;;;;;;;;');

    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: sourcetype,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 600,
      targetWidth: 600
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
  const imageRef =storageRef.child(file).putString(this.item.image, firebase.storage.StringFormat.DATA_URL)
    imageRef.on('state_changed', snap => {
      this.item.image = 'Uploading '+(snap.bytesTransferred / snap.totalBytes) * 100+'%'
    }, err=> {
      switch (err.name) {
        case 'storage/unauthorized':
          this.item.image = "User doesn't have permission to access the object"
          break;
    
        case 'storage/canceled':
          this.item.image = "User canceled the upload"
          break;
    
        case 'storage/unknown':
          this.item.image = "Unknown error occurred, Please try again"
          break;
      }
    }, () => {
      imageRef.snapshot.ref.getDownloadURL().then(downUrl => {
        this.item.image = downUrl;
      })
    })
  // .then((snapshot) => {
  //   this.item.image = '';
  //   console.log('image uploaded');
  //   this.item.image = snapshot.downloadURL;
  //   let alert = this.alertCtrl.create({
  //     title: 'Image Upload',
  //     subTitle: 'Image Uploaded to firebase',
  //     buttons: ['Ok']
     
  //   }).present()

  // })
  
  this.item.image = '' 
}


  pullData() {
    let data = {
      docid: "",
      doc: {}
    }

    
   this.database.collection(this.items.usernumber+this.items.supermarket).get().then(doc => {
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


  firebase.firestore().collection("CustomerBudget").doc(this.items.usernumber).get().then(val=>{
    console.log("Budget = ",val.data().budget)
    this.items.budget = val.data().budget;
console.log(parseFloat(val.data().budget)<parseFloat(this.total.toString()))


    if(parseFloat(val.data().budget)<parseFloat(this.total.toString()))
    {
      let alert = this.alertCtrl.create({
        title: 'Budget Exceeded!',
        subTitle: 'The current budget you entered has been exceeded. Would you like to increase your budget? ',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Yes',
            handler: data => {
          

             this.newbudgettoast();

            }
          }
        ]
      });
   alert.present();

    }
  }
  
    )
   


}


newbudgettoast()
{

  let alert = this.alertCtrl.create({
    title: 'Customer Budget',
    inputs: [
      {
        name: 'title',
        placeholder: 'Enter your new budget? ',
        type:"string"
      }],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },

      {
        text: 'Save',
        handler: (name) => {
          console.log('Buy clicked = ',name.title );
    
          firebase.firestore().collection("CustomerBudget").doc(this.items.usernumber).set({budget:name.title});

          firebase.firestore().collection("CustomerBudget").doc(this.items.usernumber).get().then(val=>{
            console.log("Budget = ",val.data().budget)
            this.items.budget = val.data().budget;
            this.budget = this.items.budget ;
        console.log(parseFloat(val.data().budget)<parseFloat(this.total.toString()))
      
          })
      
        }
      }
    ]
  });
  alert.present(); 
}














togohistory(){
  let profileModal = this.modalCtrl.create(HistoryPage);
  profileModal.onDidDismiss(val=>{
    this.navCtrl.push(HomePage);
  })
  profileModal.present();
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
          this.database.collection(this.items.usernumber+this.items.supermarket).doc(docid).delete();
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

object =[];
saveData(obj){

  


console.log(obj)
this.object.push({...{id:obj.docid,phone:this.items.usernumber},...obj.doc});

console.log(this.object[0])

 this.database.collection("Saved").add(this.object[0]).then(res=>{
   console.log("ADDED")
 })

  // this.database.collection(this.items.usernumber+this.items.supermarket).doc(obj.docid).update(
  //   {saved: true}
  //   ).then(res => {
  //     console.log('Document updated');
      
  //   }).catch(err =>{
  //     console.log('An error occuerd', err);
      
  //   })
  // console.log(obj);
  
  const prompt = this.alertCtrl.create({
    title: 'Save Item!',
    message: "Would you like to save item on the list?",
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



options()
{
  console.log("options");
  let alert = this.alertCtrl.create({
    message:"Budget: R"+this.items.budget,
    title: 'Select Supermarket',
    inputs: [
      {
        name: 'Shoprite',
        type: 'radio',
        value:'Shoprite',
        label: 'Shoprite',
      },
      {
        name: 'Pick n Pay',
        type: 'radio',
        value:'Pick n Pay',
        label: 'Pick n Pay',
      },
      {
        name: 'Checkers',
        type: 'radio',
        value:'Checkers',
        label:'Checkers'
      },
      {
        name: 'Game',
        type: 'radio',
        value:'Game',
        label:'Game'
      },
      {
        name: 'Spar',
        type: 'radio',
        value:'Spar',
        label:'Spar'
      },
      {
        name: 'Cambridge',
        type: 'radio',
        value:'Cambridge',
        label:'Cambridge'
      },
      {
        name: 'Boxer',
        type: 'radio',
        value:'Boxer',
        label:'Boxer'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      
        handler: data => {
  
  
          console.log('Cancel clicked',data);
          if(data ==undefined)
          {
  
          }
        }
      },
      {
        text: 'OK',
        handler: data => {
       
  console.log(data);
  
  
  this.items.supermarket =data;
  console.log(this.items.supermarket+this.items.usernumber)
  this.items.loaded(this.items.usernumber,this.items.supermarket);
  
   this.navCtrl.setRoot(HomePage, this.navParams.data);

  
        }
      }
    ]
  });
  alert.present();
}



// DropModal() {

//   console.log('Modal clicked');
//   let profileModal = this.modalCtrl.create(DreggerPage);
//   profileModal.onDidDismiss(res=>{

//     console.log("We Dismissed")
//   })
//   profileModal.present();



// }













}
