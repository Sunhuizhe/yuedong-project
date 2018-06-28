import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the ContactUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact-up',
  templateUrl: 'contact-up.html',
})
export class ContactUpPage {

  // userinfo = {
  //   name: '',
  //   time: '',
  //   content: '',
  //   image: '',
  //   imgslength: 2,
  //   imgs: []
  // }
  userinfo;
  content: '';
  base64Image: any;
  username:string= '';
  avatarURL:string= '';

  constructor(public navCtrl: NavController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private http: HTTP,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUpPage');

      this.username = window.localStorage.getItem('userName');
      this.avatarURL = window.localStorage.getItem('avatar');

  }

  // 图片上传
  pictureLoad() {

    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从相册',
          role: 'destructive',
          handler: () => {
            console.log('从相册');
            this.changePicture();
          }
        },
        {
          text: '拍照',
          handler: () => {
            console.log('拍照');
            this.changeCamera();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('取消上传');
          }
        }
      ]
    });

    actionSheet.present();
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

  // 从相册上传
  changePicture() {

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

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      var node = document.getElementById('addImage');
      var node2 = document.getElementById('image');
      node.style.display = 'none';
      node2.style.display = 'block';
      // node2.style.background = 'url(' + this.base64Image + ')';
      node2.setAttribute('src',this.base64Image);

    }, (err) => {
      // Handle error
      console.log('err1:', err);
    });
  }

  // 从相机上传
  changeCamera() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      var node = document.getElementById('addImage');
      var node2 = document.getElementById('image');
      node.style.display = 'none';
      node2.style.display = 'block';
      // node2.style.background = 'url(' + this.base64Image + ')';
      node2.setAttribute('src',this.base64Image);
    }, (err) => {
      // Handle error
      console.log(err);
    });


  }


  // 数据获取 
  setValue(e) {
    console.log(e.target.value);
    this.content = e.target.value;
  }

  // 请求数据
  request() {

// console.log(this.content);  
    if (this.content == null || this.content == '') {
      this.presentAlert('请填写内容再发表！');
    } else {
      // 上传数据请求
      this.http.post('http://39.107.66.152:8080/mine/sportCircle', {
        userID: window.localStorage.getItem('userID'),
        imgData: this.base64Image,
        userName: this.username,
        avatar: this.avatarURL,
        content: this.content
      }, {}).then(res => {
        // console.log(res['data']);

        if (res['data'] == 0) {
          this.presentAlert('发表失败，请稍后再试！');
        } else {
          this.presentAlert('发表成功！');
          this.navCtrl.pop();
        }

      }).catch(err => {
        console.log('ContactUp-数据上传请求报错：', err);
      });
    } // else

  }



}
