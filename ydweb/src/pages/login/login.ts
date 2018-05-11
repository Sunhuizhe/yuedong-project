import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HTTP} from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[HTTP]
})
export class LoginPage {

  telNumber:string;
  password:string;

  constructor(private alertCtrl: AlertController,private http: HTTP,public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
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

  // 跳转注册页
  goRegiste(){
    this.navCtrl.push('RegisterPage');
  }

  // 用户名攻取 
  telChange(e){
    console.log('telNumber:',e.target.value);
    this.telNumber = e.target.value;
  }

  // 密码获取
  pwdChange(e){
    console.log('password:',e.target.value);
    this.password = e.target.value;
  }

  // 登录请求
  login(){

    // 本地数据合法性校验
    if(this.telNumber == ''){
      this.presentAlert('用户名不能为空！');
    }else{
      if(this.password == ''){
        this.presentAlert('密码不能为空！');
      }
    }

    // console.log('tel:',this.telNumber,'pwd:',this.password);

    this.http.post('http://39.107.66.152:8080/login',{
      userName:this.telNumber,
      password:this.password
    },{})
    .then(data=>{

      var num = data['data'];

      console.log(typeof num,num);
      if(num == '0'){
        this.presentAlert('用户名不存在！');
      }else if(num == '2') {
        this.presentAlert('密码不正确！');
      }else if(num == '5') {
        this.presentAlert('数据库错误');
      }else{
        // console.log(TabsPage);
        this.navCtrl.push(TabsPage);
        window.localStorage.setItem('userID',num);
        window.localStorage.setItem('login','true');
      }
    }).catch(error => {
      console.log('error status:',error.status);
      this.presentAlert(error.error);
    });
    
  }

}
