import {Event} from '../../models/Event'

import { DatabaseProvider } from '../../providers/database/database'

import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, NavParams } from 'ionic-angular';

import {GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage
{
  private event : Event;

  private map : GoogleMap;

  constructor(private navCtrl: NavController, private navParams: NavParams, private platform: Platform, private databaseProvider : DatabaseProvider)
  {
    this.platform.ready().then(() =>
    {
      this.loadGoogleMap();
    });
  }

  ngOnInit()
  {
    this.event = this.navParams.get('event');
  }

  loadGoogleMap()
  {
    let mapOptions: GoogleMapOptions =
    {
      camera:
      {
        target:
        {
          lat: this.event.geolocationLatitude,
          lng: this.event.geolocationLongitude
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    let marker: Marker = this.map.addMarkerSync
    ({
      title: 'Ionic',
      icon: 'blue',
      animation: 'DROP',
      position:
      {
        lat: this.event.geolocationLatitude,
        lng: this.event.geolocationLongitude
      }
    });

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() =>
    {
      alert('clicked');
    });
  }
}
