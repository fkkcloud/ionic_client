import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../service/register.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  fullname: string;
  email: string;
  password: string;

  loading: any;

  isShowLoading: boolean;

  constructor( 
    private router : Router,
    private reg : RegisterService,
    private loadingCtrl : LoadingController,
    private alertCtrl : AlertController,
    private storage : Storage
  ) { }

  ngOnInit() {
    this.isShowLoading = false;
  }

  loginPage() {
    this.router.navigate(['/login']);
  }

  userSignup() {
    if (this.fullname !== undefined && this.password !== undefined && this.email !== undefined &&
      this.fullname !== '' && this.password !== '' && this.email !== '')
    {
      this.showLoading().then( ()=> {
        this.reg.registerUser(this.fullname, this.email, this.password)
        .subscribe(res => {
          this.loading.dismiss();

          if (res.user){
            this.storage.set("email", res.user.email);
            this.router.navigate(['/home']);
          }
          if (res.error){
            this.presentAlert('SignUp Error', res.error);
          };
        });
        this.email = '';
        this.password = '';
        this.fullname = '';
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
