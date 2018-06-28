import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  telNumber: string = '';
  password: string = '';
  repassword: string = '';

  constructor(private alertCtrl: AlertController, private http: HTTP, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // 错误信息提示框
  presentAlert(mes) {
    let alert = this.alertCtrl.create({
      subTitle: mes,
      buttons: ['知道了！']
    });
    alert.present();
  }

  // 用户名获取 
  telChange(e) {
    console.log('telNumber:', e.target.value);
    this.telNumber = e.target.value;
    console.log('RegisterPage-用户名获取成功');
  }

  // 密码获取
  pwdChange(e) {
    console.log('password:', e.target.value);
    this.password = e.target.value;
  }

  // 确认密码获取
  repwdChange(e) {
    console.log('repassword:', e.target.value);
    this.repassword = e.target.value;
  }

  // 跳转登录页
  goLogin() {
    this.navCtrl.push('LoginPage');
  }

  // 注册请求
  registe() {

    // 正则判断手机号码合法性
    var telreg = /^((1[3578][0-9]{1})+\d{8})$/;
    var pwdreg = /^(\w){6,20}$/;
    // 本地数据合法性校验
    // 用户名验证
    if (this.telNumber == '') {
      this.presentAlert('用户名不能为空！');
    } else if (this.telNumber.length != 11) {
      this.presentAlert('请正确输入11位手机号！');
    } else if (!telreg.test(this.telNumber)) {
      this.presentAlert('请输入有效的11位手机号！');
    } else {
      // 密码验证
      if (this.password == '') {
        this.presentAlert('密码不能为空！');
      } else if (!pwdreg.test(this.password)) {
        this.presentAlert('密码必须是6-20位数字、字母、下划线！');
      }
      else {
        // 确认密码验证
        if (this.repassword == '') {
          this.presentAlert('请再次确认密码！');
        } else if (this.password != this.repassword) {
          this.presentAlert('两次输入密码不符，请重新输入！');
        } else {
          this.http.post('http://39.107.66.152:8080/register', {
            telNumber: this.telNumber,
            password: this.password
          }, {})
            .then(data => {

              var num = data['data'];

              // console.log(typeof num, num);
              if (num == '0') {
                this.presentAlert('该手机号已经注册！');
              } else if (num == '5') {
                this.presentAlert('数据库错误！');
              } else {
                this.navCtrl.push('LoginPage');
              }
            }).catch(error => {
              console.log('RegisterPage-请求错误码:', error.status);
              console.log('RegisterPage-请求报错：', error);
            }); // post
        } // else-repassword
      } // else-password
    } // else-username
  } // login()

}
