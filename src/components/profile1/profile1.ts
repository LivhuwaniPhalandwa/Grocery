import { Component } from '@angular/core';

/**
 * Generated class for the Profile1Component component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile1',
  templateUrl: 'profile1.html'
})
export class Profile1Component {

  text: string;

  constructor() {
    console.log('Hello Profile1Component Component');
    this.text = 'Hello World';
  }

}
