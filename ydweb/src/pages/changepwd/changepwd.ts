import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP} from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the ChangepwdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-changepwd',
  templateUrl: 'changepwd.html',
})
export class ChangepwdPage {

  oldpassword:string='';
  password:string='';
  repassword:string='';

  constructor(private alertCtrl: AlertController,
    private http: HTTP,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepwdPage');
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

    // 返回
    goBack(){
      this.navCtrl.pop();
    }

    // 原密码攻取 
    telChange(e){
      console.log('oldpassword:',e.target.value);
      this.oldpassword = e.target.value;
    }
  
    // 密码获取
    pwdChange(e){
      console.log('password:',e.target.value);
      this.password = e.target.value;
    }
  
    // 确认密码获取
    repwdChange(e){
      console.log('repassword:',e.target.value);
      this.repassword = e.target.value;
    }

  // 数据合法性校验
  registe(){

    // 正则判断手机号码合法性
    var pwdreg = /^(\w){6,20}$/;
    // 本地数据合法性校验
    // 用户名验证
    if(this.oldpassword == ''){
      this.presentAlert('原密码不能为空！');
    }else if(!pwdreg.test(this.oldpassword)){
      this.presentAlert('密码必须是6-20位数字、字母、下划线！');
    }else{
      // 密码验证
      if(this.password == ''){
        this.presentAlert('新密码不能为空！');
      }else if(!pwdreg.test(this.password)){
        this.presentAlert('密码必须是6-20位数字、字母、下划线！');
      }
      else{
        // 确认密码验证
        if(this.repassword == ''){
          this.presentAlert('请再次确认密码！');
        }else if(this.password != this.repassword){
          this.presentAlert('两次输入密码不符，请重新输入！');
        }else{
          var userId = localStorage.getItem('userID');
          // console.log(userId);
          this.http.post('http://39.107.66.152:8080/mine/changePwd',{
            userID:userId,
            originPwd:this.oldpassword,
            newPwd:this.password
          },{})
          .then(data=>{

            var num = data['data'];

            // console.log(typeof num,num);
            if(num == '0'){
              this.presentAlert('修改失败！');
            }else if(num == '5') {
              this.presentAlert('数据库错误！');
            }else if(num == '2'){
              this.presentAlert('原密码错误！');
            }else{
              this.presentAlert('修改成功！');
              this.navCtrl.setRoot('LoginPage');
            }
          }).catch(error => {
            console.log('error status:',error.status);
            // this.presentAlert(error.error);
          }); // post
        } // else-repassword
      } // else-password
    } // else-username
  } // login()

}
