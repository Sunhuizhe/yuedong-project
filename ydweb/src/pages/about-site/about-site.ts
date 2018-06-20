import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
/**
 * Generated class for the AboutSitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-site',
  templateUrl: 'about-site.html',
})
export class AboutSitePage {

  // 信息列表
  infoItems;
  // {
  //   name:'河北师范大学-白馆',
  //   grade:4.7,
  //   time:'8:00-21:00',
  //   tel:'15703286327',
  //   place:'石家庄市裕华区南二环东路20号，河北师范大学新校区',
  //   intro:'室内场地,活动请穿软底运动鞋,爱护场地设施，严禁在场内吸烟、吃东西，乱扔废弃物,场地服务人员为学生志愿者，进场人员要服从志愿者的管理和安排'
  // };

  constructor(private geolocation: Geolocation,
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.infoItems = navParams.data;
  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-场地详情-begin', refresher);

    // this.request();

    setTimeout(() => {
      console.log('下拉刷新-场地详情-ended');
      refresher.complete();
    }, 2000);
  }

  // 跳转申请页
  goOrder() {
    this.navCtrl.push('AboutOrderPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutSitePage');
  }



}
