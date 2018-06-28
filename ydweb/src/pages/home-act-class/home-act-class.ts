import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the HomeActClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-act-class',
  templateUrl: 'home-act-class.html',
})
export class HomeActClassPage {

  actClass: '';
  myactitems = [];
  otherAct = [];

  constructor(public navCtrl: NavController,
    private http: HTTP,
    private alertCtrl: AlertController,
    public navParams: NavParams) {

    this.actClass = navParams.data;
  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-热门运动-begin', refresher);

    this.request();

    setTimeout(() => {
      console.log('下拉刷新-热门运动-ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeActClassPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AboutPage');
    this.request();
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

  // 请求
  request() {

    // 数据置空
    this.otherAct = [];
    this.myactitems = [];

    // 活动请求
    this.http.post('http://39.107.66.152:8080/goodActInfo', {
      className: this.actClass
    }, {}).then(res => {
      // console.log(res['data']);
      var data = JSON.parse(res['data']);
      // this.myactitems = data;
      for (var i in data) {

        // console.log(data[i]['actTime']);
        var actTime = new Date(data[i]['actTime']);
        data[i]['actTime'] = actTime.toLocaleString();
        // this.myactitems[i]['actTime'] = actTime.toLocaleString();
        // console.log(date2);
        var actCutOffTime = new Date(data[i]['actCutOffTime']);
        data[i]['actCutOffTime'] = actCutOffTime.toLocaleString();
        // this.myactitems[i]['actCutOffTime'] = actCutOffTime.toLocaleString();

        // console.log('类别：', data[i].actClass);

        if (data[i].actClass == '其他') {
          // console.log(data[i].actClass == '其他', i);
          this.otherAct.push(data[i]);
        } else {
          // console.log(data[i].actClass == '其他', i);
          this.myactitems.push(data[i]);
        }
      }
      if (this.myactitems.length != 0) {
        var empty = document.getElementById('empty');
        empty.style.display = 'none';
      }
      // console.log(this.myactitems);
    }).catch(err => {
      console.log('err:', err);
      // this.presentAlert(err);
    });

    // for (var k in this.myactitems) {
    //   // console.log(this.myactitems[k]);
    // }
  }

  // 跳转添加活动页
  goAboutUp() {
    this.navCtrl.push('AboutUpPage');
  }

  goAct(item) {
    this.navCtrl.push('AboutActPage', item);
  }

}
