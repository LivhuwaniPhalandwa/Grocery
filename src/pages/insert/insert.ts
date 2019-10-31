import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { BudgetPage } from '../budget/budget';
import { Storage } from '@ionic/storage';
import {StatusBar} from '@ionic-native/status-bar';
import {  Slides } from 'ionic-angular';
/*
 * Generated class for the InsertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insert',
  templateUrl: 'insert.html',

})
export class InsertPage {
  @ViewChild('slides') slides: Slides;
  rootPage: any = InsertPage;
  constructor(public platform: Platform,public navCtrl: NavController, public navParams: NavParams, public storage: Storage,private statusbar: StatusBar) {
    this.statusbar.backgroundColorByHexString('#3657AF');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertPage');
  }


  gotobudget(){
    this.navCtrl.push(BudgetPage);
    
  }

​
hide:boolean =false;

nextslides(){
  this.slides.slideNext();

  console.log(this.slides._activeIndex)
  if(this.slides._activeIndex==5)
  {
    this.hide =true;
  }
    else
    {
      this.hide =false;
    }

}

sliders()
{


console.log(this.slides._activeIndex)
if(this.slides._activeIndex>=5)
{
  this.hide =true;
}
else
{
  this.hide =false;
}



}

}
