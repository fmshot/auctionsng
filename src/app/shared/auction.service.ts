import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Auction} from './auction.model';


@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  selectedAuction: Auction;
  auctions: Auction[];
  readonly baseURL = 'http://localhost:3000/auctions';

  constructor(private http: HttpClient) { }


  postAuction(auc: Auction) {
    return this.http.post(this.baseURL, auc);
  }
  postWinner(email){
    return this.http.post(`${this.baseURL}/winner/`, email);
  }
  getAuction() {
    return this.http.get(this.baseURL);
  }

  putAuction(auction, id) {
    return this.http.put(this.baseURL + '/' + id, auction);
  }

  getAuctionById(id) {
    return this.http.get(this.baseURL + '/' + id);
  }

  public toggleAuction(auction) {
    return this.http.put(this.baseURL + '/toggle/' + auction._id, auction);

  }

  public togglePaid(auction) {
    return this.http.put(this.baseURL + '/toggle/paid/' + auction._id, auction);

  }
  getAuctionsById(id) {
    return this.http.get(this.baseURL + '/auction/' + id);
  }
  // getAuction('auction/:id', (req, res) => {
// public hideViewAuctionsButton(){
//   if(Date.now() > response.dateandtime){this.datebutton==true};
// }
}

