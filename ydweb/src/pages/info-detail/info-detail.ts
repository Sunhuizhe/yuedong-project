import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-detail',
  templateUrl: 'info-detail.html',
})
export class InfoDetailPage {

  username:string='杜教授';
  flag:true;
  node:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }

  info=[
    {usertype:'others',imgURL:'assets/imgs/QQ.jpg',information:'您好，什么是不良资产'},
    {usertype:'self',imgURL:'assets/imgs/QQ1.jpg',information:'您好，不良资产是指企业的资产尚未处理清楚'},
    {usertype:'others',imgURL:'assets/imgs/QQ.jpg',information:'您好，我暂时不在电脑前，稍后回复您，给您造成的不便十分抱歉！'},
    {usertype:'others',imgURL:'assets/imgs/QQ.jpg',information:'好的，谢谢'},
    {usertype:'self',imgURL:'assets/imgs/QQ1.jpg',information:'不客气！'},
    {usertype:'others',imgURL:'assets/imgs/QQ.jpg',information:'好的，谢谢'},
    {usertype:'others',imgURL:'assets/imgs/QQ.jpg',information:'好的，谢谢'}
  ]

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoDetailPage');
  }

  

  upLoad(e){
    var val = e.value;
    // console.log(e);
    console.log('upLoad:',val);

    // 修改信息列表
    this.info[this.info.length] = {usertype:'self',
    imgURL:'assets/imgs/QQ1.jpg',
    information:val};

    // 输入框置空
    e.value='';

    // 调节页面
    setTimeout(() => {
      var content = document.getElementsByTagName('ion-item');
      // console.log(content);
      console.log(content[content.length-1]);
      content[content.length-1].scrollIntoView();
    }, 100);
    
  }

  getE(e){
    // console.log(e.target,e.key);
    this.node = e.target;
    
    if(e.key == 'Enter'){
      this.upLoad(this.node);
    }
  }

  upTo(){
    this.upLoad(this.node);
    
  }

}
