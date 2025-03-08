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
    this.pusher = new Pusher('53762c97ff6f60f10ff4', {
      cluster: 'us2'
    });
    this.channel = this.pusher.subscribe('sensores');
    this.channel.bind('sensor-actualizado', (data: any) => {
      this.sensorUpdated.next(data);
    });
  }

  getSensorUpdates() {
    return this.sensorUpdated.asObservable();
  }
}