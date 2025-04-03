import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { environment } from '../../../environments/environment';
import { EnviarCorreo } from '../models/enviar-correo';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth/';
private router = inject(Router);

  constructor(private http: HttpClient) {
   }
  

  login(apiLogin: Login): Observable<any> {
    const respuesta = Observable<any>;
    console.log(respuesta);
    return this.http.post(this.apiUrl + 'login', apiLogin);
  }


  enviarCorreo(data: EnviarCorreo): Observable<any> {
    return this.http.post(this.apiUrl + 'enviar-correo-de-restablecimiento', data);
  }

   // METODO PARA CERRAR SESION
   logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/Index']);
  }

  // METODO PARA SABER SI ES UN ADMINISTRADOR
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false; 
    }
  
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken?.rol_id === 1;
    } catch (error) {
      return false; 
    }
  }
  
  // METODO PARA SABER SI ESTA LOGUEADO
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return false; 
    }
    try {
      const tokendecodificado: any = jwtDecode(token);
    if (tokendecodificado.exp && tokendecodificado.exp < Date.now() / 1000) {
      this.logout();
      return false;
    }
      return true;
    }
    catch (error) {
      this.logout();
      return false; 
    }
    
  }

  // METODO PARA SABER SI ES UN USUARIO REGULAR
  isUser(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
  
    try {
      const decodedToken: any = jwtDecode(token);
      // Asumiendo que role_id 2 es para usuarios regulares
      return decodedToken?.rol_id === 2;
    } catch (error) {
      return false;
    }
  }

  getRolUser(): Observable<any> {

    return this.http.get<any>(environment.apiUrl + '/auth/ver-rol');
  }
  
}