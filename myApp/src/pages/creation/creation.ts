import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'event_database.db';

/**
 * Generated class for the CreationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-creation',
  templateUrl: 'creation.html',
})
export class CreationPage {

  private database: SQLiteObject;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite: SQLite) {

    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    }).then((database: SQLiteObject) => {
      console.log('database created');
      this.database = database;


      this.database.executeSql('CREATE TABLE IF NOT EXISTS EVENT(event_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, event_name TEXT, event_date TEXT, event_description TEXT)');
    }).catch(e => console.log('ERROR ' + e));


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreationPage');
  }

  create(eventTitle, eventDescription, eventType, eventDate) {
    console.log(eventTitle);
    console.log(eventType);
    console.log(eventDescription);
    console.log(eventDate);

    this.navCtrl.push(HomePage);
  }
}
