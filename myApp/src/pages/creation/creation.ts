import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { DatabaseProvider } from '../../providers/database/database'

import { Geolocation } from '@ionic-native/geolocation';

//import { AndroidPermissions } from '@ionic-native/android-permissions';

@IonicPage()
@Component({
  selector: 'page-creation',
  templateUrl: 'creation.html',
})
export class CreationPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public databaseProvider: DatabaseProvider, private geolocation: Geolocation)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad CreationPage');
  }

  create(eventName, eventDate, eventType, eventDescription, eventGeolocationPermission)
  {
    let eventGeolocationLatitude = null;
    let eventGeolocationLongitude = null;

    if(eventGeolocationPermission)
      this.geolocation.getCurrentPosition().then(pos => {
        eventGeolocationLatitude = pos.coords.latitude;
        eventGeolocationLongitude = pos.coords.longitude;
      });

    this.databaseProvider.insertEvent(eventName, eventDate, eventType, eventDescription, eventGeolocationLatitude, eventGeolocationLongitude);

    this.navCtrl.push(HomePage);
  }
}
