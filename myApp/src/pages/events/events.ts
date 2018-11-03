import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database'

@Component({
  selector: 'page-event',
  templateUrl: 'events.html'
})
export class EventPage
{
  selectedItem: any;
  items: Array<{title: string, type: string, date:string, description: string}>;

  constructor(private navCtrl: NavController, private navParams: NavParams, private databaseProvider: DatabaseProvider)
  {
    this.selectedItem = navParams.get('item');

    this.items = [];

    this.databaseProvider.selectAllEvents(this.items);

    console.log('ITEMS : ' + this.items);
  }

  itemTapped(event, item)
  {
    this.navCtrl.push(EventPage,
    {
      item: item
    });
  }
}
