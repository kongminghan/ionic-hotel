import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, Navbar } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  @ViewChild(Navbar) navBar: Navbar;
  prevData: any;
  constructor(
    public navCtrl: NavController,
    public navParamas: NavParams,
    public storage: Storage ) {   
      this.prevData = navParamas.get("params1");
      this.storage.get('trips').then((val) => {
       console.log(val);
       if(val != null){
         val.push({
           type: this.prevData.type,
           start: this.prevData.start,
           end: this.prevData.end,
           guests: this.prevData.adult,
           amount: this.prevData.amount,
           numRooms: this.prevData.n_room,
           id: this.prevData.confirmationID
         });
         this.storage.set('trips', val)
       }else{
         let temp: any[] = [];
         temp.push({
           type: this.prevData.type,
           start: this.prevData.start,
           end: this.prevData.end,
           guests: this.prevData.adult,
           amount: this.prevData.amount,
           numRooms: this.prevData.n_room,
           id: this.prevData.confirmationID
         });
         this.storage.set('trips', temp)
       }
    });
  }
  ionViewDidLoad(){
      this.navBar.backButtonClick = (e:UIEvent)=>{
        this.navCtrl.popToRoot();
      }  
  }
}
