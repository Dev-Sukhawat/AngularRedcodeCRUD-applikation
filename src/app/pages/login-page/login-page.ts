import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [Navbar, CommonModule, RouterLink, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  loading = signal(false);

  async onSubmit() {
    this.loading.set(true);

    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        this.router.navigate(['/books']);
      } else {
        alert('Inloggning misslyckades. Kontrollera uppgifterna.');
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.loading.set(false);
    }
  }

  onGoogleSignIn() {
    // För Google behöver du oftast en extern URL till din backend
    // eller använda Google Identity Services biblioteket.
    window.location.href = 'http://localhost:5120/api/auth/google-login';
  }
}
