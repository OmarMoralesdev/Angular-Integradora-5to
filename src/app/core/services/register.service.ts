import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Register } from '../models/register';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = environment.apiUrl+'/auth/register';
  private Urlreenvio = environment.apiUrl+'/reenvio';


  private http = inject(HttpClient);


  // constructor(private http: HttpClient) { }
  register(registerdata: Register): Observable<Register> {
    return this.http.post<Register>(this.apiUrl, registerdata);
  }

  reenvio(data:{email:String}): Observable<any>{
    return this.http.post(this.Urlreenvio, data);
  }
   
}
