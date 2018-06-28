import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP} from '@ionic-native/http';

/**
 * Generated class for the InfoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-detail',
  templateUrl: 'info-detail.html',
})
export class InfoDetailPage {

  username;
  flag:true;
  node:any;
  friendID;
  avatar;
  info = [];
  mysocket;

  constructor(public navCtrl: NavController, 
    private http: HTTP,
    public navParams: NavParams) {
      
      var that = this;

      this.friendID = navParams.data.id;
      // console.log(navParams.data.id);
      this.avatar = navParams.data.avatar;
      this.username = navParams.data.name;
      this.info = navParams.data.myinfo;

      navParams.data.socket.on('pmsg', function (from,to,msg) {
        console.log('message socket on:',msg);

        // console.log(this,that.info);
        // 修改信息列表
        that.info.push({usertype:'others',
        avatar:that.avatar,
        messageContent:msg});

      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoDetailPage');
    var content = document.getElementsByTagName('ion-item');
      content[content.length-1].scrollIntoView();
    this.request();
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter InfoDetailPage');
    this.request();
  }

  upLoad(e){
    var val = e.value;
    // console.log(e);
    // console.log('upLoad:',val);

    // 发送消息
    this.navParams.data.socket.emit('private_message',
    window.localStorage.getItem('userID'),
    this.friendID,
    val
    );

    // 修改信息列表
    this.info[this.info.length] = {usertype:'self',
    avatar:window.localStorage.getItem('avatar'),
    messageContent:val};

    // console.log('avatar', window.localStorage.getItem('avatar'));

    // 输入框置空
    e.value='';

    // 调节页面
    setTimeout(() => {
      var content = document.getElementsByTagName('ion-item');
      content[content.length-1].scrollIntoView();
    }, 100);
    
  }

  getE(e){
    // console.log(e.target,e.key);
    this.node = e.target;
    
    if(e.key == 'Enter'){
      this.upLoad(this.node);
    }
  }

  upTo(){
    this.upLoad(this.node); 
    
  }

  request(){
    // this.http.post('http://39.107.66.152:8080/chat/getFriendMessage',{
    //   userID:window.localStorage.getItem('userID'),
    //   friendID:this.navParams.data.id
    // },{}).then(res=>{
    //   // console.log('res.data', res['data']);

    //   var obj = JSON.parse(res['data']);
    //   this.info = [];
    //   for(var i in obj){
    //     // console.log(obj[i]['class']);
    //     if(obj[i]['class'] == 'message'){
    //       this.info.push(obj[i]);
    //     }
    //   }

    //   for(var k in this.info){
    //     if(this.info[k]['messageFrom'] == window.localStorage.getItem('userID')){
    //       this.info[k]['usertype'] = 'self';
    //       this.info[k]['avatar'] = window.localStorage.getItem('avatar');
    //     }else{
    //       this.info[k]['usertype'] = 'others';
    //       this.info[k]['avatar'] = this.avatar;
    //     }
    //     // console.log(this.info[k]['usertype']);
    //     // console.log(this.info[k]['avatar']);
    //   }

    // }).catch(err=>{
    //   console.log('InfoDetailPage-消息请求报错：',err);
    //   for(var k in err){
    //     console.log(k,err[k]);
    //     for(var j in err[k]){
    //       console.log(j,err[k][j]);
    //     }
    //   }
    // });// post
  }
}
