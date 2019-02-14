import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-createcompany',
  templateUrl: './createcompany.page.html',
  styleUrls: ['./createcompany.page.scss'],
})
export class CreatecompanyPage implements OnInit {

  constructor(
    private companyService: CompanyService, 
    private alertCtrl: AlertController, 
    private toast: ToastController) 
  { 
    this.companyService.getEmail();
  }

  name : String; 
  address : String;
  city : String;
  country : String;
  sector : String;
  website : String;
  userId : any;

  ngOnInit() {
    this.companyService.getUserData()
    .subscribe(res => {
      console.log(res.user);
      this.userId = res.user._id;
    });

  }

  register() {
    this.companyService.createCompany(this.name, this.address, this.city, this.country, this.sector, this.website, this.userId)
      .subscribe(res => {

        if (res.message)
        {
          this.presentToast(res.message, 3000);
        }

        if (res.error)
        {
          this.presentAlert('Error', res.error);
        }

        this.name = ''; 
        this.address = ';'
        this.city = '';
        this.country = '';
        this.sector = '';
        this.website = '';
        //this.userId = '';
      });
  }

  async presentAlert(title : string, subtitle : string) {
    const alert = await this.alertCtrl.create({
      header: title,
      subHeader: subtitle,
      buttons: ['OK']
    });
    return await alert.present();
  }

  async presentToast(msg : string, duration : number) {
    const toast = await this.toast.create({
      message: msg,
      duration: duration,
      position: 'bottom'
    });
    return await toast.present();
  }
}
