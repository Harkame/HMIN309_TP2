import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';

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

  constructor(private navController: NavController, private databaseProvider: DatabaseProvider, private eventsA: Events)
  {
  }

  ionViewDidLoad()
  {
    this.events = [];

    this.databaseProvider.selectAllEvents(this.events);
  }

  itemTapped(event)
  {
    this.eventsA.subscribe('removeEvent', (paramsVar) =>
    {
      let eventId = paramsVar;

      this.events.splice(this.events.findIndex(event => event.id === eventId), 1)

      this.eventsA.unsubscribe('removeEvent');
    });

    this.navController.push(DescriptionPage,
    {
      event : event
    });
  }
}
