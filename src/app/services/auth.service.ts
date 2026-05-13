import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // Din .NET Backend URL
  private readonly apiUrl = 'http://localhost:5120/api/auth';

  // Signal för användarstate
  user = signal<{ email: string } | null>(null);

  constructor() {
    // Vid uppstart: Kolla om vi är i webbläsaren och om det finns en token
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const savedEmail = localStorage.getItem('userEmail');

      if (token && savedEmail) {
        // Här kan man även lägga till ett anrop till backend för att validera token
        this.user.set({ email: savedEmail });
      }
    }
  }

  /**
   * Logga in mot .NET Backend
   */
  async login(email: string, password: string): Promise<boolean> {
    try {
      // Vi använder firstValueFrom för att göra om Observable till Promise (likt async/await i React)
      const response = await firstValueFrom(
        this.http.post<{ token: string; email: string }>(`${this.apiUrl}/login`, {
          email,
          password,
        }),
      );

      if (response && response.token) {
        this.setSession(response.token, response.email);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  /**
   * Hantera Google Redirect
   */
  loginWithGoogle() {
    // Skickar användaren till din .NET endpoint som hanterar Google Challenge
    window.location.href = `${this.apiUrl}/google-login`;
  }

  /**
   * Logga ut
   */
  async signOut() {
    this.user.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
    }
  }

  /**
   * Hjälpmetod för att spara sessionen
   */
  private setSession(token: string, email: string) {
    this.user.set({ email });
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email);
    }
  }
}
