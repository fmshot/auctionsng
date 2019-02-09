import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
// import {Observable};
// import 'rxjs/add/operator/map';\
// import 'rxjs/add operator/toPromise';

import { Registration } from './registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  selectedRegistration: Registration;
  registrations: Registration[];
  readonly baseURL = 'http://localhost:3000/registrations';
  // URLS = {
  //   regist:'registrations',
  //   cous:'currentonlineusers'
  // }

  constructor(private http: HttpClient) { }

  postRegistration(reg: Registration) {
    return this.http.post(this.baseURL, reg);
  }

  getRegistration() {
    return this.http.get(this.baseURL);
  }

 putRegistration(data, id) {
    return this.http.put(this.baseURL + '/' + id, data);
  }

  getRegistrationById(id) {
    return this.http.get(this.baseURL + '/' + id);
  }

  public toggleRegistration(user) {
    return this.http.put(this.baseURL + '/toggle/' + user._id, user);

  }

}

  // postCurrentonlineuser(cou : Currentonlineuser){
  //   const path = `${this.baseURL}${this.URLS.cous}`;
  //   return this.http.post(this.baseURL, cou);
  // }

