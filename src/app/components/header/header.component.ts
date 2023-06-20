import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userAuthnticated = false;
  token: string | null = '';
  constructor(private authService: AuthService) { }

  ngOnInit() {

  }
  checkToken() {
    this.token = this.authService.getToken(); // get token
    this.token ? this.userAuthnticated = true : this.userAuthnticated = false; // if token is true set userAuth to true
  }

  logout() {
    this.authService.logOut(); // call logout
    this.checkToken();//call checkToken method
  }
  ngDoCheck() {
    this.checkToken(); // call checkToken method
  }
}
