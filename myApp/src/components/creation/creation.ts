import { Component } from '@angular/core';

/**
 * Generated class for the CreationComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'creation',
  templateUrl: 'creation.html'
})
export class CreationComponent {

  text: string;

  constructor() {
    console.log('Hello CreationComponent Component');
    this.text = 'Hello World';
  }

}
