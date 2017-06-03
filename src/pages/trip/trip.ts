import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TripPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trip',
  templateUrl: 'trip.html',
})
export class TripPage {

lists: any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: Storage) {
    this.storage.get('trips').then((val) => {
       console.log(val);
       if(val != null){
         this.lists = val;
         
       }
    });      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripPage');
  }

}
