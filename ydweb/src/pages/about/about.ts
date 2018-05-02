import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  actype:string='order';

  constructor(public navCtrl: NavController) {

  }

  // 场地预约
  addressitems=[
    {imgs:'assets/imgs/order1.jpg',name:'河北师范大学轮滑场',grade:'4.7',orders:'25',position:'河北省石家庄市南二环东路20号',price:'10'},
    {imgs:'assets/imgs/order1.jpg',name:'河北师范大学轮滑场',grade:'4.7',orders:'25',position:'河北省石家庄市南二环东路20号',price:'20'},
    {imgs:'assets/imgs/order1.jpg',name:'河北师范大学轮滑场',grade:'4.7',orders:'25',position:'河北省石家庄市南二环东路20号',price:'30'},
    {imgs:'assets/imgs/order1.jpg',name:'河北师范大学轮滑场',grade:'4.7',orders:'25',position:'河北省石家庄市南二环东路20号',price:'40'},
    {imgs:'assets/imgs/order1.jpg',name:'河北师范大学轮滑场',grade:'4.7',orders:'25',position:'河北省石家庄市南二环东路20号',price:'50'}
  ]

  // 发起活动
  myactitems=[
    {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
    {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
    {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
    {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
    {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'}
  ]
 
  // 参加活动
  actitems=[
    {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
    {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
    {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
    {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'},
    {imgs:'assets/imgs/launch1.jpg',name:'荧光夜跑',position:'河北师范大学风雨操场',stime:'5月3日19:00',payway:'AA',number:'不限',etime:'6月3日21:00'}
  ]
}
