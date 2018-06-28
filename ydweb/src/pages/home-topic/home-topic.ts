import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the HomeTopicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-topic',
  templateUrl: 'home-topic.html',
})
export class HomeTopicPage {

  item;
  items = [];
  node;
  constructor(public navCtrl: NavController,
    private http: HTTP, 
    private alertCtrl: AlertController,
    public navParams: NavParams) {
    this.item = navParams.data;
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
    console.log('下拉刷新-话题-begin', refresher);

    this.request();

    setTimeout(() => {
      console.log('下拉刷新-话题-ended');
      refresher.complete();
    }, 2000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeTopicPage');
  }

  ionViewWillEnter(){
    console.log('ionViewWillEnter HomeTopicPage');
    this.request();
  }

  request(){
    this.http.post('http://39.107.66.152:8080/comment/getComment',{
      topicID:this.item.topicID
    },{}).then(res=>{
      console.log('HomeTopicPage-话题请求测试打印',res['data']);
      // console.log(this.item.topicID);
      this.items = JSON.parse(res['data']);

      for(var i in this.items){
        var temp = new Date(this.items[i].commentTime);
        this.items[i].commentTime = temp.toLocaleString();
      }

    }).catch(err=>{
      console.log('HomeTpoicPage-话题请求报错：',err);
    });
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

  upLoad(e){
    var val = e.value;
    // console.log(e);
    // console.log('upLoad:',val);

    // 修改信息列表
    // this.info[this.info.length] = {usertype:'self',
    // imgURL:'assets/imgs/QQ1.jpg',
    // information:val};

    this.http.post('http://39.107.66.152:8080/comment/addComment',{
      topicID:this.item.topicID,
      userID:window.localStorage.getItem('userID'),
      content:val
    },{}).then(res=>{
      console.log('HomeTopicPage-添加评论请求测试打印：',res['data']);
      if(res['data'] == 1){
        this.presentAlert('发表成功！');
        this.request();
      }
    })

    // 输入框置空
    e.value='';
    
  }

}
