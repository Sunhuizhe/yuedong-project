import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the AboutOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-order',
  templateUrl: 'about-order.html',
})
export class AboutOrderPage {

  obj = {
    time: '',
    number: 0,
    others: ''
  }

  constructor(private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutOrderPage');
  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-报名-begin', refresher);

    // this.request();

    setTimeout(() => {
      console.log('下拉刷新-报名-ended');
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

  // 获取值
  getValue(e) {
    // console.log(e.target.getAttribute('placeholder'));
    var placeholder = e.target.getAttribute('placeholder');
    var value = e.target.value;
    console.log(placeholder, value);
    if (placeholder == '*时间') {
      this.obj.time = value;
    } else if (placeholder == '*人数') {
      this.obj.number = value;
    } else {
      this.obj.others = value;
    }
  }

  // 请求数据
  upData() {
    if (this.obj.time == '') {
      this.presentAlert('时间为不能为空！');
      console.log(typeof this.obj.number);
    } else {
      if (this.obj.number == 0) {
        this.presentAlert('人数不能为空！')
      } else {
        console.log(this.obj);
      }
    }
    console.log(this.obj);
  }

}
