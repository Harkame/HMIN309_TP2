import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'event_database.db';

@Injectable()
export class DatabaseProvider
{
  private database: SQLiteObject;

  constructor(private sqlite: SQLite)
  {
    if(this.sqlite != undefined)
    {
      this.sqlite.create({
        name: DATABASE_FILE_NAME,
        location: 'default'
      })
        .then((database: SQLiteObject) => {
          this.database = database;

          this.database.executeSql('CREATE TABLE IF NOT EXISTS EVENTS (event_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, event_name TEXT, event_date TEXT, event_type TEXT, event_description TEXT);', null)
          .then(() => console.log('Table EVENTS created'))
          .catch(error => console.error('ERROR : ' + error));
        })
        .catch(error => console.error('ERROR : ' + error));
    }
  }

  insertEvent(eventName, eventDate, eventType, eventDescription, eventGeolocationLatitude, eventGeolocationLongitude)
  {
    if(this.database != undefined)
      this.database.executeSql('INSERT INTO EVENTS (event_name, event_date, event_type, event_description, event_latitude, event_longitude) VALUES (' + eventName + ', ' + eventDate + ', ' + eventType + ', ' + eventDescription + ', ' + eventGeolocationLatitude + ', ' + eventGeolocationLongitude + ');', null)
      .then(() => console.log('Event inserted'))
      .catch(error => console.error('ERROR : ' + error));
  }

  selectAllEvents() : any
  {
    let items : Array<{title: string, type: string, description: string, date:string}>;
    items = [];

    if(this.sqlite != undefined)
      this.sqlite.create({
        name: DATABASE_FILE_NAME,
        location: 'default'
        })
        .then((database: SQLiteObject) => {
          this.database = database;

          this.database.executeSql("SELECT * FROM EVENTS;", []).then((data) => {
            if (data.rows.length > 0)
              for (var i = 0; i < data.rows.length; i++)
              {
                items.push(
                {
                  title: data.rows.item(i).event_name,
                  date: data.rows.item(i).event_date,
                  type: data.rows.item(i).event_type,
                  description: data.rows.item(i).event_description
                  //longitude: data.rows.item(i).event_latitude
                  //latitude: data.rows.item(i).event_longitude
                });
              }
            return items;
          }, error => {
          console.error('Error : ', error);
          return [];
          });
        })
        .catch(exception => console.error('ERROR : ' + exception));
  }
}
