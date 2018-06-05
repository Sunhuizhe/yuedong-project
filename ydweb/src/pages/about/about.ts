import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HTTP} from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  actype:string='order';
  name:string="";
  time:string='';
  place:string='';
  number:string='';
  endTime:string='';
  money:string='';
  way:string='';
  actintro:string='';

  // 错误信息提示框
  presentAlert(mes){
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

      this.http.get('http://39.107.66.152:8080/sport',{},{})
      .then(data=>{
        // console.log(data['data']);
        // this.presentAlert(data);
        for(var k in data){
          console.log(data[k]);
        }
      }).catch(error=>{
        // console.log(error);
        this.presentAlert(error);
        for(var k in error){
          console.log(error[k]);
        }
      });
      
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

  setValue(e){
    var tag = e.target.getAttribute('tag') || e.target.innerHTML;
    if(tag == 'AA' || tag == '其他'){
      this.way = e.target.innerHTML;
      console.log(tag);
      console.log(this.way);
    }else{
      this[tag] = e.target.value;
      console.log(tag,this[tag]);
    }
  }

  request(){
    console.log(this.name,this.time,this.place,this.number,this.endTime,this.money,this.way,this.actintro);
  }
  goSite(){
    this.navCtrl.push('AboutSitePage');
  }

  goAct(){
    this.navCtrl.push('AboutActPage');
  }

}
