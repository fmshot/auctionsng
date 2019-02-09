import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { Aucttime } from './aucttime.model';

@Injectable({
  providedIn: 'root'
})
export class AucttimeService {

  selectedAucttime: Aucttime;
  aucttimes: Aucttime[];
  readonly baseURL = 'http://localhost:3000/aucttimes';

  constructor(private http: HttpClient) { }

  postAucttime(au: Aucttime) {
    return this.http.post(this.baseURL, au);
  }

  getAucttime() {
    return this.http.get(this.baseURL);
  }

}
