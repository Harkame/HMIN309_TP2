import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Stepcounter } from '@ionic-native/stepcounter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage
{
  private steps : String = 'Start';
  private started : Boolean = false;

  constructor(public navCtrl: NavController, private stepCounter: Stepcounter)
  {
  }

  ngOnInit(): void
  {
  }

  start()
  {
    let task;

    if(this.started == true)
    {
      clearInterval(task);
      this.stepCounter.stop();
      this.steps = 'Start';
      this.started = false;
    }
    else
    {
      this.stepCounter.start(0).then(onSuccess => console.log('stepcounter-start success', onSuccess), onFailure => console.log('stepcounter-start error', onFailure));

      task = setInterval(() => {
        this.getSteps();
      }, 2000);

      this.started = true;
    }
  }

  async getSteps()
  {
    this.steps = (await this.stepCounter.getStepCount()).toString();
  }
}
