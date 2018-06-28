import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  actype: string = 'order';
  addressitems = [];
  myactitems = [];

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-约运动-begin', refresher);

    this.request();
    
    setTimeout(() => {
      console.log('下拉刷新-约运动-ended');
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

  constructor(private http: HTTP,
    private alertCtrl: AlertController,
    public navCtrl: NavController) {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AboutPage');

    this.request();

  }

  // 跳转
  goaboutUp(){
    this.navCtrl.push('AboutUpPage');
  }

  request() {
      // 场地请求
      this.http.get('http://39.107.66.152:8080/sport', {}, {})
      .then(data => {

        var info = JSON.parse(data['data']);

        for (var k in info) {
          this.addressitems[k] = info[k];
          // console.log('场地：',this.addressitems[k]);
        }
      }).catch(error => {
        // this.presentAlert(error);
        for (var k in error) {
          console.log(error[k]);
        }
      });

      // 活动请求
      this.http.post('http://39.107.66.152:8080/sport/getActList',{
        userID:'all'
      },{}).then(res=>{
        // console.log(res['data']);
        var data = JSON.parse(res['data']);

        var images = document.getElementsByClassName('item-imgs');
        for(var i in data){
          this.myactitems[i] = data[i];
          // console.log(data[i]['actTime']);
          var actTime = new Date(data[i]['actTime']);
          this.myactitems[i]['actTime'] = actTime.toLocaleString();
          // console.log(date2);
          var actCutOffTime = new Date(data[i]['actCutOffTime']);
          this.myactitems[i]['actCutOffTime'] = actCutOffTime.toLocaleString();

          // images[i].style.background = 'url(' + this.myactitems[i].imgURL + ')';
          // console.log(images[i].style.background);

        }
        // console.log(this.myactitems);
      }).catch(err=>{
        console.log(err);
      });

  }
  goSite(item) {
    this.navCtrl.push('AboutSitePage',item);
  }

  goAct(name) {
    // console.log(name);
    this.navCtrl.push('AboutActPage',name);
  }

}
