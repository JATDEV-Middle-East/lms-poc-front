import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) { }

  credentials = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;
  passwordFieldType: 'password' | 'text' = 'password';
  showPassword = false;
  title = 'Login ';
  isSubmitting = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    this.passwordFieldType = this.showPassword ? 'text' : 'password';
  }

  onLogin(): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;
    this.errorMessage = null;

    if (!this.credentials.username || !this.credentials.password) {
      this.errorMessage = 'Please enter both username and password.';
      this.isSubmitting = false;
      return;
    }

    this.authService.login(this.credentials.username, this.credentials.password)
      .subscribe({
        next: (response) => {
          if(response.success){
            console.log('Login successful:', response);
            this.router.navigate(['/dashboard']);
          }else {
            this.errorMessage = response.message;
            this.isSubmitting = false;
          }
        },

        error: (error) => {
          console.log(error)
          this.errorMessage = 'An unexpected error occurred. Please try again.';
          this.isSubmitting = false;
        }

      });
  }
}
