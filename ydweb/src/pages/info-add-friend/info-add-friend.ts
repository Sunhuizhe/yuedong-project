import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP} from '@ionic-native/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the InfoAddFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-add-friend',
  templateUrl: 'info-add-friend.html',
})
export class InfoAddFriendPage {

  inputID;
  userinfo;
  dis:string='none';
  mysocket;
  constructor(public navCtrl: NavController, 
    private http: HTTP,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
      this.mysocket = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoAddFriendPage');
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

  getValue(e){
    // console.log(e.key);
    if(e.key == 'Enter'){
      this.request();
    }
  }

  setValue(e){
    console.log(e.target.value);
    this.inputID = e.target.value;
  }

  request(){
    this.http.post('http://39.107.66.152:8080/chat/searchFriend',{
        friendTel:this.inputID
      },{}).then(res=>{
        // console.log('res',res['data']);

        // var temp = JSON.parse(res['data']);

        if(res['data'] == 0){
          this.presentAlert('此人不存在，请确保输入的手机号正确！');
        }else{
          var socket = this.mysocket;
          var result = res['data'];
          this.navCtrl.push('AboutOrderPage',{socket,result});
        }

      }).catch(err=>{
        console.log('addFriend-请求报错：',err);
      });
  }

}
