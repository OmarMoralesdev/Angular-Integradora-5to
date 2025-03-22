import { Injectable ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatosControl } from '../../models/datos-control';
@Injectable({
  providedIn: 'root'
})
export class GraficaService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/sensor';

  
  private http  = inject(HttpClient);
  fetchSensors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
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