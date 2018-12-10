import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform, NavParams } from 'ionic-angular';

import {GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage
{
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform)
  {
    this.platform.ready().then(() =>
    {
      this.loadGoogleMap();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  loadGoogleMap()
  {
    let mapOptions: GoogleMapOptions =
    {
      camera:
      {
        target:
        {
          lat: 43.0741904,
          lng: -89.3809802
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
        lat: 43.0741904,
        lng: -89.3809802
      }
    });

    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() =>
    {
      alert('clicked');
    });
  }
}
