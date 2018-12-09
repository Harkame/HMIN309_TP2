import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database'

import { DescriptionPage } from '../description/description';

import {Event} from '../../models/Event'

@Component({
  selector: 'page-event',
  templateUrl: 'events.html'
})
export class EventPage
{
  events: Array<Event>;

  constructor(private navController: NavController, private navParams: NavParams, private databaseProvider: DatabaseProvider)
  {
    this.events = [];

    this.databaseProvider.selectAllEvents(this.events);
  }

  itemTapped(event)
  {
    console.log('itemTapped :' + event.id + ' - ' + event.name);

    this.navController.push(DescriptionPage,
    {
      event: event
    });
  }
}
