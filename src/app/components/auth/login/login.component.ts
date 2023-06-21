import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  token = '';
  constructor(private authService: AuthService, private router: Router) { }

  login(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.token = data.token; // get token
        if (this.token) {
          this.router.navigate(['/'])// redirect to home page
          localStorage.setItem('token', this.token);
        }
      },
      error: () => {
        this.isLoading = false;
      }, complete: () => {
        this.isLoading = false;
      },

    })


  }
}
