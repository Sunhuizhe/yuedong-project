import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutActPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-act',
  templateUrl: 'about-act.html',
})
export class AboutActPage {

  act;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.act = navParams.data;
    console.log(this.act);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutActPage');
  }

  goOrder(){
    this.navCtrl.push('AboutOrderPage');
  }

}
