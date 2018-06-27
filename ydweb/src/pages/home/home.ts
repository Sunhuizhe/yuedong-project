import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';

declare var io;
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

      if(window.localStorage.getItem('login') == 'false'){
        this.navCtrl.setRoot('LoginPage');
        
      }

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
    // this.http.get('http://39.107.66.152:8080', {}, {})
    //   .then(res => {
    //     // console.log(res['data']);
    //     var data = JSON.parse(res['data']);

    //     // 数据处理
    //     this.swiper = data[0]['swiper'].substring(1).slice(0, -1).split(',');
    //     this.hotsport = data[0]['hotSport'].substring(1).slice(0, -1).split(',');


    //     for (var i in this.swiper) {

    //       var snode = this.swipers[i];
    //       this.swiper[i] = this.swiper[i].substring(1).slice(0, -1);
    //       // console.log(this.swiper[i]);
    //     }
    //     for (var i in this.hotsport) {
    //       this.hotsport[i] = this.hotsport[i].substring(1).slice(0, -1);
    //       var hnode = this.hotSports[i];
    //       // console.log(this.hotSports[i]);
    //       // console.log(this.hotsport[i]);
    //     }

    //   }).catch(err => {
    //     console.log('HomePage-轮播图请求报错:', err);
    //   });

    // 话题请求
    this.http.get('http://39.107.66.152:8080/goodTopic', {}, {})
      .then(res => {
        this.topicItems = JSON.parse(res['data']);

        for (var i in this.topicItems) {
          var temp = new Date(this.topicItems[i].topicTime);
          var time = temp.toLocaleString();
          this.topicItems[i].topicTime = time;
        }

        // console.log(res['data']);
      }).catch(err => {
        console.log('HomePage-话题请求报错:', err);
      });
  }

  goActClass(e) {

    this.actClass = e.target.getAttribute('tag');
    this.navCtrl.push('HomeActClassPage', this.actClass);
  }

  goTopic(item) {
    this.navCtrl.push('HomeTopicPage', item);
  }

}