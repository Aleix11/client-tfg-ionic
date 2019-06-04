import { Component } from '@angular/core';

import {NavController, Platform} from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private storage: Storage,
    private splashScreen: SplashScreen,
    public navCtrl: NavController,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

        this.storage.get('token').then((token) => {
            if(token) {
                this.navCtrl.navigateRoot('/menu/tabs/tab1')
            } else {
                this.navCtrl.navigateRoot('')
            }
        });
    });
  }
}
