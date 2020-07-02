import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { ItemsProvider } from '../../providers/items/items';
/**
 * Generated class for the BudgetInputComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'budget-input',
  templateUrl: 'budget-input.html'
})
export class BudgetInputComponent {

  text: string;

  constructor(private items: ItemsProvider) {
    console.log('Hello BudgetInputComponent Component');
    this.text = 'Hello World';
  }

  budget(budget) {
  
                    this.items.budget = budget;
                    firebase.firestore().collection("CustomerBudget").doc(this.items.usernumber).set({ budget: this.items.getBudget()}).then(res => {
                    
      })
  }

}
