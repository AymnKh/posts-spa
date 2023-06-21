import { NgForm } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading = false;
  token = '';
  constructor(private authService: AuthService, private router:Router) {

  }

  signup(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signup(email, password).subscribe({
      next: (data) => {
        this.token = data.token;// get token
        if (this.token) {
          this.router.navigate(['/'])// redirect to home page
          localStorage.setItem('token', this.token);
        }
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }
}
