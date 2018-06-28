import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Thumbnail } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';

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
  arr;
  namearr = [];
  flag;
  constructor(public navCtrl: NavController,
    private http: HTTP,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.act = navParams.data;

    // console.log(this.act.actPeople);

    // var buttons = document.getElementById('buttons');
    // for (var i in this.act) {
    //   if (this.act[i].userID == localStorage.getItem('userID')) {
    //     this.flag = 'none';
    //   } else {
    //     this.flag = 'block';
    //   }
    // }


    // this.act.actPeople = "'" + this.act.actPeople + "'";
    // console.log(typeof this.act.actPeople);
    this.arr = this.act.actPeople.split(',');

    // console.log(this.arr,this.act.actPeople);
    // console.log('this.arr instanceof Array' ,this.arr instanceof Array);

    this.request();

  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-活动详情-begin', refresher);

    this.request();

    setTimeout(() => {
      console.log('下拉刷新-活动详情-ended');
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

  request() {
    // var str = '1,3,10';
    this.http.post('http://39.107.66.152:8080/sport/getActListPeople', {
      str: this.act.actPeople
    }, {}).then(res => {
      this.namearr = [];
      // console.log('res.data:', res['data']);
      var t = JSON.parse(res['data']);
      var temp = t;
      for (var i in temp) {
        // console.log('i', i, temp[i]);
        this.namearr.push(temp[i]);
        // console.log('push');
        for (var k in temp[i]) {
          // console.log('i,k', k, temp[i][k]);
        }
      }
    }).catch(err => {
      console.log('userName请求报错：', err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutActPage');

    var date = new Date().toLocaleString();
    // console.log(date, date > this.act.actCutOffTime);

    for (var i in this.arr) {
      var myButton = document.getElementById('mybutton');
      if (date > this.act.actCutOffTime) {
          myButton.setAttribute('disabled', 'disabled');
          myButton.innerHTML = '已截止';
        }else  if (window.localStorage.getItem('userID') == this.arr[i]) {
          myButton.setAttribute('disabled', 'disabled');
          myButton.innerHTML = '已报名';
        }
      }
    }
  

  goOrderTwo(id) {

    this.navCtrl.push('AboutUserinfoPage', id);

  }

  goOrder() {
    this.http.post('http://39.107.66.152:8080/sport/signUpAct', {
      actID: this.act.actID,
      userID: window.localStorage.getItem('userID')
    }, {}).then(res => {
      console.log('请求报名');

      if (res['data'] == 1) {
        this.presentAlert('报名成功！');
        var myButton = document.getElementById('mybutton');
        myButton.setAttribute('disabled', 'disabled');
        myButton.innerHTML = '已报名';
        this.request();
      } else if (res['data'] == 2) {
        this.presentAlert('人数已满，再看看其他的活动吧！');
      } else {
        this.presentAlert('报名失败，请稍后再试！');
      }

    }).catch(err => {
      console.log('报名申请报错：', err);
    })
  }

}
