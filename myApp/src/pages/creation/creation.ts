import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { DatabaseProvider } from '../../providers/database/database'

import { Geolocation } from '@ionic-native/geolocation';

import { AndroidPermissions } from '@ionic-native/android-permissions';

const DATABASE_FILE_NAME: string = 'event_database.db';

@IonicPage()
@Component({
  selector: 'page-creation',
  templateUrl: 'creation.html',
})
export class CreationPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public databaseProvider: DatabaseProvider, private geolocation: Geolocation, private androidPermissions: AndroidPermissions)
  {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.LO)
    );
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad CreationPage');
  }

  create(eventName, eventDate, eventType, eventDescription, eventGeolocalisationPermission)
  {
    let eventGeolocalisationLatitude = null;
    let eventGeolocalisationLongitude = null;

    if(eventGeolocalisationPermission)
      this.geolocation.getCurrentPosition().then(pos => {
        eventGeolocalisationLatitude = pos.coords.latitude;
        eventGeolocalisationLongitude = pos.coords.longitude;
      });

    this.databaseProvider.insertEvent(eventName, eventDate, eventType, eventDescription, eventGeolocalisationLatitude, eventGeolocalisationLongitude);

    this.navCtrl.push(HomePage);
  }
}
