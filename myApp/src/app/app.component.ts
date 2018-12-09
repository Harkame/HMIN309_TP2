import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Observable } from 'rxjs/Observable';

import { HomePage } from '../pages/home/home';
import { EventPage } from '../pages/events/events';
import { CreationPage } from '../pages/creation/creation';

import { EventNotification } from '../providers/background/EventNotification';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as moment from 'moment';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  eventsOfTheDay: any[];

  notifyTime: any;
  notification: any;
  chosenHours: number;
  chosenMinutes: number;


  constructor(public platform: Platform, public localNotifications: LocalNotifications,public statusBar: StatusBar, public splashScreen: SplashScreen, public eventNotification: EventNotification) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Events', component: EventPage },
      { title: 'Creation', component: CreationPage }
    ];

    //this.setupNotification();

    this.getEventOfDay();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setupNotification(){
    this.notifyTime = moment(new Date()).format();
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes() + 5;

    let firstNotificationTime = new Date();
    firstNotificationTime.setHours(this.chosenHours);
    firstNotificationTime.setMinutes(this.chosenMinutes);

    let eventsOfDay = this.eventNotification.getEventsOfTheDay();
    if(eventsOfDay.size() > 1) {
      this.notification = {
        id: 1,
        title: 'Rappel !',
        text: 'Vous avez ' + eventsOfDay.size() + ' evenements aujourd\'hui',
        at: firstNotificationTime
      };

    }else{
      this.notification = {
        id: 1,
        title: 'Liberté ! ',
        text: 'Vous n\'avez aucun évenement aujourd\'ui, REPOS !',
        at: firstNotificationTime
      };
    }

    this.localNotifications.schedule(this.notification);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private getEventOfDay(){
    //TODO FIX this line
    /*
    this.eventsOfTheDay = Observable.interval(36000000)
                                    .mergeMapTo(this.eventService.getEventsOfTheDay)
                                    .map(res => res.json());
    */
  }
}
