import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';

import { DatabaseProvider } from '../../providers/database/database'

import { Geolocation } from '@ionic-native/geolocation';

import { AndroidPermissions } from '@ionic-native/android-permissions';

import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-creation',
  templateUrl: 'creation.html',
})
export class CreationPage {
  constructor(private navCtrl: NavController, private databaseProvider: DatabaseProvider, private geolocation: Geolocation, private androidPermissions: AndroidPermissions, private toastCtrl: ToastController)
  {
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad CreationPage');
  }

  create(eventName, eventDate, eventType, eventDescription, eventGeolocationPermission)
  {
    let toastMessage = "";

    if(eventName == undefined)
      toastMessage = "invalid event name";
    else if(eventDate == undefined)
      toastMessage = "invalid event date";
    else if(eventType == undefined)
      toastMessage = "invalid event type";
    else if(eventDescription == undefined)
      eventDescription = '';

    if(toastMessage.length > 0)
    {
      let toast = this.toastCtrl.create({
        message: toastMessage,
        duration: 3000,
        position: 'top'
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();

      return;
    }


    console.log('eventGeolocationPermission : ' + eventGeolocationPermission);

    let eventGeolocationLatitude = 0;
    let eventGeolocationLongitude = 0;

    if(eventGeolocationPermission)
    {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
      );

      this.geolocation.getCurrentPosition().then(pos => {
        eventGeolocationLatitude = pos.coords.latitude;
        eventGeolocationLongitude = pos.coords.longitude;
      });
    }

    console.log('eventGeolocationLatitude : ' + eventGeolocationLatitude + ' - eventGeolocationLongitude : ' + eventGeolocationLongitude)

    this.databaseProvider.insertEvent(eventName, eventDate, eventType, eventDescription, eventGeolocationLatitude, eventGeolocationLongitude);

    toastMessage = 'Event created';

    let toast = this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();

    this.navCtrl.setRoot(HomePage);
  }
}
