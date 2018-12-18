import { Event } from '../../models/Event'

import { EventsTypesProvider } from '../../providers/events_types/events-types';
import { DatabaseProvider } from '../../providers/database/database'

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})

export class DescriptionPage
{
  private event : Event
  private eventsTypes : string[];

  constructor(private navController: NavController, private navParams: NavParams, private databaseProvider: DatabaseProvider)
  {
    this.eventsTypes = EventsTypesProvider.getTypes();
  }

  ngOnInit()
  {
    this.event = this.navParams.get('event');

    console.log("description event : " + JSON.stringify(this.event));
  }

  onUpdateEvent()
  {
    this.databaseProvider.updateEvent(this.event);

    this.navController.pop();
  }

  onRemoveEvent()
  {
    this.databaseProvider.removeEvent(this.event.id);

    this.navController.pop();
  }
}
