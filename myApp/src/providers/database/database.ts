import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = 'event_database.db';

@Injectable()
export class DatabaseProvider
{
  private msqlite: SQLite;
  private database: SQLiteObject;

  constructor(public http: HttpClient, public sqlite: SQLite)
  {
    /*
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((database: SQLiteObject) => {
        this.msqlite = sqlite;
        this.database = database;

        this.database.executeSql('CREATE TABLE IF NOT EXISTS EVENTS (event_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, event_name TEXT, event_date TEXT, event_type TEXT, event_description TEXT);', null)
        .then(() => console.log('Table EVENTS created'))
        .catch(error => console.error('ERROR : ' + error));
      })
      .catch(error => console.error('ERROR : ' + error));
      */
  }

  insertEvent(eventName, eventDate, eventType, eventDescription)
  {
    console.log(eventName);
    console.log(eventType);
    console.log(eventDescription);
    console.log(eventDate);

    this.database.executeSql('INSERT INTO EVENTS (event_name, event_date, event_type, event_description) VALUES (' + eventName + ', ' + eventDate + ', ' + eventType + ', ' + eventDescription + ');', null)
    .then(() => console.log('Event inserted'))
    .catch(error => console.error('ERROR : ' + error));
  }

  selectAllEvents() : any
  {
    let items : Array<{title: string, type: string, description: string, date:string}>;
    items = [];

    this.msqlite.create({
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
                description: data.rows.item(i).event_description });
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
