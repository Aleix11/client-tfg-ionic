import { Component } from '@angular/core';

import {LoadingController, NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public loading: any;

  constructor(
    private platform: Platform,
    private storage: Storage,
    private splashScreen: SplashScreen,
    public navCtrl: NavController,
    public loadingController: LoadingController,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //this.presentLoading();

        this.storage.get('token').then((token) => {
            if(token) {
                this.navCtrl.navigateRoot('/menu/tabs/tab1');
                //this.dismissLoading();
            } else {
                this.navCtrl.navigateRoot('');
                //this.dismissLoading();
            }
        });
    });
  }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            message: 'Please wait...',
            cssClass: 'custom-class custom-loading'
        });
        await this.loading.present();
    }

    private dismissLoading() {
        setTimeout(() => {
           this.loading.dismiss();
        }, 1000);
    }
}
