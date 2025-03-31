import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/habitacion';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

<<<<<<< HEAD
  private url = 'http://192.168.252.217:8000/api/v1/habitacion'
=======
  private url = environment.apiUrl+'/habitacion'
>>>>>>> add8ce828bff365e48314c1ccfe5ae265d557de6

  constructor(private http:HttpClient) { }

  getHabitacion(): Observable<{data: Habitacion[]}> {
    return this.http.get<{data: Habitacion[]}>(this.url);
  }

  postHabitacion(Habitacion: Habitacion):Observable<{msg:string; data:Habitacion}>{
    return this.http.post<{msg: string; data:Habitacion}>(this.url,Habitacion);
  }

  deleteHabitacion(id: number): Observable<Habitacion> {
    return this.http.delete<Habitacion>(`${this.url}/${id}`);
}
putHabitacion(id: number, Habitacion: Habitacion): Observable<Habitacion> {
  return this.http.put<Habitacion>(`${this.url}/${id}`, Habitacion);
}
}
