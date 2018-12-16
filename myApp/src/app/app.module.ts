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
import { MapPage } from '../pages/map/map';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite} from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Shake } from '@ionic-native/shake';
import { File } from '@ionic-native/file';
import { EventSearchedPage} from '../pages/event-searched/event-searched'
import { DatabaseProvider } from '../providers/database/database';
import { EventsTypesProvider } from '../providers/events_types/events-types';
import { EventsSearchedProviders } from '../providers/events_searched/events_searched';
import { AddressProvider } from '../providers/address/address';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventPage,
    CreationPage,
    DescriptionPage,
    MapPage,
    EventSearchedPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBQ9s-I2YGlocgEKe0fVUid6mUqacCaqbE'}),
    HttpModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventPage,
    CreationPage,
    DescriptionPage,
    MapPage,
    EventSearchedPage
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
    BackgroundMode,
    LocalNotifications,
    Shake,
    LocalNotifications,
    File,
    EventsTypesProvider,
    EventsSearchedProviders,
    AddressProvider
  ]
})

export class AppModule {}
