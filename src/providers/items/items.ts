
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { DragulaModule, DragulaService } from 'ng2-dragula';
import * as firebase from 'firebase';
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
  constructor() {
    console.log('Hello ItemsProvider Provider');
  }


  q1 =[];
  loaded(cellnum,shop){
    this.q1 =[];
    
    
  }

}