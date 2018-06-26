import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = 'InfoPage';
  tab4Root = ContactPage;
  tab5Root = 'MyPage';

  constructor(public navCtrl: NavController,) {
    if(window.localStorage.getItem('login') == 'false'){
      this.navCtrl.setRoot('LoginPage');
      
    }
  }
}
