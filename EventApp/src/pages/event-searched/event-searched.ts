import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsSearchedProviders } from '../../providers/events_searched/events_searched';
import { DescriptionPage } from '../description/description';
import { Event } from '../../models/Event'

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

  constructor(private eventProvider:EventsSearchedProviders ,private navParams: NavParams, private navController: NavController)
  {

  }

  ngOnInit(){
    this.events = [];
    this.searchedType = this.navParams.get('searchedType');
    this.data = this.navParams.get('type');

    console.log("Searched Types : " + this.searchedType);
    console.log("data : " + this.data);

    console.log("set Events by Types");
    this.eventProvider.setEventsByType(this.searchedType, this.data).then(val => {
        this.events = val;

        console.log('WTFFFF : ' + this.events.length)
        /*
        if(this.events.length === 0){
          this.test = true;
        }
        */
    });
    
    

  }

  ionViewDidLoad()
  {
  }

  itemTapped(event)
  {
    console.log('itemTapped :' + event.id + ' - ' + event.name);

    this.navController.push(DescriptionPage,
    {
      event : event
    });
  }
}
