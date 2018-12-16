import { DatabaseProvider } from '../../providers/database/database'
import { AddressProvider } from '../../providers/address/address';

import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage
{
  private address: string = '';
  private latitude: number = 43.753890;
  private longitude: number = 4.514380;

  constructor(private navParams : NavParams, private viewController : ViewController, private addressProvider : AddressProvider, private databaseProvider : DatabaseProvider)
  {

  }

  dismiss()
  {
    this.viewController.dismiss();
  }

  findCoords()
  {
    this.addressProvider.resolveGeolocation(this.address).subscribe(json =>
    {
      if(json.hasOwnProperty('status'))
      {
        if(json.status == 'OK')
        {
          this.latitude = json.results[0].geometry.location.lat;
          this.longitude = json.results[0].geometry.location.lng;
        }
      }
    });
  }
}
