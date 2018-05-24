import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAboutPage } from './my-about';

@NgModule({
  declarations: [
    MyAboutPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAboutPage),
  ],
})
export class MyAboutPageModule {}
