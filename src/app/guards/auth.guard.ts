import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');
    let payload;
    if (token) {
      payload = token.split('.')[1]; // split token into 3 parts
      payload = JSON.parse(window.atob(payload)); // decode payload
    }
    if (!token || !payload) {
      this.router.navigate(['/login'])
      return false;
    }
    return true;

  }
  
}
