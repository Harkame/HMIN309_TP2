import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
import { EventsSearchedProviders } from '../../providers/events_searched/events_searched';
import { DescriptionPage } from '../description/description';
import {Event} from '../../models/Event'

/**
 * Generated class for the EventSearchedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-searched',
  templateUrl: 'event-searched.html',
})
export class EventSearchedPage {
  events: Array<Event>;
  searchedType: any;
  data:any;
  test: boolean = false;

  constructor(private eventProvider:EventsSearchedProviders ,private navParams: NavParams, private navController: NavController, private databaseProvider: DatabaseProvider)
  {
    
  }

  ngOnInit(){
    this.events = [];
    this.searchedType = this.navParams.get('searchedType');
    this.data = this.navParams.get('type');

    console.log("Searched Types : " + this.searchedType);
    console.log("data : " + this.data);

    this.eventProvider.setEventsByType(this.searchedType, this.data);
    this.events = this.eventProvider.getEvents()
  
    console.log("set Events by Types");
    console.log("events : " + this.events);
    
    if(this.events == undefined || this.events.length == 0){
      this.test = true;
    }
  }

  ionViewDidLoad()
  {
  }

  itemTapped(event)
  {
    console.log('itemTapped :' + event.id + ' - ' + event.name);

    this.navController.push(DescriptionPage,
    {
      event: event
    });
  }
}
