import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  info:string='群组';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  // 群组
  groupitems=[
    {imgUrl:'../assets/imgs/football.jpg',name:'师大足球群',info:'嗯，好的！'},
    {imgUrl:'../assets/imgs/sport1.jpg',name:'石家庄运动群',info:'我不行，我明天有事，就不去了，下次吧！'}
  ]

  // 好友
  personitems=[
    {imgUrl:'../assets/imgs/sport1.jpg',name:'张三',info:'嗯，好的！'},
    {imgUrl:'../assets/imgs/sport1.jpg',name:'李四',info:'我不行，我明天有事，就不去了，下次吧！'}
  ]

  goDetail(){
    this.navCtrl.push('InfoDetailPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
