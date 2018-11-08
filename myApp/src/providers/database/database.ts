import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { ToastController } from 'ionic-angular';

const DATABASE_FILE_NAME: string = 'event_database.db';

@Injectable()
export class DatabaseProvider
{
  private database: SQLiteObject;

  constructor(private sqlite: SQLite, private toastCtrl: ToastController)
  {
    if(this.sqlite != undefined)
    {
      this.sqlite.create({
        name: DATABASE_FILE_NAME,
        location: 'default'
      })
        .then((database: SQLiteObject) => {
          this.database = database;

          this.database.executeSql('CREATE TABLE IF NOT EXISTS EVENTS (event_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, event_name TEXT, event_date TEXT, event_type TEXT, event_description TEXT, event_latitude TEXT, event_longitude TEXT);', [])
          .then(() => console.log('Table EVENTS created'))
          .catch(error => console.error('ERROR : ' + error));
        })
        .catch(error => console.error('ERROR : ' + error));
    }
  }

  insertEvent(eventName, eventDate, eventType, eventDescription, eventGeolocationLatitude, eventGeolocationLongitude)
  {
    if(this.database != undefined)
    {
      let sqlRequest = 'INSERT INTO EVENTS (event_name, event_date, event_type, event_description, event_latitude, event_longitude) VALUES (\'' + eventName + '\', \'' + eventDate + '\', \'' + eventType + '\', \'' + eventDescription + '\', \'' + eventGeolocationLatitude + '\', \'' + eventGeolocationLongitude + '\');'

      console.log(sqlRequest);

      this.database.executeSql(sqlRequest, [])
            .then(() => this.showToast('Event created'))
            .catch(error => this.showToast('Error event insertion'));
    }
  }

  selectAllEvents(items)
  {
    if(this.sqlite != undefined)
      this.database.executeSql("SELECT * FROM EVENTS;", []).then((data) => {
        for (var i = 0; i < data.rows.length; i++)
        {
          console.log("event_name : " + data.rows.item(i).event_name);
          items.push(
          {
            title: data.rows.item(i).event_name,
            type: data.rows.item(i).event_type,
            date: data.rows.item(i).event_date,
            description: data.rows.item(i).event_description
            //longitude: data.rows.item(i).event_latitude
            //latitude: data.rows.item(i).event_longitude
          });
        }
      console.log("ITEMS : " + JSON.stringify(items));
      }, error => {
        console.error('Error : ' +  error);
      });
  }

  selectEventsOfToday(items){
    let date = new Date();
    let date_of_day = date.getDate + "/" + date.getMonth + "/" + date.getFullYear;

    this.database.executeSql('SELECT * FROM EVENTS WHERE \'' + date_of_day + '\' = event_date', []).then((data) => {
      for (var i = 0; i < data.rows.length; i++)
        {
          console.log("event_name : " + data.rows.item(i).event_name);
          items.push(
          {
            title: data.rows.item(i).event_name,
            type: data.rows.item(i).event_type,
            date: data.rows.item(i).event_date,
            description: data.rows.item(i).event_description
          });
        }
      console.log("ITEMS : " + JSON.stringify(items));
          }, error => {
            console.error('Error : ' +  error);
          });
  }

  showToast(message)
  {
    let toast = this.toastCtrl.create({
      message: "Event created",
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() =>
    {
      console.log(message);
    });

    toast.present();
  }
}
