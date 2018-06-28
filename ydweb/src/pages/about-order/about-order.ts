import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the AboutOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var io;
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

  userinfo;
  mysocket;
  constructor(private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {

      var temp = JSON.parse(this.navParams.data.result) ;
      this.userinfo = temp[0];
      // console.log(this.navParams.data);
      // for(var k in this.userinfo){
      //   console.log(k,this.userinfo[k]);
      // }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutOrderPage');

    var node = document.getElementById('myimage');
      node.style.background = 'url(' + this.userinfo.avatar + ')';

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


  // 请求数据
  upData() {

    // const socket = this.mysocket;
    var str = '请求添加您为好友！';
    this.navParams.data.socket.emit('addFriend',window.localStorage.getItem('userID'),this.userinfo.userID,str);
    
    this.presentAlert('请求已发送！');

    this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));
  }

}
