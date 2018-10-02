import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-event',
  templateUrl: 'events.html'
})
export class EventPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, type: string, description: string, date:string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.navCtrl.push(HomePage, {'events' : this.items});
    // Let's populate this page with some filler content for funzies
    /*
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];
    */

    this.items = [];

    //Modifier les champs via accès au données de la bd. 
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        type: "Anniversary",
        description: "test ma gueule",
        date: "22/02/2222"
      });
    }
  }

  itemTapped(event, item) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EventPage, {
      item: item
    });
  }
}