import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http'
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventPage } from '../pages/events/events';
import { CreationPage } from '../pages/creation/creation';
import { DescriptionPage } from '../pages/description/description';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite} from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Shake } from '@ionic-native/shake';
import { EventNotification } from '../providers/background/EventNotification';
import { File } from '@ionic-native/file';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventPage,
    CreationPage,
    DescriptionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventPage,
    CreationPage,
    DescriptionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    Geolocation,
    AndroidPermissions,
    ToastController,
    Camera,
    EventNotification,
    BackgroundMode,
    LocalNotifications,
    Shake,
    LocalNotifications,
    File
  ]
})

export class AppModule {}
