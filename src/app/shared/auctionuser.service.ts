import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import { Auctionuser } from './auctionuser.model';

@Injectable({
  providedIn: 'root'
})
export class AuctionuserService {
  selectedAuctionuser: Auctionuser;
  auctionusers: Auctionuser[];
  readonly baseURL = 'http://localhost:3000/auctionusers';


  constructor(private http: HttpClient) { }

  postAuctionuser(auctuser: any) {
    return this.http.post(this.baseURL, auctuser);
  }

  getAuctionuser() {
    return this.http.get(this.baseURL);
  }

 putAuctionuser(data, id) {
    return this.http.put(this.baseURL + '/' + id, data);
  }

  getAuctionuserById(id) {
    return this.http.get(this.baseURL + '/' + id);
  }

  public toggleAuctionuser(user) {
    return this.http.put(this.baseURL + '/toggle/' + user._id, user);

  }







}
