import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private url =environment.apiUrl+'/users'

  constructor(private http:HttpClient) { }
  getUsers():Observable<{ msg: string; data: User[] }>{
    return this.http.get<{ msg: string; data: User[] }>(this.url);
  }

putUser(id: number, data: { estado: boolean }): Observable<any> {
  return this.http.put(`${this.url}/${id}`, data);
}
}
