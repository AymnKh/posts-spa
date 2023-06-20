import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    this.http.post<{ message: string, token: string }>('http://localhost:3000/api/v1/auth/signup', {
      email: email,
      password: password
    }).subscribe(data => {
      this.token = data.token;// get token
      if (this.token) {
        this.router.navigate(['/'])// redirect to home page
        localStorage.setItem('token', this.token);
      }
    })
  }
  login(email: string, password: string) {
    this.http.post<{ message: string, token: string }>('http://localhost:3000/api/v1/auth/login', {
      email: email,
      password: password
    }).subscribe(data => {
      this.token = data.token; // get token
      if (this.token) {
        this.router.navigate(['/'])// redirect to home page
        localStorage.setItem('token', this.token);
      }
    })
  }
  logOut() {
    localStorage.removeItem('token'); //remove token 
    this.token = ''; // set token to empty string
    this.router.navigate(['/']); // redirect to home page
  }
}
