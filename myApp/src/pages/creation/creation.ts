import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database'
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileReader } from '@ionic-native/file';
import { LocalNotifications } from '@ionic-native/local-notifications';

import {Event} from '../../models/Event'
/*
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment
} from '@ionic-native/google-maps';
*/

@IonicPage()
@Component({
  selector: 'page-creation',
  templateUrl: 'creation.html',
})

export class CreationPage
{
  notifyTime: any;

  event: Event;

  typesList: string[];

  //map: GoogleMap;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private platform: Platform, private localNotifications: LocalNotifications, private databaseProvider: DatabaseProvider, private geolocation: Geolocation, private androidPermissions: AndroidPermissions, private toastCtrl: ToastController, private camera: Camera, private file: File)
  {
    //this.loadMap();
    console.log("creation constructor")

    this.event = new Event();
    this.typesList = [
        'Rendez-vous',
        'Raid',
        'Sport'
    ];
  }

  create(eventGeolocationActived, eventNotificationActived)
  {
    let toastMessage = "";

    if(this.event.name == undefined)
      toastMessage = "invalid event name";
    else if(this.event.date == undefined)
      toastMessage = "invalid event date";
    else if(this.event.type == undefined)
      toastMessage = "invalid event type";

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

    let eventGeolocationLatitude = 0;
    let eventGeolocationLongitude = 0;

    if(eventGeolocationActived)
    {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
        result => console.log('Has permission?',result.hasPermission),
        err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
      );

      this.geolocation.getCurrentPosition().then(pos => {
        this.event.geolocationLatitude = pos.coords.latitude;
        this.event.geolocationLongitude = pos.coords.longitude;
      });
    }

    if(eventNotificationActived)
      this.addNotification();

    this.databaseProvider.insertEvent(this.event);

    this.navCtrl.setRoot(HomePage);
  }

  takePicture()
  {
    const options: CameraOptions =
    {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }

    this.camera.getPicture(options).then((imageData) =>
    {
      this.event.fileName = imageData.substring(imageData.lastIndexOf('/')+1);
      this.event.pathFile =  imageData.substring(0,imageData.lastIndexOf('/')+1);

      this.file.readAsDataURL(this.event.pathFile, this.event.fileName).then(res => this.event.fileURL = res  );
    },
    (error) =>
    {
    });
  }

  addNotification()
  {
    let eventDateTime = new Date(this.event.date + " " + this.event.time);

    console.log("eventDateTime : " + eventDateTime);

    let notification =
    {
      title: 'Rappel !',
      text: 'Vous avez un evenements aujourd\'hui ' + this.event.name,
      trigger: {at: eventDateTime}
    };

    this.localNotifications.schedule(notification);
  }
}
