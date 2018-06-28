import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the AboutUserinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-userinfo',
  templateUrl: 'about-userinfo.html',
})
export class AboutUserinfoPage {

  userid;
  userinfo = {
    name: '',
    intro: '',
    url: '',
    telNumber:''
  };

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, private http: HTTP,public navParams: NavParams) {
    this.userid = navParams.data;
    this.request();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUserinfoPage');
  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-我的-begin', refresher);

    this.request();

    setTimeout(() => {
      console.log('下拉刷新-我的-ended');
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
    var image = document.getElementById('image');

    this.http.post('http://39.107.66.152:8080/mine', {
      userID: this.userid
    }, {}).then(data => {
      var info = JSON.parse(data['data']);

      if (info == '0') {
        this.presentAlert('数据请求失败，试试重新打开页面！');
      } else {
        this.userinfo.name = info[0].userName;
        this.userinfo.intro = info[0].signature;
        this.userinfo.url = info[0].avatar;
        this.userinfo.telNumber = info[0].telNumber;

        // console.log(this.userinfo.url);
        // console.log(this.userinfo.telNumber);

      }
    }).catch(error => {
      console.log('error status:', error.status);
      // this.presentAlert(error);
    });
  }

}
