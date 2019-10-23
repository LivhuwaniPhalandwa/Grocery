import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import * as firebase from 'firebase';
import { ItemsProvider } from '../../providers/items/items';
/**
 * Generated class for the DreggerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dregger',
  templateUrl: 'dregger.html',
})
export class DreggerPage {
  q1 = [];
  q2 = [];
   
 
 
disable = true;

  todo = { value: '', color: '' };
  selectedQuadrant = 'q1';
  constructor(public vw:ViewController,public items:ItemsProvider,private dragulaService: DragulaService, public navCtrl: NavController, public navParams: NavParams,private toastController: ToastController) {
   

    firebase.firestore().collection('1234567890Shoprite').onSnapshot(data => {
      data.forEach(item => {

if(item==undefined)
{
 console.log("Got It") 
}
else
{

        console.log("This is your data", item.data());
        this.q1.push(item.data());
}       
      })
     
    })


   
    firebase.firestore().collection("Saved").where("phone","==",'1234567890').get().then(val=>{
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



      if(item==undefined)
      {
       console.log("Got It") 
      }

      else{

      this.q1.push(item)

   firebase.firestore().collection('1234567890Shoprite').add(item).then(val=>
        {
          console.log("added")

          let toast = this.toastController.create({
            message: 'Item moved from saved list to your current list.',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        })
      }   
     
    });
  
    this.dragulaService.dropModel('bag')
      .subscribe(({ item }) => {
        item['color'] = 'success';
      });
      console.log("look here3")
    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });
  
  }
  
  
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DreggerPage');
  }


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
