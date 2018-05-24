import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP} from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the SetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-set',
  templateUrl: 'set.html',
})
export class SetPage {

  userinfo={
    name:'',
    intro:'',
    telnum:''
  };

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
        this.userinfo.telnum = info[0].telNumber;
        console.log(this.userinfo.name,this.userinfo.intro,this.userinfo.telnum);
      }
    }).catch(error => {
      console.log('error status:',error.status);
      this.presentAlert(error.error);
    }); 

  }

  // 跳转修改密码页
  goChange(){
    this.navCtrl.push('ChangepwdPage');
  }

  // 退出登录
  backToLogin(){
    this.navCtrl.setRoot('LoginPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetPage');
  }

}
