
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import * as firebase from 'firebase';
import { LoadingController } from 'ionic-angular';
/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemsProvider {

usernumber;
supermarket;
budget;
budgets;
gameveg:any;
gamefruit:any;
  constructor(public loadingCtrl: LoadingController) {
  let x,xx ;

    
  let gv =  firebase.database().ref('/game/vegetables');
  let lv =gv.on('value', function(snapshot) {
 x =  snapshot.val();
    });

    let gf =  firebase.database().ref('/game/fruit');
    let lf =gf.on('value', function(snapshot) {
   xx =  snapshot.val();
      });





    const loader = this.loadingCtrl.create({
      duration: 3000
    });
    loader.present();
    loader.onDidDismiss(res=>{
     
      this.gameveg =x.Name.toString();
      this.gamefruit =xx.Name.toString();
      console.log(this.gamefruit)
    })



  }


  q1 =[];
  loaded(cellnum,shop){
    this.q1 =[];
    
    
  }

}