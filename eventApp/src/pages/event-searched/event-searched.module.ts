import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventSearchedPage } from './event-searched';

@NgModule({
  declarations: [
    EventSearchedPage,
  ],
  imports: [
    IonicPageModule.forChild(EventSearchedPage),
  ],
})
export class EventSearchedPageModule {}
