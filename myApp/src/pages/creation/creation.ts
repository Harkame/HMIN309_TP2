import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database'
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry, FileReader } from '@ionic-native/file';
import { LocalNotifications } from '@ionic-native/local-notifications';

import {Event} from '../../models/Event'

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
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-creation',
  templateUrl: 'creation.html',
})

export class CreationPage
{
  images: string[];
  notifyTime: any;

  event: Event;

  map: GoogleMap;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController , private platform: Platform, private localNotifications: LocalNotifications, private databaseProvider: DatabaseProvider, private geolocation: Geolocation, private androidPermissions: AndroidPermissions, private toastCtrl: ToastController, private camera: Camera, private file: File, private loadingCtrl: LoadingController)
  {
    this.images = [];
    this.notifyTime = moment(new Date()).format();

    //this.loadMap();
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad CreationPage');
  }

  create(eventName, eventDate, eventType, eventDescription, eventGeolocationPermission, eventChecked, eventTime)
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

    console.log('eventNotification permission : ' + eventChecked);

    if(eventChecked)
      this.addNotification(eventDate, eventTime, eventName);

    this.databaseProvider.insertEvent(eventName, eventDate, eventType, eventDescription, eventGeolocationLatitude, eventGeolocationLongitude);

    this.navCtrl.setRoot(HomePage);
  }

  takePicture()
  {
    let loader = this.loadingCtrl.create({
        content: 'Picture view'
    });

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
      loader.present();
      this.event.fileName = imageData.substring(imageData.lastIndexOf('/')+1);
      this.event.pathFile =  imageData.substring(0,imageData.lastIndexOf('/')+1);

      this.file.readAsDataURL(this.event.pathFile, this.event.fileName).then(res => this.event.fileURL = res  );

      loader.dismiss();
    },
    (error) =>
    {
    });
  }

  addNotification(eventDate, eventTime, eventName)
  {
    let eventDateTime = new Date(eventDate + " " + eventTime);

    console.log("eventDateTime : " + eventDateTime);

    let notification =
    {
      title: 'Rappel !',
      text: 'Vous avez un evenements aujourd\'hui ' + eventName,
      trigger: {at: eventDateTime}
    };

    this.localNotifications.schedule(notification);
  }

  loadMap()
  {

    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyDiadmDr6KFZAbaO4kMdFvqY4rbmYEsINk',
      'API_KEY_FOR_RER_DEBUG': 'AIzaSyDiadmDr6KFZAbaO4kMdFvqY4rbmYEsINk'
    });

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

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    let marker: Marker = this.map.addMarkerSync(
    {
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
