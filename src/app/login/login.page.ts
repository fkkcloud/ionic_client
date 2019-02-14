import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RegisterService } from '../service/register.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  loading : any;

  constructor( 
    /*private router : Router,*/
    private navCtrl : NavController,
    private reg : RegisterService,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private storage : Storage
  ) { }

  ngOnInit() {
  }

  registerPage() {
    this.navCtrl.navigateForward(['/register']);  //this.router.navigate(['/register']);
  }

  login() {
    if (this.password !== undefined && this.email !== undefined &&
      this.password !== '' && this.email !== '' && this.password)
    {
      this.showLoading().then( ()=>{
        this.reg.loginUser(this.email, this.password)
        .subscribe(res => {
          this.loading.dismiss();

          if (res.user){
            this.storage.set("email", res.user.email);
            this.navCtrl.navigateForward(['/home']);
          }
          if (res.error){
            this.presentAlert('Login Error', res.error);
          };
        });
        this.email = '';
        this.password = '';
      });
    }
    else
    {
      this.presentAlert('Data Invalid', 'Check your name, password, or email');
    }
  }

  async presentAlert(title : string, subtitle : string) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      buttons: ['OK']
    });
    return await alert.present();
  }

  async showLoading() {
      this.loading = await this.loadingCtrl.create({
        message: 'Authenticating...',
        duration: 3000
      });
      return await this.loading.present();
  }
}