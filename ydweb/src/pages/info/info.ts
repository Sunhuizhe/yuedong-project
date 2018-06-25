import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP} from '@ionic-native/http';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var io;
@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  info: string = '好友';

  personitems;

  friendArr;

  arr = [];

  myinfo =[];
  mysocket;

  constructor(public navCtrl: NavController,
    private http: HTTP, 
    private alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams) {

    const socket = io.connect('http://39.107.66.152:3000');
    this.mysocket = socket;
    var that = this;


    for(var i in this.arr){
      for(var k in this.arr[i]){
        console.log(this.arr[i][k]);
      }
    }

    window.localStorage.setItem('socket',socket);
    console.log('socket',socket);
    // 连入对话
    socket.on('connect', function () {
      console.log('connect socket on');
      socket.emit('join', window.localStorage.getItem('userID'));
   });

   // 加好友监听
   socket.on('addFriendReq',function(from,to,msg){
    that.http.post('http://39.107.66.152:8080/mine',{
      userID:from
    },{}).then(res=>{
      console.log('from data',res['data']);

      var temp = JSON.parse(res['data']);
      that.friendArr = temp[0];
      that.friendArr.messageFrom = from;
      that.friendArr.messageContent = msg;
      that.arr.push(that.friendArr);
      for(var i in that.friendArr){
        console.log(i,that.friendArr[i]);
      }

    }).catch(err=>{
      console.log('err from:',err);
    });
   });

   // 消息监听
   socket.on('pmsg', function (data) {
    console.log('message socket on:',data.message);
    for(var i in data){
      console.log(i,data[i]);
    }
    // socket.emit('join', window.localStorage.getItem('userID'));
 });

   console.log('info');

   this.request();

   console.log(window.localStorage.getItem('socket'));

  } // constructor

  request(){

    // 好友请求
    this.http.post('http://39.107.66.152:8080/chat/getFriendList',{
      userID:window.localStorage.getItem('userID')
    },{}).then(res=>{
      // console.log(res['data']);

      this.personitems = JSON.parse(res['data']);

    }).catch(err=>{
      console.log('Info-好友列表请求报错：',err);
    });

    // 通知请求
    this.arr = [];
    this.http.post('http://39.107.66.152:8080/chat/getaddFriendList',{
      userID:window.localStorage.getItem('userID')
    },{}).then(res=>{
      console.log('getaddFriendList', res['data']);
      
      var temp = JSON.parse(res['data']);
      this.friendArr = temp;
      // this.friendArr.userID = temp[0].messageFrom;
      // this.friendArr.message = temp[0].messageContent;

      for(var i in this.friendArr){
        console.log('i', this.friendArr[i]);
        var time = new Date(this.friendArr[i]['messageTime']).toLocaleString();
        this.friendArr[i]['messageTime'] = time;
        this.arr.push(this.friendArr[i]);
        for(var k in this.friendArr[i]){
          console.log('i,k', this.friendArr[i][k]);
        }
      }

      // that.arr.push(that.friendArr);

    }).catch(err=>{
      console.log(err);
    });
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

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-消息-begin', refresher);

    this.request();

    setTimeout(() => {
      console.log('下拉刷新-消息-ended');
      refresher.complete();
    }, 2000);
  }

  // 群组
  groupitems = [
    { imgUrl: '../assets/imgs/football.jpg', name: '师大足球群', info: '嗯，好的！' },
    { imgUrl: '../assets/imgs/sport1.jpg', name: '石家庄运动群', info: '我不行，我明天有事，就不去了，下次吧！' }
  ]

  goDetail(id,avatar,name) {

    var socket = this.mysocket;

    this.http.post('http://39.107.66.152:8080/chat/getFriendMessage',{
      userID:window.localStorage.getItem('userID'),
      friendID:id
    },{}).then(res=>{
      // console.log('res.data', res['data']);

      var obj = JSON.parse(res['data']);
      this.myinfo = [];
      for(var i in obj){
        // console.log(obj[i]['class']);
        if(obj[i]['class'] == 'message'){
          this.myinfo.push(obj[i]);
        }
      }

      for(var k in this.myinfo){
        if(this.myinfo[k]['messageFrom'] == window.localStorage.getItem('userID')){
          this.myinfo[k]['usertype'] = 'self';
          this.myinfo[k]['avatar'] = window.localStorage.getItem('avatar');
        }else{
          this.myinfo[k]['usertype'] = 'others';
          this.myinfo[k]['avatar'] = avatar;
        }
      }
      var myinfo = this.myinfo;
      this.navCtrl.push('InfoDetailPage',{id,avatar,socket,name,myinfo});
    }).catch(err=>{
      console.log('InfoDetailPage-消息请求报错：',err);
      for(var k in err){
        console.log(k,err[k]);
        for(var j in err[k]){
          console.log(j,err[k][j]);
        }
      }
    });// post

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }


  goaddFriend(){
    var socket = this.mysocket;
    this.navCtrl.push('InfoAddFriendPage',socket);
  }

  myclick(id,msgid){
    console.log(id);
    let actionSheet = this.actionSheetCtrl.create({
      title: '添加好友',
      buttons: [
        {
          text: '同意',
          role: 'destructive',
          handler: () => {
            console.log('同意添加好友');
            this.agree(id,msgid);
          }
        },
        {
          text: '忽略',
          role: 'cancel',
          handler: () => {
            console.log('忽略添加好友信息');
          }
        }
      ]
    });

    actionSheet.present();
  }

  // 同意加好友
  choose(id,msgid,status){

    if(status != '已处理'){
      this.myclick(id,msgid);
    }
    
  }

  agree(id,msgid){
    console.log(id);
    this.mysocket.emit('addFriendOk',id,window.localStorage.getItem('userID'));
    
    this.http.post('http://39.107.66.152:8080/chat/changeStatus',{
      messageID:msgid
    },{}).then(res=>{
      if(res['data'] == 1){
        this.presentAlert('添加成功！');
        this.request();
      }else{
        this.presentAlert('添加失败，请稍后再试！');
      }
    }).catch(err=>{
      console.log('改变消息status报错：',err);
    });
  }

}
