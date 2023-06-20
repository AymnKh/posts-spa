import { NgForm } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  isLoading = false;

  constructor(private authService: AuthService) {

  }


  signup(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signup(email, password);
  }
}
