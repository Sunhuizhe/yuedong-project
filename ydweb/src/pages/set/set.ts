import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
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

  userinfo = {
    name: '',
    intro: '',
    telnum: '',
    url: ''
  };

  flag: boolean = true;

  // 下拉刷新
  doRefresh(refresher) {
    console.log('下拉刷新-设置', refresher);

    this.request();

    setTimeout(() => {
      console.log('下拉刷新-设置-ended');
      refresher.complete();
    }, 2000);
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

  // 初始化
  constructor(
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private http: HTTP,
    public navCtrl: NavController,
    public navParams: NavParams) {
    // this.request();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetPage');
    this.request();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter SetPage');
    this.request();
  }

  // 请求
  request() {
    var userId = localStorage.getItem('userID');
    var image = document.getElementById('image');

    this.http.post('http://39.107.66.152:8080/mine', {
      userID: userId
    }, {}).then(data => {
      var info = JSON.parse(data['data']);

      if (info == '0') {
        this.presentAlert('数据请求失败，试试重新打开页面！');
      } else {
        this.userinfo.name = info[0].userName;
        this.userinfo.intro = info[0].signature;
        this.userinfo.telnum = info[0].telNumber;
        this.userinfo.url = info[0].avatar;

        // console.log(this.userinfo.url);

        // image.style.background = "url(" + this.userinfo.url + ")";
        // image.setAttribute('src',info[0].avatar);
        // window.localStorage.setItem('avatar',this.userinfo.url);
        // console.log('设置-头像背景：', image.style.backgroundImage);
      }
    }).catch(error => {
      console.log('设置-error status:', error.status);
      // this.presentAlert(error);
      console.log('设置-请求报错：',error);
    });
  }



  // 跳转修改密码页
  goChange() {
    this.navCtrl.push('ChangepwdPage');
  }

  // 退出登录
  backToLogin() {
    this.navCtrl.setRoot('LoginPage');
    // this.navCtrl.push('LoginPage');
    window.localStorage.setItem('login','false');
  }

  // 修改头像
  presentActionSheet(e) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从相册',
          role: 'destructive',
          handler: () => {
            console.log('SetPage-头像上传-从相册');
            this.changePicture(e);
          }
        },
        {
          text: '拍照',
          handler: () => {
            console.log('SetPage-头像上传-拍照');
            this.changeCamera(e);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('SetPage-头像上传-取消上传');
          }
        }
      ]
    });

    actionSheet.present();
  }

  // 从相册上传
  changePicture(e) {
    var userId = localStorage.getItem('userID');

    const options: CameraOptions = {
      sourceType: 2,
      quality: 100,
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation: true
    }

    let base64Image;
    this.camera.getPicture(options).then((imageData) => {
      base64Image = 'data:image/jpeg;base64,' + imageData;

      this.http.post('http://39.107.66.152:8080/mine/chAvatar', {
        imgData: base64Image,
        userID: userId
      }, {}).then(res => {
        var data = JSON.parse(res['data']);
        this.userinfo.url  = data.avatar;
        
        // e.target.style.background = "url(" + url + ")";
        // e.target.setAttribute('src',);
        // window.localStorage.setItem('avatar',this.userinfo.url);
      }).catch(err => {
        console.log('SetPage-头像上传-从相册-相册调用报错', err);
      });
    }, (err) => {
      // Handle error
      console.log('SetPage-头像上传-从相册-报错:', err);
    });
  }

  // 从相机上传
  changeCamera(e) {

    var userId = localStorage.getItem('userID');
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
    }

    let base64Image;

    this.camera.getPicture(options).then((imageData) => {
      base64Image = 'data:image/jpeg;base64,' + imageData;

      this.http.post('http://39.107.66.152:8080/mine/chAvatar', {
        imgData: base64Image,
        userID: userId
      }, {}).then(res => {
        var data = JSON.parse(res['data']);
        this.userinfo.url  = data.avatar;
        // e.target.style.background = "url(" + url + ")";
        // e.target.setAttribute('src',url);
        // window.localStorage.setItem('avat    ar',this.userinfo.url);
      }).catch(err => {
        console.log('SetPage-头像上传-从相机-相机调用报错:', err);
      });

      // console.log(base64Image);
    }, (err) => {
      // Handle error
      console.log('SetPage-头像上传-从相机-报错:', err);
    });


  }

  // 修改信息的获取
  getValue(e) {
    var id = e.target.parentNode.id,
      value = e.target.value;
    if (id == 'name') {
      this.userinfo.name = value;
    } else {
      this.userinfo.intro = value;
    }

    console.log('SetPage-上传信息获取完毕:',value);

  }

  // 输入框输入控制
  setFlag(e) {
    console.log('SetPage-模式:', e.target.innerHTML);
    var temp = e.target.innerHTML;
    if (temp == '编辑') {
      this.flag = false;
      e.target.innerHTML = '完成';
    } else {
      this.changeInfo();
      this.flag = true;
      e.target.innerHTML = '编辑';
    }
  }

  // 修改信息请求
  changeInfo() {
    var userId = localStorage.getItem('userID');
    // console.log(userId);
    this.http.post('http://39.107.66.152:8080/mine/changeMsg', {
      userID: userId,
      telNumber: this.userinfo.telnum,
      userSign: this.userinfo.intro,
      userName: this.userinfo.name
    }, {}).then(data => {
      var num = data['data'];

      if (num == '1') {
        this.presentAlert('修改成功！');
        window.localStorage.setItem('userName',this.userinfo.name);
      } else {
        this.presentAlert('修改失败，请稍后再试！');
      }
    }).catch(error => {
      console.log('SetPage-修改信息报错：', error);
    });
  }

}

