import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BudgetPage } from '../budget/budget';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsertPage');
  }


  gotobudget(){
    this.navCtrl.push(BudgetPage);
    
  }

​

​
​
nextslides(){
  this.slides.slideNext();
}

}
