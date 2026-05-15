import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  imports: [Navbar, CommonModule, RouterLink, FormsModule],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css',
})
export class RegisterPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  name = ''; // Nytt fält för namn
  email = '';
  password = '';
  loading = signal(false);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      // Hantera Google-retur även vid registrering (Google sköter båda)
      if (isPlatformBrowser(this.platformId)) {
        if (params['success'] === 'true') {
          const googleEmail = params['email'];
          this.authService.setSession('fake-google-token', googleEmail);
          this.router.navigate(['/books']);
        }
      }
    });
  }

  async onSubmit() {
    // Grundläggande validering
    if (!this.name || !this.email || !this.password) {
      alert('Vänligen fyll i alla fält.');
      return;
    }

    this.loading.set(true);

    try {
      // Vi anropar register istället för login
      // Se till att din AuthService har en register-metod som tar emot name, email, password
      const success = await this.authService.register(this.name, this.email, this.password);

      if (success) {
        // Efter lyckad registrering skickar vi dem till böckerna eller login
        alert('Konto skapat!');
        this.router.navigate(['/books']);
      } else {
        alert('Registrering misslyckades. E-postadressen kan redan vara upptagen.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Ett oväntat fel uppstod.');
    } finally {
      this.loading.set(false);
    }
  }

  onGoogleSignIn() {
    // Samma Google-endpoint fungerar oftast för både login och signup
    window.location.href = 'http://localhost:5120/api/auth/google-login';
  }
}
