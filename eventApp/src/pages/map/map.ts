import { Event } from '../../models/Event'

import { DatabaseProvider } from '../../providers/database/database'
import { AddressProvider } from '../../providers/address/address';

import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage
{
  private event : Event;

  constructor(private navController : NavController, private navParams : NavParams, private events: Events, private addressProvider : AddressProvider, private databaseProvider : DatabaseProvider)
  {
  }

  dismiss()
  {
    this.navController.pop().then(() =>
    {
      this.events.publish('eventGeolocation', this.event);
    });
  }

  ngOnInit()
  {
    this.event = this.navParams.get('event');
  }

  resolveGeolocation()
  {
    this.addressProvider.resolveGeolocation(this.event.address).subscribe(json =>
    {
      if(json.hasOwnProperty('status'))
      {
        if(json.status == 'OK')
        {
          this.event.latitude = json.results[0].geometry.location.lat;
          this.event.longitude = json.results[0].geometry.location.lng;
        }
      }
    });
  }
}
