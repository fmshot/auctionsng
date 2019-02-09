import { Injectable } from '@angular/core';
import * as Pusher from 'pusher-js';


// this is here to discourage the instantiating of pusher any where its
// needed, better to reference it from one place
@Injectable()
export class PusherService {
private _pusher: any;
private channel: any;
// private tww: any;

constructor() {
  this._pusher = new Pusher('ee883b757f50aa4ab7b0', {
    cluster: 'us2',
    encrypted: true
  });

  this.channel = this._pusher.subscribe('my-channel');
  // this.tww = this.channel.bind('my-event', function(data) {
  //   alert('An event was triggered with message: ' + data.message);
  // });
}


// any time it is needed we simply call this method
getPusher() {
  return this._pusher;
}
// getIt(){
//   return this.tww;
// }

}
