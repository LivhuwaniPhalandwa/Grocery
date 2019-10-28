import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
  quotes :any;
  constructor(private socialSharing: SocialSharing,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SharePage');
  }
  compilemsg(index):string{
    var msg = this.quotes[index].content + "-" + this.quotes[index].title ;
    return msg.concat(" \n Sent from my Awesome App !");
  }
  whatsappShare(index){
    var msg  = this.compilemsg(index);
     this.socialSharing.shareViaWhatsApp(msg, null, null);
   }
   regularShare(index){
    var msg = this.compilemsg(index);
    this.socialSharing.share(msg, null, null, null);
  }
  twitterShare(index){
    var msg  = this.compilemsg(index);
    this.socialSharing.shareViaTwitter(msg, null, null);
  }
  facebookShare(index){
    var msg  = this.compilemsg(index);
     this.socialSharing.shareViaFacebook(msg, null, null);
   }
}
