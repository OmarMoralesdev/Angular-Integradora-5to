import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/habitacion';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  private url = 'http://192.168.252.217:8000/api/v1/habitacion'

  constructor(private http:HttpClient) { }

  getHabitacion(): Observable<{data: Habitacion[]}> {
    return this.http.get<{data: Habitacion[]}>(this.url);
  }
}
