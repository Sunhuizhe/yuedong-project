import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';

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

  userinfo = {
    name: '',
    time: '',
    content: '',
    image: '',
    imgslength: 2,
    imgs: []
  }
  base64Image: any;

  constructor(public navCtrl: NavController,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUpPage');
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
      node2.style.background = 'url(' + this.base64Image + ')';

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
      node2.style.background = 'url(' + this.base64Image + ')';
    }, (err) => {
      // Handle error
      console.log(err);
    });


  }


  // 数据获取 
  setValue(e) {
    console.log(e.target.value);
    this.userinfo.content = e.target.value;
  }

  // 请求数据
  request() {

  }

}
