import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
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
})
export class LoginPage {

  constructor(private http: HTTP,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // 跳转注册页
  goRegiste(){
    this.navCtrl.push('RegisterPage');
  }

  // 登录请求
  login(){
    this.http.post('http://39.107.66.152:8080/login',{},{})
    .then(data=>{
      console.log(data);
    })
  }

}
