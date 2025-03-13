import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private pusher: Pusher;
  private channel: any;
  private sensorUpdated = new Subject<any>();

  constructor() {
    this.pusher = new Pusher('local', {
      cluster: 'local',
      wsHost: '127.0.0.1',
      wsPort: 6001,
      forceTLS: false,
      disableStats: true,
    });

    this.channel = this.pusher.subscribe('sensores');

    this.channel.bind('sensor-actualizado', (data: any) => {
      console.log('Mensaje recibido:', data);
      this.sensorUpdated.next(data);

    });
  }

  getSensorUpdates() {
    return this.sensorUpdated.asObservable();
  }  
}