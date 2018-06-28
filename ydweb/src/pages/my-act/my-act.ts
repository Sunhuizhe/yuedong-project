import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
import { AboutPage } from '../about/about';
/**
 * Generated class for the MyActPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-act',
  templateUrl: 'my-act.html',
})
export class MyActPage {

  choose: string = 'myself';

  myactitems = [];
  actitems = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private http: HTTP,
    private alertCtrl: AlertController) {
    
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyActPage');

    // var myempty = document.getElementById('myempty');
    // if (this.actitems.length == 0) {
    //   myempty.style.display = 'block';
    // } else {
    //   myempty.style.display = 'none';
    // }

    // var empty = document.getElementById('empty');
    // if (this.myactitems.length == 0) {
    //   empty.style.display = 'block';
    // } else {
    //   empty.style.display = 'none';
    // }
  }

  ionViewWillEnter() {
    this.request();
    // console.log('ionViewWillEnter MyActPage');
    // var that = this;
    // setTimeout(function(){
    //   that.request();
    // },100);
    
  }

  check(str){
    this.request();
    // if(str == 'myself'){
    //   var empty = document.getElementById('empty');
    // if (this.myactitems.length == 0) {
    //   empty.style.display = 'block';
    // } else {
    //   empty.style.display = 'none';
    // }
    // }else{
    //   var myempty = document.getElementById('myempty');
    // if (this.actitems.length == 0) {
    //   myempty.style.display = 'block';
    // } else {
    //   myempty.style.display = 'none';
    // }
    // }
  }

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-我的运动-begin', refresher);

    this.request();

    setTimeout(() => {
      console.log('下拉刷新-我的运动-ended');
      refresher.complete();
    }, 2000);
  }

  request() {

    var userId = localStorage.getItem('userID');


    // 我发起的活动--请求
    this.http.post('http://39.107.66.152:8080/mine/myAddAct', {
      userID: userId
    }, {}).then(res => {
      // console.log('我发起的活动-请求：', res['data']);

      var data = JSON.parse(res['data']);

      // UTC时间处理
      for (var i in data) {
        var empty = document.getElementById('empty');

        // console.log('MyActPage-UTC时间转换调试：', data[i]['actTime']);

        var actTime = new Date(data[i]['actTime']);
        data[i]['actTime'] = actTime.toLocaleString();

        var actCutOffTime = new Date(data[i]['actCutOffTime']);
        data[i]['actCutOffTime'] = actCutOffTime.toLocaleString();

        // console.log('MyActPage-UTC时间转换调试：', data[i]['actTime'], data[i]['actCutOffTime']);

        this.myactitems[i] = data[i];

        if (this.myactitems.length == 0) {
          empty.style.display = 'block';
        } else {
          empty.style.display = 'none';
        }

      }

    }).catch(err => {
      console.log('MyActPage-发起活动请求错误码：', err.status);

      for (var i in err) {
        console.log('MyActPage-发起活动请求报错：', err[i]);
        for (var k in err[i]) {
          console.log(err[i].k, err[i][k]);
        }
      }
    }); 

     // 我参加的活动--请求
     this.http.post('http://39.107.66.152:8080/sport/getJoinAct', {
      userID: userId
    }, {}).then(res => {
      // console.log('我参加的活动-请求：', res['data']);

      this.actitems = [];

      var data = JSON.parse(res['data']);
      var myempty = document.getElementById('myempty');

      // UTC时间处理
      for (var i in data) {
        

        // console.log('MyActPage-UTC时间转换调试：', data[i]['actTime']);

        var actTime = new Date(data[i]['actTime']);
        data[i]['actTime'] = actTime.toLocaleString();

        var actCutOffTime = new Date(data[i]['actCutOffTime']);
        data[i]['actCutOffTime'] = actCutOffTime.toLocaleString();

        // console.log('MyActPage-UTC时间转换调试：', data[i]['actTime'], data[i]['actCutOffTime']);

        this.actitems.push(data[i]);
        // console.log(this.actitems[i]);
        // console.log(this.actitems.length);
      }

      if (this.actitems.length == 0) {
        myempty.style.display = 'block';
      } else {
        myempty.style.display = 'none';
      }

    }).catch(err => {
      console.log('MyActPage-参加活动请求错误码：', err.status);

      for (var i in err) {
        console.log('MyActPage-参加活动请求报错：', err[i]);
        for (var k in err[i]) {
          console.log(err[i].k, err[i][k]);
        }
      }
    }); 


  }

  // 跳转活动详情页
  goAct(item){
    this.navCtrl.push('AboutActPage',item);
  }

  // 跳转活动列表页
  goAbout(){
    this.navCtrl.push(AboutPage);
  }

  // 跳转发起活动页
  goAboutUp() {
    this.navCtrl.push('AboutUpPage');
  }

  // // 参加活动
  // actitems=[
  //   {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
  //   {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
  //   {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
  //   {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
  //   {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'}
  // ]

}
