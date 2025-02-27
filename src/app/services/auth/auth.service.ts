import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // private baseUrl = "http://localhost:3100";
  private baseUrl = "http://192.168.9.47:3116";
  // private baseUrl = "http://192.168.9.47:3306";

  login(data: any) {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data);
  }

  saveToken(token: string) {
    window.localStorage.setItem('token', token);
  }

  saveUser(user: any) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    return window.localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

}
