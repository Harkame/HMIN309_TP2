import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { DatabaseProvider } from '../../providers/database/database'
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-creation',
  templateUrl: 'creation.html',
})
export class CreationPage {
  
  
    images: string[];
    notifyTime: any;
    notification: any;
    chosenHours: number;
    chosenMinutes: number;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController , private platform: Platform, private localNotifications: LocalNotifications, private databaseProvider: DatabaseProvider, private geolocation: Geolocation, private androidPermissions: AndroidPermissions, private toastCtrl: ToastController, private camera: Camera)
  {
    this.images = [];
    this.notifyTime = moment(new Date()).format();
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad CreationPage');
  }

  timeChange(time){
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
  }

  create(eventName, eventDate, eventType, eventDescription, eventGeolocationPermission, eventChecked)
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

    if(eventChecked){
      this.addNotification(eventDate);
    }

    this.databaseProvider.insertEvent(eventName, eventDate, eventType, eventDescription, eventGeolocationLatitude, eventGeolocationLongitude);

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
      //let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }

  addNotification(eventDate){
  
    let firstNotificationTime = eventDate;
    firstNotificationTime.setHours(this.chosenHours);
    firstNotificationTime.setMinutes(this.chosenMinutes);

    this.notification = {
      id: 1,
      title: 'Rappel !',
      text: 'Vous avez un evenements aujourd\'hui',
      at: firstNotificationTime
    };

    console.log("Notifications to be scheduled: ", this.notification);
 
        this.localNotifications.cancelAll().then(() => {
 
            // Schedule the new notifications
            this.localNotifications.schedule(this.notification);
 
            this.notification = '';
 
        });
 
    }
  }
