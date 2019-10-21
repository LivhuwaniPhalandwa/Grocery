
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from  'rxjs';
/*
  Generated class for the ItemsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemsProvider {


 
MyArray = [];

  constructor(public http: Http) {
    console.log('Hello ItemsProvider Provider');
  }
//   getdata(itemname,image){
//     // if (itemname==Items.j) {
//       let item='../../assets/data/Items.json';
//       let data:Observable<any>=this.http.get(item).map(res => res.json());;
//       data.subscribe(result =>{
        
      
//        return  result.Item

//       });
// }

getData(){
  return this.http.get('../../assets/data/Items.json').map(res => res.json())
}
}