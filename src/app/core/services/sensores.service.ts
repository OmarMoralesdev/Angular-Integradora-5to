import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Sensor } from '../models/sensor';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensoresService {

  private url = environment.apiUrl + '/sensor';
  private url1 = environment.apiUrl + '/habitacion';
  constructor(private http: HttpClient) {  }

  getSensor(): Observable<Sensor[]> {
    return this.http.get<Sensor[][]>(this.url).pipe(
      map(response => response[0]) 
    );
  }

  getSensoresPorHabitacion(habitacionId: number) {
    return this.http.get<{ data: { sensores: Sensor[] } }>(`${this.url1}/${habitacionId}`);
  }

  agregarSensor(habitacionId: number, sensorId:number): Observable<any> {
    return this.http.post(`${this.url}/${habitacionId}/${sensorId}`, null);
  }

  eliminarSensor(habitacionId: number, sensorId: number): Observable<any>{
    return this.http.delete(`${this.url}/${habitacionId}/${sensorId}`)
  }
}
