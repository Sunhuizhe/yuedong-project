import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyActPage } from './my-act';

@NgModule({
  declarations: [
    MyActPage,
  ],
  imports: [
    IonicPageModule.forChild(MyActPage),
  ],
})
export class MyActPageModule {}
