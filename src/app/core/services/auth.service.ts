import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://192.168.252.173:8000/api/v1/auth/login';
  private router = inject(Router);

  constructor(private http: HttpClient) {
   }
  

  login(apiLogin: Login): Observable<any> {
    const respuesta = Observable<any>;
    console.log(respuesta);
    return this.http.post(this.apiUrl, apiLogin);
  }

   // METODO PARA CERRAR SESION
   logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/Index']);
  }
  
}