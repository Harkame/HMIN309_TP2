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

  click()
  {
    let task;

    if(this.started == false)
    {
      this.steps = '0';

      this.started = true;

      this.stepCounter.start(0);

      task = setInterval(() => {
        this.getSteps();
      }, 1000);
    }
    else
    {
      this.stepCounter.stop();

      clearInterval(task);

      this.steps = 'Start';

      this.started = false;
    }
  }


  async getSteps()
  {
    if(this.started == true)
      this.steps = (await this.stepCounter.getStepCount()).toString();
  }
}
