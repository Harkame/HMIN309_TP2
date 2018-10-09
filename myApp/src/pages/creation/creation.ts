import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { DatabaseProvider } from '../../providers/database/database'

const DATABASE_FILE_NAME: string = 'event_database.db';

@IonicPage()
@Component({
  selector: 'page-creation',
  templateUrl: 'creation.html',
})
export class CreationPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, public databaseProvider: DatabaseProvider)
  {

  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad CreationPage');
  }

  create(eventName, eventDate, eventType, eventDescription)
  {
    this.databaseProvider.insertEvent(eventName, eventDate, eventType, eventDescription);

    this.navCtrl.push(HomePage);
  }
}
