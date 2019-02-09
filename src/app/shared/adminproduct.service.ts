import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import {Adminproduct} from "./adminproduct.model";

@Injectable({
  providedIn: 'root'
})
export class AdminproductService {
  selectedAdminproduct: Adminproduct;
  adminproducts: Adminproduct[];
  readonly baseURL = 'http://localhost:3000/adminproducts';

  constructor(private http: HttpClient) {
  }

  postAdminproduct(admprd: Adminproduct) {
    return this.http.post(this.baseURL, admprd);
  }

  getAdminProduct() {
    return this.http.get(this.baseURL);
  }

  putAdminProduct(data, id) {
    return this.http.put(this.baseURL + '/' + id, data);
  }

  getAdminProductById(id) {
    return this.http.get(this.baseURL + '/' + id);
  }

  public toggleAdminProduct(product) {
    return this.http.put(this.baseURL + '/toggle/' + product._id,product);

  }

}

