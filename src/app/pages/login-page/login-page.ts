import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [Navbar, CommonModule, RouterLink, FormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  private readonly apiUrl = environment.apiUrl + '/auth';

  email = '';
  password = '';
  loading = signal(false);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      // KÖR BARA DETTA I WEBBLÄSAREN
      if (isPlatformBrowser(this.platformId)) {
        if (params['success'] === 'true') {
          const googleEmail = params['email'];
          const googleToken = params['token'];

          if (googleToken) {
            // 2. Använd den riktiga token istället för 'fake-google-token'
            this.authService.setSession(googleToken, googleEmail);
            this.router.navigate(['/books']);
          } else {
            console.error('No token found in Google response URL');
          }
        }
      }
    });
  }

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
    window.location.href = `${this.apiUrl}/google-login`;
  }
}
