import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database'

import {Event} from '../../models/Event'

@IonicPage()
@Component({
  selector: 'page-description',
  templateUrl: 'description.html',
})

export class DescriptionPage
{
  private event: Event;

  constructor(public navCtrl: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider)
  {
    console.log('contructor descriptionPage');
  }

  ngOnInit()
  {
    this.event = this.navParams.get('event');
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad DescriptionPage');
  }

  onRemoveTask()
  {
    this.databaseProvider.removeEvent(this.event.id);
  }
}
