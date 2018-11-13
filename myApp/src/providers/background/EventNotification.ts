import { Injectable } from '@angular/core';

import { BackgroundMode } from '@ionic-native/background-mode';

import { DatabaseProvider } from '../../providers/database/database'

import { LocalNotifications } from '@ionic-native/local-notifications';

import { Shake } from '@ionic-native/shake';

//import { Plugins } from '@capacitor/core';

//const { App, BackgroundTask } = Plugins;

@Injectable()
export class EventNotification
{
  private initialized = false;

  constructor(private databaseProvider: DatabaseProvider, private backgroundMode: BackgroundMode, private shake: Shake, private localNotifications: LocalNotifications)
  {
    if(!this.initialized)
      this.init();
  }

  init()
  {
    this.initialized = true;

    this.backgroundMode.enable();

    /*
    while(true)
    {
      this.shake.startWatch(60).subscribe(() =>
      {
        this.localNotifications.schedule({
          id: 1,
          text: 'Single ILocalNotification',
          sound: null,
          data: null
        });
      });
    }
    */
  }

  getEventsOfTheDay(){
    let items;
    this.databaseProvider.selectEventsOfToday(items)
    return items;
  }
}
