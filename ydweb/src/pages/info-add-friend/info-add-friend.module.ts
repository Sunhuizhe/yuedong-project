import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoAddFriendPage } from './info-add-friend';

@NgModule({
  declarations: [
    InfoAddFriendPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoAddFriendPage),
  ],
})
export class InfoAddFriendPageModule {}
