import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
 
@Injectable()
export class EventsSearchedProviders {
     
    events: Array<any>; 

    constructor(private databaseProvider: DatabaseProvider) {
        this.events = [];
    }
  
    setEvents() {
        
        this.databaseProvider.selectAllEvents(this.events);

        let e = 
        [{
        id: 1,
        name: "Nom",
        date: "12/12/2018",
        type: "sport",
        description: "oui"
        }]

        if(this.events.length == 0){
            this.events = e
        }
        
    }

    setEventsByType(searchType, data) {
        let e = 
        [{
            id: 1,
            name: "Nom",
            date: "12/12/2018",
            type: "sport",
            description: "oui"
          },
          {
            id: 2,
            name: "Nom - 2",
            date: "13/12/2018",
            type: "anniversaire",
            description: "non"
          }]

        if (searchType == 'Type'){
            this.databaseProvider.selectEventsByType(this.events, data);
        }
        else {
            this.databaseProvider.selectEventsByDate(this.events, data);
        }

        if(this.events == undefined || this.events.length == 0 ){
            this.events = e
        }
    }

    getEvents() {
        return this.events;
    }  
}