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
  private event: Event
  private typesList: string[];

  constructor(public navController: NavController, public navParams: NavParams, private databaseProvider: DatabaseProvider)
  {
    console.log('contructor descriptionPage');

    this.typesList = [
        'Rendez-vous',
        'Raid',
        'Sport'
    ];
  }

  ngOnInit()
  {
    this.event = this.navParams.get('event');
  }

  ionViewDidLoad()
  {
    console.log('ionViewDidLoad DescriptionPage');
  }

  onUpdateEvent()
  {
    this.databaseProvider.updateEvent(this.event);

    this.navController.pop();
  }

  onRemoveEvent()
  {
    this.databaseProvider.removeEvent(this.event.id);

    this.navController.pop();
  }
}
