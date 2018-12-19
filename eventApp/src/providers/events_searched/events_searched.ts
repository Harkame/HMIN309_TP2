import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../../providers/database/database';
import { Observable } from 'rxjs';
 
@Injectable()
export class EventsSearchedProviders {
     
    events: Array<any>; 

    constructor(private databaseProvider: DatabaseProvider) {
        this.events = [];
    }
  
    setEvents() {        
        this.databaseProvider.selectAllEvents(this.events);
    }

    async setEventsByType(searchType, data) {

        this.events = [];

        if (searchType == 'Type'){
            await this.databaseProvider.selectEventsByType(this.events, data);
        }
        else {
            await this.databaseProvider.selectEventsByDate(this.events, data);
        }

        return this.events
    }

    getEvents() {
        return this.events;
    }  
}