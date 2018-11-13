import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { Observable } from 'rxjs/Observable';

import { HomePage } from '../pages/home/home';
import { EventPage } from '../pages/events/events';
import { CreationPage } from '../pages/creation/creation';
import { EventNotification } from '../providers/background/EventNotification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  eventsOfTheDay: any[];


  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public eventNotification: EventNotification) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Events', component: EventPage },
      { title: 'Creation', component: CreationPage }
    ];

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
