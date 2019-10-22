import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HistoryPage } from '../history/history';

/**
 * Generated class for the SuccessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-success',
  templateUrl: 'success.html',
})
export class SuccessPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SuccessPage');
  }
  takeHome(){
    this.navCtrl.push(HomePage)
  }

  togohistory(){
    this.navCtrl.push(HistoryPage)
  }
}
