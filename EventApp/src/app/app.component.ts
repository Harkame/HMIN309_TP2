import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database'
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


  constructor(public platform: Platform,public databaseProvider: DatabaseProvider, public localNotifications: LocalNotifications,public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Events', component: EventPage },
      { title: 'Creation', component: CreationPage }
    ];

  }

  initializeApp()
  {
    this.platform.ready().then(() =>
    {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.databaseProvider.initialize();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
