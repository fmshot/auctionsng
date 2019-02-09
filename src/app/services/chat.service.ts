   // src/app/services/chat.service.ts
   import { Injectable } from '@angular/core';
   import { PusherService } from './pusher.service';
   import { HttpClient } from '@angular/common/http';
   import { Observable } from 'rxjs';
   import {tap} from 'rxjs/operators';
// import { resetApplicationState } from '@angular/core/src/render3/instructions';

   @Injectable({
     providedIn: 'root'
   })
   export class ChatService {
    user: {displayName: string, email: string};
    private _endPoint = 'http://localhost:3000'; // normally you use environment.ts
    private _channel: any;

    constructor(private _pusherService: PusherService, private _http: HttpClient) {
      this._channel = this._pusherService.getPusher().subscribe('chat-group');
    }

    join(param): Observable<any> {
   
  // const user = JSON.parse(JSON.stringify(localStorage.getItem('current_user')));
  this.user = {displayName:param['lastname'], email:param['email']};
  console.log('Chat service userssssss',param);
      return this._http.post(`${this._endPoint}/join`, param);
    }

    sendMessage(message: string): Observable<any> {
      let param = {
        message:message,
        type: 'human'
        // ...this.user
      };
      console.log('inputmessage:',param);
      return this._http.post(`${this._endPoint}/message`, param);
    }

    getChannel() {
      return this._channel;
    }
  }