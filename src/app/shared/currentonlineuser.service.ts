import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


import {Currentonlineuser} from "./currentonlineuser.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentonlineuserService {
  // public verifyUsers: any;
  selectedCurrentonlineuser: Currentonlineuser;
  currentonlineusers: Currentonlineuser[];
  readonly baseURL = 'http://localhost:3000/currentonlineusers';

  constructor(private http: HttpClient) {
  }

  postCurrentonlineuser(cou: Currentonlineuser) {
  // public verifyUsers: any;

    // Currentonlineuser.find((err, docs) => {
    //   if (!err) { res.send(docs); }
    //   else { console.log('Error in Retriving Details :' + JSON.stringify(err, undefined, 2)); }
    // });
    return this.http.post(this.baseURL, cou);
}
}
