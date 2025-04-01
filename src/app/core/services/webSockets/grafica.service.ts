import { Injectable ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosControl } from '../../models/datos-control';
import { Sensor } from '../../models/sensor';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GraficaService {
  private apiUrl = `${environment.apiUrl}`;


  
  private http  = inject(HttpClient);
  //fetchSensors(): Observable<any[]> {
   // return this.http.get<any[]>(this.apiUrl);
  //}

  fetchSensors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  fetchSensorsByRoom(roomId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/habitaciones/sensores/${roomId}`);
  }

  habiticionById(roomId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/habitacionespor/${roomId}`);
  }

  fetchEstadisticas(sensorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estadisticas/${sensorId}`);
  }

  fetchSensorById(sensorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${sensorId}`);
  }

  fetchGraphData(sensorId: number, recordCount: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resultados`, {
      id_sensor: sensorId,
      limit: recordCount
    });
  }
}