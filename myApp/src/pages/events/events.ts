import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database'

import { DescriptionPage } from '../description/description';

import { Event } from '../../models/Event'

@Component({
  selector: 'page-event',
  templateUrl: 'events.html'
})
export class EventPage
{
  events: Array<Event>;

  constructor(private navController: NavController, private databaseProvider: DatabaseProvider)
  {
  }

  ionViewDidLoad()
  {
    this.events = [];

    this.databaseProvider.selectAllEvents(this.events);
  }

  itemTapped(event)
  {
    this.navController.push(DescriptionPage,
    {
      event : event
    });
  }
}
