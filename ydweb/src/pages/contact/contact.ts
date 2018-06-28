import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP} from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  items = [];

   // 错误信息提示框
   presentAlert(mes){
    let alert = this.alertCtrl.create({
      // title: 'Low battery',
      subTitle: mes,
      buttons: ['知道了！']
    });
    alert.present();
  }

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private http: HTTP,
  ) {
    this.request();
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter ContactPage');

    this.request();
  }

  goContactUP() {
    this.navCtrl.push('ContactUpPage');
  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-圈子-begin', refresher);

    this.request();

    setTimeout(() => {
      console.log('下拉刷新-圈子-ended');
      refresher.complete();
    }, 2000);
  }


  request(){
    this.http.post('http://39.107.66.152:8080/mine/getCircleList',{
      userID:window.localStorage.getItem('userID')
    },{}).then(res=>{
      // console.log(res['data']);

      this.items = JSON.parse(res['data']);

      for(var i in this.items){
        var time = new Date(this.items[i]['circleTime']).toLocaleString();
        this.items[i]['circleTime'] = time;

        if(this.items[i]['imgURL'] == 'undefined'){
          this.items[i].flag = 'none';
        }else{
          this.items[i].flag = 'block';
        }

      }

    }).catch(err=>{
      console.log('Contact-数据请求报错：',err);
    });
  }


}
