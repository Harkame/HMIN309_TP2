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

      this.database.executeSql(sqlRequest, [])
      .then(() => console.log('Event inserted'))
      .catch(error => console.error('ERROR : ' + error));
    }
  }

  selectAllEvents(items)
  {
    if(this.sqlite != undefined)
      this.database.executeSql("SELECT * FROM EVENTS;", []).then((data) => {
        for (var i = 0; i < data.rows.length; i++)
        {
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
      console.log(items);
      }, error => {
        console.error('Error : ' +  error);
      });
  }
}
