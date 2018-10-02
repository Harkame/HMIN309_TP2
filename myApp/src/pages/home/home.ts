import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('dateInput') dateInput;
  types: Array<string>;
  events: Array<any>;
  allEvents: Array<any>;
  selectedItem: String = "None";
  selectedDate: String = "None";
  checkedType:  String = "Date";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.allEvents = this.navParams.get('events');
  }

  ngOnInit(): void {
    this.setItems();
  }

  setItems(): void {
    this.types = ['Anniversary', 'Work', 'Family', 'Fun'];
  }

  filterTypes(ev: any) {
    this.setItems();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.types = this.types.filter(function(item) {
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  onClickOrSearchItem(choice: any){
    this.selectedItem = choice;
    console.log(this.selectedItem);
  }

  onSelectedDate(){
    this.selectedDate = this.dateInput._text;
    console.log(this.selectedDate);
  }

  onChecked(res : any){
    this.checkedType = res;
    console.log(this.checkedType);
  }

  setEventsArray(){
    
    if(this.checkedType == 'Date'){
      
    }
  }

}
