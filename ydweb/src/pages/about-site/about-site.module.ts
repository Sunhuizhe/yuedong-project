import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutSitePage } from './about-site';

@NgModule({
  declarations: [
    AboutSitePage,
  ],
  imports: [
    IonicPageModule.forChild(AboutSitePage),
  ],
})
export class AboutSitePageModule {}
