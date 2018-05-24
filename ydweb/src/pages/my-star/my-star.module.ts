import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyStarPage } from './my-star';

@NgModule({
  declarations: [
    MyStarPage,
  ],
  imports: [
    IonicPageModule.forChild(MyStarPage),
  ],
})
export class MyStarPageModule {}
