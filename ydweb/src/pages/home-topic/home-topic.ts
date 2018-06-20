import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HomeTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-topic',
  templateUrl: 'home-topic.html',
})
export class HomeTopicPage {

  item;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.data;
  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-话题-begin', refresher);

    // this.request();

    setTimeout(() => {
      console.log('下拉刷新-话题-ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeTopicPage');
  }

  items = [
    {
      name: '如魔似佛像我',
      time: '今天 09：08',
      content: '我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！',
      image: 'assets/imgs/QQ1.jpg',
      imgslength: 9,
      imgs: [
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
      ]
    },
    {
      name: '如魔似佛像我',
      time: '今天 09：08',
      content: '我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！',
      image: 'assets/imgs/QQ.jpg',
      imgslength: 1,
      imgs: [
        { url: 'assets/imgs/login.jpg' },
      ]
    },
    {
      name: '如魔似佛像我',
      time: '今天 09：08',
      content: '我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！',
      image: 'assets/imgs/QQ.jpg',
      imgslength: 4,
      imgs: [
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
      ]
    },
    {
      name: '如魔似佛像我',
      time: '今天 09：08',
      content: '我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！',
      image: 'assets/imgs/QQ1.jpg',
      imgslength: 6,
      imgs: [
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
      ] // imgs
    }, // item
    {
      name: '如魔似佛像我',
      time: '今天 09：08',
      content: '我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！',
      image: 'assets/imgs/QQ1.jpg',
      imgslength: 2,
      imgs: [
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
      ] // imgs
    } // item
  ] // items

}
