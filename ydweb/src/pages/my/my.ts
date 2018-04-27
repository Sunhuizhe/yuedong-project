import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyPage');
  }

  userinfo={
    name:'-留白。',
    intro:'要有最朴素的生活和遥远的梦想，即使明天天寒地冻，路遥马亡。——海子'.slice(0,16)+'...'
  }

  items=[
    {iconname:'md-pulse',title:'我的运动'},
    {iconname:'md-star',title:'我的收藏'},
    {iconname:'ios-call',title:'我要合作'},
    {iconname:'md-information-circle',title:'关于悦动'}
  ]

}
