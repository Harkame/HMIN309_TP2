import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { ToastController } from 'ionic-angular';

import {Event} from '../../models/Event'

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

          this.database.executeSql('CREATE TABLE IF NOT EXISTS Events (event_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, event_name TEXT, event_date TEXT, event_type TEXT, event_description TEXT, event_latitude REAL, event_longitude REAL, event_address TEXT, event_file_url TEXT);', [])
          .then(() => console.log('Table Events created'))
        })
        .catch(error => console.error('ERROR : ' + error));
    }
  }

  init(){

  }

  insertEvent(event : Event)
  {
    if(this.database != undefined)
    {
      let sqlRequest = 'INSERT INTO Events (event_name, event_date, event_type, event_description, event_latitude, event_longitude, event_address, event_file_url) VALUES (\'' + event.name + '\', \'' + event.date + '\', \'' + event.type + '\', \'' + event.description + '\', ' + event.latitude + ', ' + event.longitude + ', \'' + event.address+ '\', \'' + event.fileURL +  '\');';

      console.log(sqlRequest);

      this.database.executeSql(sqlRequest, [])
            .then(() => this.showToast('Event created'))
            .catch(error => this.showToast('Error event insertion'));
    }
  }

  updateEvent(event : Event)
  {
    if(this.database != undefined)
    {
      let sqlRequest = 'UPDATE Events SET event_type = \'' + event.type + '\', event_description = \'' + event.description + '\', event_latitude = \'' + event.latitude+ '\', event_longitude = \'' + event.longitude+ '\', event_address = \'' + event.address + '\' WHERE event_id = ' + event.id + ';' ;

      console.log(sqlRequest);

      this.database.executeSql(sqlRequest, [])
            .then(() => this.showToast('Event modified'))
            .catch(error => this.showToast('Error event modification'));
    }
  }

  selectEventsByType(events, type)
  {
    if(this.sqlite != undefined)
      this.database.executeSql('SELECT * FROM Events WHERE event_type = \''+ type +'\' ;', []).then((data) => {
        for (var i = 0; i < data.rows.length; i++)
        {
          console.log("event_name : " + data.rows.item(i).event_name);
          events.push(
          {
            id : data.rows.item(i).event_id,
            name : data.rows.item(i).event_name,
            date : data.rows.item(i).event_date,
            type : data.rows.item(i).event_type,
            description : data.rows.item(i).event_description,
            latitude : data.rows.item(i).event_latitude,
            longitude : data.rows.item(i).event_longitude,
            address : data.rows.item(i).event_address,
            fileURL : data.rows.item(i).event_file_url
          });
        }
      console.log("ITEMS : " + JSON.stringify(events));
      }, error => {
        console.error('Error : ' +  error);
      });
  }

  selectEventsByDate(events, date)
  {
    console.log("date in db : " + date.toString());
    let date_splited = date.toString().split("/", 3);
    console.log("date_splited : " + date_splited.toString());

    let searched_date = date_splited[2] + "-" + date_splited[1] + "-" + date_splited[0];
    console.log("searched_date : " + searched_date.toString());

    if(this.sqlite != undefined)
      this.database.executeSql('SELECT * FROM Events WHERE event_date = \'' + searched_date + '\';', []).then((data) => {
        for (var i = 0; i < data.rows.length; i++)
        {
          console.log("event_name : " + data.rows.item(i).event_name);
          events.push(
          {
            id : data.rows.item(i).event_id,
            name : data.rows.item(i).event_name,
            date : data.rows.item(i).event_date,
            type : data.rows.item(i).event_type,
            description : data.rows.item(i).event_description,
            latitude : data.rows.item(i).event_latitude,
            longitude : data.rows.item(i).event_longitude,
            address : data.rows.item(i).event_address,
            fileURL : data.rows.item(i).event_file_url
          });
        }
      console.log("ITEMS : " + JSON.stringify(events));
      }, error => {
        console.error('Error : ' +  error);
      });
  }


  selectAllEvents(items)
  {
    if(this.sqlite != undefined)
      this.database.executeSql("SELECT * FROM Events;", []).then((data) => {
        for (var i = 0; i < data.rows.length; i++)
        {
          console.log("event_name : " + data.rows.item(i).event_name);
          items.push(
          {
            id : data.rows.item(i).event_id,
            name : data.rows.item(i).event_name,
            date : data.rows.item(i).event_date,
            type : data.rows.item(i).event_type,
            description : data.rows.item(i).event_description,
            latitude : data.rows.item(i).event_latitude,
            longitude : data.rows.item(i).event_longitude,
            address : data.rows.item(i).event_address,
            fileURL : data.rows.item(i).event_file_url
          });
        }
      console.log("ITEMS : " + JSON.stringify(items));
      }, error => {
        console.error('Error : ' +  error);
      });
  }

  removeEvent(eventId)
  {
    if(this.database != undefined)
    {
      let sqlRequest = 'DELETE FROM Events WHERE event_id = ' + eventId + ';';

      console.log(sqlRequest);

      this.database.executeSql(sqlRequest, [])
            .then(() => this.showToast('Event removed'))
            .catch(error => this.showToast('Error event removing'));
    }
  }

  selectEventsOfToday(items){
    let date = new Date();
    let date_of_day = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() ;

    this.database.executeSql('SELECT * FROM Events WHERE \'' + date_of_day + '\' = event_date', []).then((data) => {
      for (var i = 0; i < data.rows.length; i++)
        {
          console.log("event_name : " + data.rows.item(i).event_name);
          items.push(
          {
            id : data.rows.item(i).event_id,
            name : data.rows.item(i).event_name,
            date : data.rows.item(i).event_date,
            type : data.rows.item(i).event_type,
            description : data.rows.item(i).event_description,
            latitude : data.rows.item(i).event_latitude,
            longitude : data.rows.item(i).event_longitude,
            address : data.rows.item(i).event_address,
            fileURL : data.rows.item(i).event_file_url
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
      message: message,
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
