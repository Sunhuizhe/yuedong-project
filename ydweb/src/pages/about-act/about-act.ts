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
  upperID;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.act = navParams.data;

    

    console.log(this.act);
  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-活动详情-begin', refresher);

    // this.request();

    setTimeout(() => {
      console.log('下拉刷新-活动详情-ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutActPage');
    var buttons = document.getElementById('buttons');
    for(var i in this.act){
      if(this.act[i].userID == localStorage.getItem('userID')){
        buttons.style.display = 'none';
      }else{
        buttons.style.display = 'block';
      }
    }
  }

  goOrder() {
    this.navCtrl.push('AboutOrderPage');
  }

}
