import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ActionSheetController } from 'ionic-angular';
/**
 * Generated class for the AboutUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about-up',
  templateUrl: 'about-up.html',
})
export class AboutUpPage {

  name: string = "";
  time: string = '';
  place: string = '';
  number: string = '';
  endTime: string = '';
  money: string = '';
  way: string = '';
  actintro: string = '';
  actClass:string='';
  base64Image:any;

  constructor(public navCtrl: NavController,
    private http: HTTP,
    private alertCtrl: AlertController,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    private camera: Camera) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutUpPage');
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

  // 数据获取
  setValue(e) {
    var tag = e.target.getAttribute('tag') || e.target.innerHTML;
    if (tag == 'AA' || tag == '其他') {
      this.way = e.target.innerHTML;
      // console.log(tag);
      // console.log(this.way);
    } else {
      this[tag] = e.target.value;
      // console.log(tag, this[tag]);
    }
  }

  // 类别获取 
  setSelectValue(e){
    var val = e.target.value;
    this.actClass = val;
    // console.log(this.actClass);
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

  // 发起请求
  request(){

    var userId = localStorage.getItem('userID');
    var sel = document.getElementById('actClass');
    this.actClass = sel['value'];

    var number = parseInt(this.number);
    var id = parseInt(userId);
    // console.log(this.actClass);

    this.http.post('http://39.107.66.152:8080/sport/addAct',{
      userID:id,
      actName:this.name,
      actTime:this.time,
      actPlace:this.place,
      actNum:number,
      actCutOffTime:this.endTime,
      actPrice:this.money,
      actExplain:this.actintro,
      actClass:this.actClass,
      billingMethods:this.way,
      imgData:this.base64Image
    },{}).then(res=>{
      // console.log(res['data']);
      var num = res['data'];
      if(num == '0'){
        this.presentAlert('添加失败，请稍后重试！');
      }else{
        this.presentAlert('添加成功！');
        this.navCtrl.pop();
      }

    }).catch(err=>{
      console.log(err);
      // this.presentAlert(err);
    })
  }

  

}
