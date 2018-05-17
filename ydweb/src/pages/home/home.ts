import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  icons="infor";

  items=[];
     
  doInfinite(infiniteScoll){
    setTimeout(()=>{
      for(let i=0;i<5;i++){
        this.items.push(this.items.length);
      }
      infiniteScoll.complete();
      if(this.items.length>100){
        infiniteScoll.enable(false);
      }
    },1000);
  }


}