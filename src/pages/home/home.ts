import { AboutPage } from '../about/about';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import 'moment-timezone';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

search: any = {};
minDate: any;
minDateEnd: any;
loader: any;

  constructor(
    public navCtrl: NavController,
    public http: Http,
    public storage: Storage,
    public loadingCtrl: LoadingController
    ) {
        let now = moment();
        now.set({hour: 14, minute: 0, second: 0, millisecond: 0});
        let temp = moment(now.format(), moment.ISO_8601).format();
        this.minDate = temp;
        console.log(this.minDate);
        this.search.startDate =  temp;

        const tomorrow = moment();
        tomorrow.add(1, 'day');
        this.minDateEnd = moment(tomorrow.format(), moment.ISO_8601).format();
        tomorrow.set({hour: 10, minute: 0, second: 0, millisecond: 0});
        this.search.endDate = moment(tomorrow.format(), moment.ISO_8601).format();
        this.search.guest = 1;

        // this.storage.clear();

      }

  addGuest(){
    if(this.search.guest < 15)
      this.search.guest ++;
  }

  minusGuest(){
    if(this.search.guest > 1)
      this.search.guest --; 
  }  
  
  searchRoom(room){
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let body = {
      qty: room.guest,
      startDate: moment(room.startDate).format("YYYY-MM-DD HH:mm:ss"),
      endDate: moment(room.endDate).format("YYYY-MM-DD HH:mm:ss")
    }

    this.http.post('https://fairytale.000webhostapp.com/hotel/mobile/checkRoom.php', JSON.stringify(body))
    .subscribe(data => {
      // let rooms = JSON.parse();
      console.log(data.json());
      this.loader.dismiss();    
      this.navCtrl.push(AboutPage, {params1: data.json(), params2: body});
    }, error => {
      let errors = JSON.stringify(error.json());
      console.log(errors);
      this.loader.dismiss();
      
      // this.navCtrl.push(AboutPage, {params1: errors, params2: this.loader});
    });
  }

  onClose(){
    const updateDate = new Date(this.search.startDate);
    updateDate.setDate(updateDate.getDate()+1);
    this.minDateEnd = updateDate.toISOString();
    this.search.endDate = updateDate.toISOString();
  }
}
