import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeTopicPage } from './home-topic';

@NgModule({
  declarations: [
    HomeTopicPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeTopicPage),
  ],
})
export class HomeTopicPageModule {}
