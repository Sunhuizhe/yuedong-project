import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  swiper = [];
  hotsport = [];
  swipers;
  hotSports;
  actClass = '';

  // 话题列表定义
  topicItems = [];

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private http: HTTP) {

    this.swipers = document.getElementsByClassName('swiper');
    this.hotSports = document.getElementsByClassName('hotSport');
    this.request();
  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-首页-begin', refresher);

    this.request();

    setTimeout(() => {
      console.log('下拉刷新-首页-ended');
      refresher.complete();
    }, 2000);
  }

  // 错误信息提示框
  presentAlert(mes) {
    let alert = this.alertCtrl.create({
      // title: 'Low battery',
      subTitle: mes,
      buttons: ['知道了！']
    });
    alert.present();
  }



  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');

    this.request();
  }

  request() {
    // 轮播图片的请求
    this.http.get('http://39.107.66.152:8080', {}, {})
      .then(res => {
        // console.log(res['data']);
        var data = JSON.parse(res['data']);

        // 数据处理
        this.swiper = data[0]['swiper'].substring(1).slice(0, -1).split(',');
        this.hotsport = data[0]['hotSport'].substring(1).slice(0, -1).split(',');


        for (var i in this.swiper) {

          var snode = this.swipers[i];
          this.swiper[i] = this.swiper[i].substring(1).slice(0, -1);
          console.log(this.swiper[i]);
        }
        for (var i in this.hotsport) {
          this.hotsport[i] = this.hotsport[i].substring(1).slice(0, -1);
          var hnode = this.hotSports[i];
          console.log(this.hotSports[i]);
          console.log(this.hotsport[i]);
        }

      }).catch(err => {
        console.log('http err2:', err);
        this.presentAlert(err);
      });

    // 话题请求
    this.http.get('http://39.107.66.152:8080/goodTopic', {}, {})
      .then(res => {
        this.topicItems = JSON.parse(res['data']);
        console.log(res['data']);
      }).catch(err => {
        console.log('http goodTopic err:', err);
      });
  }

  goActClass(e) {

    this.actClass = e.target.getAttribute('tag');
    // console.log(this.actClass);

    this.navCtrl.push('HomeActClassPage', this.actClass);
  }

  goTopic(item) {
    this.navCtrl.push('HomeTopicPage', item);
  }

}