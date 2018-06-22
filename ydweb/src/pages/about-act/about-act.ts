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
  constructor(public navCtrl: NavController,
    private http: HTTP,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.act = navParams.data;

    console.log(this.act.actPeople);

      this.request();

    this.arr = this.act.actPeople.split(',');
    // console.log(arr,this.act.actPeople);
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

  // 错误信息提示框
  presentAlert(mes) {
    let alert = this.alertCtrl.create({
      // title: 'Low battery',
      subTitle: mes,
      buttons: ['知道了！']
    });
    alert.present();
  }

  request(){
    console.log()
    this.http.post('http://39.107.66.152:8080/sport/getActListPeople',{
      list:this.arr
    },{}).then(res=>{
      console.log('res.data:', res['data']);
    }).catch(err=>{
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutActPage');
    var buttons = document.getElementById('buttons');
    for (var i in this.act) {
      if (this.act[i].userID == localStorage.getItem('userID')) {
        buttons.style.display = 'none';
      } else {
        buttons.style.display = 'block';
      }
    }

    for (var i in this.arr) {
      if (window.localStorage.getItem('userID') == this.arr[i]) {
        console.log(typeof this.arr[i]);
        var myButton = document.getElementById('mybutton');
        myButton.setAttribute('disabled', 'disabled');
        myButton.innerHTML = '已报名';
      }
    }
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
