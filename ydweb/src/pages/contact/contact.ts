import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  items = [
    {
      name: '如魔似佛像我',
      time: '今天 09：08',
      content: '我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！',
      image: 'assets/imgs/QQ1.jpg',
      imgslength:9,
      imgs: [
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
      ]
    },
    {
      name: '如魔似佛像我',
      time: '今天 09：08',
      content: '我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！',
      image: 'assets/imgs/QQ.jpg',
      imgslength:1,
      imgs: [
        { url: 'assets/imgs/login.jpg' },
      ]
    },
    {
      name: '如魔似佛像我',
      time: '今天 09：08',
      content: '我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！',
      image: 'assets/imgs/QQ.jpg',
      imgslength:4,
      imgs: [
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
      ]
    },
    {
      name: '如魔似佛像我',
      time: '今天 09：08',
      content: '我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！',
      image: 'assets/imgs/QQ1.jpg',
      imgslength:6,
      imgs: [
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
      ] // imgs
    }, // item
    {
      name: '如魔似佛像我',
      time: '今天 09：08',
      content: '我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！我想带你去游山玩水，看那落霞与孤鹜齐飞！',
      image: 'assets/imgs/QQ1.jpg',
      imgslength:2,
      imgs: [
        { url: 'assets/imgs/login.jpg' },
        { url: 'assets/imgs/login.png' },
      ] // imgs
    } // item
  ] // items

  constructor(public navCtrl: NavController) {

  }

  goContactUP(){
    this.navCtrl.push('ContactUpPage');
  }


  



}
