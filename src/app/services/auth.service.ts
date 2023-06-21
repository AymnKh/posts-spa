import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  token: string = '';

  getToken() {
    return localStorage.getItem('token'); // return token from localstorage
  }
  signup(email: string, password: string) {
   return this.http.post<{ message: string, token: string }>(`${environment.apiUrl}/auth/signup`, {
      email: email,
      password: password
    })
  }
  login(email: string, password: string) {
    return this.http.post<{ message: string, token: string }>(`${environment.apiUrl}/auth/login`, {
      email: email,
      password: password
    })
  }
  logOut() {
    localStorage.removeItem('token'); //remove token 
    this.token = ''; // set token to empty string
    this.router.navigate(['/']); // redirect to home page
  }
}
