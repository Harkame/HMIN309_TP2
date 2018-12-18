import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { EventPage } from '../pages/events/events';
import { CreationPage } from '../pages/creation/creation';

import { LocalNotifications } from '@ionic-native/local-notifications';

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


  constructor(public platform: Platform, public localNotifications: LocalNotifications,public statusBar: StatusBar, public splashScreen: SplashScreen) {
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