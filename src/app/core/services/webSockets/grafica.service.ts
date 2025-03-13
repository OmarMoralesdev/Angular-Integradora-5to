import { Injectable ,inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraficaService {
  private apiUrl = 'http://127.0.0.1:8000/api/v1/sensor';

  
  private http  = inject(HttpClient);
  fetchSensors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}