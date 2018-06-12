import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HTTP } from '@ionic-native/http';

/**
 * Generated class for the HomeActClassPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-act-class',
  templateUrl: 'home-act-class.html',
})
export class HomeActClassPage {

  actClass:'';
  myactitems;

  constructor(public navCtrl: NavController, 
    private http: HTTP,
    public navParams: NavParams) {
    this.actClass = navParams.data;
    console.log(this.actClass);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeActClassPage');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter AboutPage');

      // 活动请求
      this.http.post('http://39.107.66.152:8080/sport/getActList',{
        userID:'all'
      },{}).then(res=>{
        // console.log(res['data']);
        var data = JSON.parse(res['data']);

        for(var i in data){
          this.myactitems[i] = data[i];
          console.log(data[i]['actTime']);
          var actTime = new Date(data[i]['actTime']);
          this.myactitems[i]['actTime'] = actTime.toLocaleString();
          // console.log(date2);
          var actCutOffTime = new Date(data[i]['actCutOffTime']);
          this.myactitems[i]['actCutOffTime'] = actCutOffTime.toLocaleString();
        }
        // console.log(this.myactitems);
      }).catch(err=>{
        console.log(err);
      })

  }
}
