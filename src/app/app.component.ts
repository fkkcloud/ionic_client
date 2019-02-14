import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Test',
      url: '/test',
      icon: 'phone'
    }
    ,
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
    ,
    {
      title: 'CreateCompany',
      url: '/createcompany',
      icon: 'create'
    }
    ,
    {
      title: 'Company',
      url: '/company',
      icon: 'list-box'
    }
    ,
    {
      title: 'Search',
      url: '/home',
      icon: 'search'
    }
    ,
    {
      title: 'Leaderboard',
      url: '/home',
      icon: 'archive'
    }

  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private stroage: Storage,
    private navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.stroage.get('email').then(loggedIn => {
        console.log("logged in as:" + loggedIn);
        if (loggedIn === null)
        {
          this.navCtrl.navigateRoot('/login');
        }
        else if (loggedIn !== null)
        {
          this.navCtrl.navigateForward('/home');
        }
      });
    });
  }

  logout() {
    this.stroage.remove('email');
    this.navCtrl.navigateRoot('/login');
  }
}
