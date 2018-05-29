import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP} from '@ionic-native/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
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

  flag:boolean=true;

  // 错误信息提示框
  presentAlert(mes){
    let alert = this.alertCtrl.create({
      // title: 'Low battery',
      subTitle: mes,
      buttons: ['知道了！']
    });
    alert.present();
  }

  // 初始化
  constructor(private imagePicker: ImagePicker,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private alertCtrl: AlertController,
    private http: HTTP,
    public navCtrl: NavController, 
    public navParams: NavParams) {
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

  // 修改头像
  
  presentActionSheet(e) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择图片',
      buttons: [
        {
          text: '从相册',
          role: 'destructive',
          handler: () => {
            console.log('从相册');
            this.changePicture(e);
          }
        },
        {
          text: '拍照',
          handler: () => {
            console.log('拍照');
            this.changeCamera(e);
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
  changePicture(e){
    console.log('1');
    const options: ImagePickerOptions = {
      maximumImagesCount:3
    }

    this.imagePicker.getPictures(options).then((results) => {
      console.log(2);
      for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
      }
    }, (err) => { 
      console.log(err);
    });
  }

  // 从相机上传
  changeCamera(e){
    console.log(e.target.getAttribute('src'));
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }

    let base64Image;
    this.camera.getPicture(options).then((imageData) => {
      base64Image = 'data:image/jpeg;base64,' + imageData;
      e.target.setAttribute('src',base64Image);
      // console.log(base64Image);
     }, (err) => {
      // Handle error
      console.log(err);
     });
  }

  // 修改信息的获取
  getValue(e){
    console.log(e.target.parentNode.id,e.target.value);
    var id = e.target.parentNode.id,
    value = e.target.value;
    if(id == 'name'){
      this.userinfo.name = value;
    }else{
      this.userinfo.intro = value;
    }
  }

  // 输入框输入控制
  setFlag(e){
    console.log(e.target.innerHTML);
    var temp = e.target.innerHTML;

    if(temp == '编辑'){
      this.flag=false;
      e.target.innerHTML = '完成';
    }else{
      this.changeInfo();
      this.flag=true;
      e.target.innerHTML = '编辑';
    }
  }

  // 修改信息请求
  changeInfo(){
    var userId = localStorage.getItem('userID');
    console.log(userId);
    this.http.post('http://39.107.66.152:8080/mine/changeMsg',{
      userID:userId,
      telNumber:this.userinfo.telnum,
      userSign:this.userinfo.intro,
      userName:this.userinfo.name
    },{}).then(data=>{
      var num = data['data'];
      console.log(data['data']);

      if(num == '1'){
        this.presentAlert('修改成功！');
      }else{
        this.presentAlert('修改失败，请稍后再试！');
      }
    }).catch(error=>{
      console.log(error);
      for(var k in error){
        console.log(error[k]);
        if(error[k] instanceof Object){
          for(var i in error[k]){
            console.log(error[k][i]);
          }
        }
      }
      this.presentAlert(error);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetPage');
  }

}
