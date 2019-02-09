import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';
// import {Observable};
// import 'rxjs/add/operator/map';\
// import 'rxjs/add operator/toPromise';

import { Navbarandfooter } from './navbarandfooter.model';

@Injectable({
  providedIn: 'root'
})
export class NavbarandfooterService { 
  selectedNavbarandfooter: Navbarandfooter;
  Navbarandfooters: Navbarandfooter[];
  readonly baseURL = 'http://localhost:3000/navbarandfooters';

  constructor(private http: HttpClient) {
  }

  postNavbarandfooter(naf: Navbarandfooter) {
    return this.http.post(this.baseURL, naf);
  }

  getNavbarandfooter() {
    return this.http.get(this.baseURL);
  }

  putNavbarandfooter(data, id) {
    return this.http.put(this.baseURL + '/' + id, data);
  }

  getNavbarandfooterById(id) {
    return this.http.get(this.baseURL + '/' + id);
  }

  public toggleNavbarandfooter(product) {
    return this.http.put(this.baseURL + '/toggle/' + product._id,product);

  }

}

