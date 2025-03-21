import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditarPerfilService {

  constructor(private http: HttpClient) { }

  getPerfil(): Observable<any> {
    return this.http.get(environment.apiUrl + '/auth/me')
  }

  updatePerfil(data: any): Observable<any> {
    return this.http.put(environment.apiUrl + '/usuario', data);
  }

  updatePassword(data: any): Observable<any> {
    return this.http.put(environment.apiUrl + '/contraseña', data);
  }

}
