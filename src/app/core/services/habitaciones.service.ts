import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/habitacion';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  private url = environment.apiUrl+'/habitacion'

  constructor(private http:HttpClient) { }

  getHabitacion(): Observable<{data: Habitacion[]}> {
    return this.http.get<{data: Habitacion[]}>(this.url);
  }

  getHabitacionPorId(id: number): Observable<{msg:string; data: Habitacion}> {
    return this.http.get<{msg:string; data: Habitacion}>(`${this.url}/${id}`);
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
