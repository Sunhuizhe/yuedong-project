import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP} from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {
  
  userinfo={
    name:'',
    intro:''
  };

  // 下拉刷新
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    var userId = localStorage.getItem('userID');
    this.http.post('http://39.107.66.152:8080/mine',{
      userID:userId
    },{}).then(data=>{
      var info = JSON.parse(data['data']);

      if(info == '0'){
        this.presentAlert('数据请求失败，试试重新打开页面！');
      }else{
        this.userinfo.name = info[0].userName;
        this.userinfo.intro = info[0].signature;
        console.log(this.userinfo.name,this.userinfo.intro);
      }
    }).catch(error => {
      console.log('error status:',error.status);
      this.presentAlert(error.error);
    }); 
    
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  // 错误信息提示框
  presentAlert(mes){
    let alert = this.alertCtrl.create({
      // title: 'Low battery',
      subTitle: mes,
      buttons: ['知道了！']
    });
    alert.present();
  }

  constructor(private alertCtrl: AlertController,private http: HTTP,public navCtrl: NavController, public navParams: NavParams) {

    var userId = localStorage.getItem('userID');

    this.http.post('http://39.107.66.152:8080/mine',{
      userID:userId
    },{}).then(data=>{
      var info = JSON.parse(data['data']);

      if(info == '0'){
        this.presentAlert('数据请求失败，试试重新打开页面！');
      }else{
        this.userinfo.name = info[0].userName;
        this.userinfo.intro = info[0].signature;
        console.log(this.userinfo.name,this.userinfo.intro);
      }
    }).catch(error => {
      console.log('error status:',error.status);
      this.presentAlert(error.error);
    }); 

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad MyPage');

  }

  // userinfo={
  //   name:'-留白。',
  //   intro:'要有最朴素的生活和遥远的梦想，即使明天天寒地冻，路遥马亡。——海子'.slice(0,16)+'...'
  // }

  items=[
    {iconname:'md-pulse',title:'我的运动',page:'MyActPage'},
    {iconname:'md-star',title:'我的收藏',page:'MyStarPage'},
    {iconname:'ios-call',title:'我要合作'},
    {iconname:'md-information-circle',title:'关于悦动',page:'MyAboutPage'}
  ]

  goSet(){
    this.navCtrl.push('SetPage');
  }

  goPage(e){
    var page = e.target.getAttribute('id'); 
    console.log(page);
    if(page == 'MyActPage'){
      console.log(page);
      this.navCtrl.push('MyActPage');
    }else if(page == 'MyAboutPage'){
      console.log(page);
      this.navCtrl.push('MyAboutPage');
    }else if(page == 'MyStarPage'){
      console.log(page);
      this.navCtrl.push('MyStarPage');
    }
  }

}
