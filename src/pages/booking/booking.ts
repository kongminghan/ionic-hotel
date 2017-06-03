import { ContactPage } from '../contact/contact';
import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the BookingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  prevData: any;
  img_url: any;
  loader: any;

  constructor(
    public navCtrl: NavController, 
    public http: Http,
    public navParams: NavParams, 
    private storage: Storage,
    public loadingCtrl: LoadingController) {
      this.prevData = navParams.get('params1');
      this.img_url = navParams.get('params2');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

  bookNow(){
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

      this.http.post('https://fairytale.000webhostapp.com/hotel/mobile/bookRoom.php', JSON.stringify(this.prevData))
      .subscribe(data => {
        // let rooms = JSON.parse();
        // console.log(data.json());
        let cID = data.json();
        this.loader.dismiss();
        Object.assign(this.prevData, {confirmationID: cID.confirmID, amount: cID.amount});
        this.navCtrl.push(ContactPage, {params1: this.prevData});
      }, error => {
        let errors = JSON.stringify(error.json());
        console.log(errors);
        this.loader.dismiss();
  
        // this.navCtrl.push(AboutPage, {params1: errors, params2: this.loader});
      });
  }

}
