import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingPage } from '../booking/booking'

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  myForm: FormGroup;
  prevData: any;
  loader: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public http: Http, 
    private storage: Storage,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder) {
      this.myForm = formBuilder.group({
        firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]+'), Validators.required])],
        lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]+'), Validators.required])],
        address: ['', Validators.compose([Validators.maxLength(100), Validators.required])],
        city: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z ]+'), Validators.required])],
        zip: ['', Validators.compose([Validators.maxLength(5), Validators.pattern('[0-9]+'), Validators.required])],
        country: ['', Validators.compose([Validators.maxLength(15), Validators.pattern('[a-zA-Z]+'), Validators.required])],
        email: ['', Validators.compose([Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/), Validators.required])],
        phone: ['', Validators.compose([Validators.maxLength(14), Validators.pattern('[0-9]+'), Validators.required])]
      });

      this.prevData = navParams.get('params1');
  }

  ionViewDidLoad() {
     this.storage.get('user').then((val) => {
       console.log(val);
       if(val != null){
         this.myForm.setValue({
            firstName: val.first,
            lastName: val.last,
            address: val.address,
            city: val.city,
            zip: val.zip,
            country: val.country,
            email: val.email,
            phone: val.contact
         })
       }
    });
  }

  submitDetail(){
    if(this.myForm.valid){
      let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      console.log("YES");
      
      let firstDate = new Date(this.prevData.endDate);
      let secondDate = new Date(this.prevData.startDate);
      let diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
      let body = {
        start: this.prevData.startDate,
        end: this.prevData.endDate,
        adult: this.prevData.numGuest,
        n_room: this.prevData.numRooms,
        rm_id: this.prevData.room_id,
        result: diffDays,
        name: this.myForm.value.firstName,
        last: this.myForm.value.lastName,
        address: this.myForm.value.address,
        city: this.myForm.value.city,
        zip: this.myForm.value.zip,
        country: this.myForm.value.country,
        email: this.myForm.value.email,
        contact: this.myForm.value.phone,
        type: this.prevData.type
      }

      let img_url = this.prevData.img;

      this.storage.set('user', {
        first: this.myForm.value.firstName,
        last: this.myForm.value.lastName,
        address: this.myForm.value.address,
        city: this.myForm.value.city,
        zip: this.myForm.value.zip,
        country: this.myForm.value.country,
        email: this.myForm.value.email,
        contact: this.myForm.value.phone,
      });

    // this.loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // });
    // this.loader.present();

    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    //   this.http.post('https://fairytale.000webhostapp.com/hotel/mobile/bookRoom.php', JSON.stringify(body))
    //   .subscribe(data => {
    //     // let rooms = JSON.parse();
    //     console.log(data);
    //     this.loader.dismiss();
        
    //     // this.navCtrl.push(AboutPage, {params1: data.json(), params2: body});
    //   }, error => {
    //     let errors = JSON.stringify(error.json());
    //     console.log(errors);
    //     this.loader.dismiss();
  
    //     // this.navCtrl.push(AboutPage, {params1: errors, params2: this.loader});
    //   });
      this.navCtrl.push(BookingPage, { params1: body, params2: img_url });
    }else{
      let toast = this.toastCtrl.create({
        message: 'Please provide valid details.',
        duration: 3000
      });
      toast.present();
    }
  }
}
