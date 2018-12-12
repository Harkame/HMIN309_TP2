import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventSearchedPage } from '../event-searched/event-searched';
import { EventsTypesProvider } from '../../providers/events_types/events-types';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('dateInput') dateInput;
  @ViewChild('typeInput') typeInput;
  event_types: Array<string>;
  events: Array<any>;
  length: any = 0;
  selectedType: String = "None"; // selected type for the research by type
  selectedDate: String = "None";
  checkedType:  String = "Date"; // type of research


  constructor(public navCtrl: NavController)
  {
  }

  ngOnInit(): void
  {
    this.setTypes();
  }

  setTypes(): void {
    this.event_types = EventsTypesProvider.getTypes();
  }

  filterTypes(ev: any)
  {
    this.setTypes();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.event_types = this.event_types.filter(function(item)
      {
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  
  submitSearch(){

    if(this.typeInput != undefined){
      this.selectedType = this.typeInput._value;
    }
  
    if(this.checkedType == "Type"){
      console.log(this.selectedType);
      this.navCtrl.push(EventSearchedPage, {searchedType : 'Type', type : this.selectedType});
    }
    else {
      console.log(this.selectedDate);
      this.navCtrl.push(EventSearchedPage, {searchedType : 'Date', type : this.selectedDate});
    }   
  }

  onClickOrSearchTypes(choice: any)
  {
    this.selectedType = choice;
    console.log(this.selectedType);
  }

  onSelectedDate()
  {
    this.selectedDate = this.dateInput._text;
    console.log(this.selectedDate);
  }

  onChecked(res : any)
  {
    this.checkedType = res;
    console.log(this.checkedType);
  }
}
