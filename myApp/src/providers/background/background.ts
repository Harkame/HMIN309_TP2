import { Injectable } from '@angular/core';

import { BackgroundMode } from '@ionic-native/background-mode';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { Shake } from '@ionic-native/shake';

import { Plugins } from '@capacitor/core';

const { App, BackgroundTask } = Plugins;

@Injectable()
export class Background
{
  private initialized = false;

  constructor(private backgroundMode: BackgroundMode, private shake: Shake, private localNotifications: LocalNotifications)
  {
    if(!this.initialized)
      this.init();
  }

  init()
  {
    this.initialized = true;

    this.backgroundMode.enable();

    while(true)
    {
      const watch = this.shake.startWatch(60).subscribe(() =>
      {
        this.localNotifications.schedule({
          id: 1,
          text: 'Single ILocalNotification',
          sound: null,
          data: null
        });
      });
    }
  }
}
