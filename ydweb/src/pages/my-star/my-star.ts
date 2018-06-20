import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyStarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-star',
  templateUrl: 'my-star.html',
})
export class MyStarPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyStarPage');
  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-我的收藏-begin', refresher);

    // this.request();

    setTimeout(() => {
      console.log('下拉刷新-我的收藏-ended');
      refresher.complete();
    }, 2000);
  }

  // 参加活动
  actitems = [
    { imgs: 'assets/imgs/launch1.jpg', name: '荧光夜跑', position: '河北师范大学风雨操场', stime: '5月3日19:00', payway: 'AA', number: '不限', etime: '6月3日21:00' },
    { imgs: 'assets/imgs/launch1.jpg', name: '荧光夜跑', position: '河北师范大学风雨操场', stime: '5月3日19:00', payway: 'AA', number: '不限', etime: '6月3日21:00' },
    { imgs: 'assets/imgs/launch1.jpg', name: '荧光夜跑', position: '河北师范大学风雨操场', stime: '5月3日19:00', payway: 'AA', number: '不限', etime: '6月3日21:00' },
    { imgs: 'assets/imgs/launch1.jpg', name: '荧光夜跑', position: '河北师范大学风雨操场', stime: '5月3日19:00', payway: 'AA', number: '不限', etime: '6月3日21:00' },
    { imgs: 'assets/imgs/launch1.jpg', name: '荧光夜跑', position: '河北师范大学风雨操场', stime: '5月3日19:00', payway: 'AA', number: '不限', etime: '6月3日21:00' }
  ]

}
