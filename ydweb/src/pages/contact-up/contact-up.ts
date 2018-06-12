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
    imgslength:2,
    imgs: []
  } 

  constructor(public navCtrl: NavController,
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController,    
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUpPage');
  }

  // 从相册上传
  changePicture(e) {
    console.log('1');
    const options: CameraOptions = {
      sourceType:2,
      quality: 100,
      destinationType: 0,
      encodingType: 0,
      mediaType: 0,
      allowEdit:true,
      targetWidth:300,
      targetHeight:300,
      correctOrientation:true
    }

    let base64Image,base64;
    this.camera.getPicture(options).then((imageData) => {
      base64Image = 'data:image/jpeg;base64,' + imageData;
      e.target.setAttribute('src', base64Image);      
    }, (err) => {
      // Handle error
      console.log('err1:',err);
    });


  }

  // 从相机上传
  changeCamera(e) {
    console.log(e.target.getAttribute('src'));
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit:true,
      // targetWidth:300,
      // targetHeight:300,
    }

    let base64Image;

    this.camera.getPicture(options).then((imageData) => {
      base64Image = 'data:image/jpeg;base64,' + imageData;
      e.target.setAttribute('src', base64Image);

      // this.http.post('http://39.107.66.152:8080/mine/avatar',{},{
      //   'Content-Type':'application/x-www-form-urlencoded'
      // }).then(res=>{
      //   console.log('res:',res);
      // },err=>{
      //   console.log('err:',err);
      //   for(var k in err){
      //     console.log(k,err[k]);
      //   }
      // });

      // console.log(base64Image);
    }, (err) => {
      // Handle error
      console.log(err);
    });

    
  }

  // 图片上传
  upLoadPicture() {
    // let actionSheet = this.actionSheetCtrl.create({
    //   title: '选择图片',
    //   buttons: [
    //     {
    //       text: '从相册',
    //       role: 'destructive',
    //       handler: () => {
    //         console.log('从相册');
    //         this.changePicture(e);
    //       }
    //     },
    //     {
    //       text: '拍照',
    //       handler: () => {
    //         console.log('拍照');
    //         this.changeCamera(e);
    //       }
    //     },
    //     {
    //       text: '取消',
    //       role: 'cancel',
    //       handler: () => {
    //         console.log('取消上传');
    //       }
    //     }
    //   ]
    // });

    // actionSheet.present();
  }

  // 数据获取 
  setValue(e){
    console.log(e.target.value);
    this.userinfo.content = e.target.value;
  }

  // 请求数据
  request(){
    
  }

}
