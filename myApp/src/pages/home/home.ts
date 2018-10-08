import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  @ViewChild('dateInput') dateInput;
  event_types: Array<string>;
  events: Array<any>;
  length: any = 1;
  selectedType: String = "None"; // selected type for the research by type
  selectedDate: String = "None";
  checkedType:  String = "Date"; // type of research


  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ngOnInit(): void {
    this.setTypes();
  }

  setTypes(): void {
    this.event_types = ['Anniversary', 'Work', 'Family', 'Fun'];
  }

  filterTypes(ev: any) {
    this.setTypes();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.event_types = this.event_types.filter(function(item) {
        return item.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

  onClickOrSearchTypes(choice: any){
    this.selectedType = choice;
    console.log(this.selectedType);
  }

  onSelectedDate(){
    this.selectedDate = this.dateInput._text;
    console.log(this.selectedDate);
  }

  onChecked(res : any){
    this.checkedType = res;
    console.log(this.checkedType);
  }


}
