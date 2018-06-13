import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-preview-image',
  templateUrl: 'preview-image.html',
})
export class PreviewImagePage {

  urlfotoprincipal:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
    this.urlfotoprincipal = this.navParams.get('img');
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
