import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(public http: HttpClient, private storage: Storage) {}

  email : any;

  getEmail() {
    this.storage.get('email').then(value => {
      console.log("called getEmail then");
      this.email = value;
    });
  }

  getUserData() : Observable<any> {
    //this.getEmail();
    console.log("calling http method");
    return this.http.get(`http://localhost:3000/api/home/${this.email}`);
  }

  // ? means - we have to input this parameter or not
  createCompany(name, address, city, country, sector, website, userId?): Observable<any> {
    return this.http
      .post('http://localhost:3000/api/company/create', {
        name : name, 
        address : address, 
        city : city, 
        country : country, 
        sector : sector, 
        website : website, 
        userId : userId
      });
  }



}
