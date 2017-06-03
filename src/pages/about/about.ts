import { Component } from '@angular/core';
import { DetailPage } from '../detail/detail';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  numRooms: any = 1;
  rooms: any[];
  booking: any = {};
  loader: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public loadingCtrl: LoadingController
    ) {
      let second_rooms = navParams.get('params1');
      this.booking = navParams.get('params2');
      this.rooms = second_rooms;
  }

  addRoom(max){
    if(this.numRooms < 3 && this.numRooms < max)
      this.numRooms ++;
  }

  minusRoom(){
    if(this.numRooms > 1)
      this.numRooms --; 
  }

  bookRoom(room, numRoom){
    let body = {
      numRooms: numRoom,
      startDate: this.booking.startDate,
      endDate: this.booking.endDate,
      numGuest: this.booking.qty,
      room_id: room.room_id,
      img: room.img,
      type: room.type
    }

    console.log(body);
    this.navCtrl.push(DetailPage, {params1: body});
    // this.http.post('https://fairytale.000webhostapp.com/hotel/mobile/checkRoom.php', JSON.stringify(body))
    // .subscribe(data => {
    //   // let rooms = JSON.parse();
    //   // console.log(data.json());
    //   // 
    // }, error => {
    //   let errors = JSON.stringify(error.json());
    //   console.log(errors);
    // });
    // this.loader.dismiss();
  }  
}
