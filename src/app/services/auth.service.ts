import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // Din .NET Backend URL
  private readonly apiUrl = environment.apiUrl + '/auth';

  // Signal för användarstate
  user = signal<{ email: string } | null>(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedEmail = localStorage.getItem('userEmail');

      if (savedEmail && this.isTokenValid()) {
        this.user.set({ email: savedEmail });
      } else {
        this.signOut();
      }
    }
  }

  /**
   * Logga in mot .NET Backend
   */
  async login(email: string, password: string): Promise<boolean> {
    try {
      // Vi använder firstValueFrom för att göra om Observable till Promise så att vi kan använda async/await
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

  async register(name: string, email: string, password: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.http.post<{ token: string; email: string }>(`${this.apiUrl}/register`, {
          name,
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
      console.error('Register failed:', error);
      return false;
    }
  }

  /**
   * Hantera Google Redirect
   */
  loginWithGoogle() {
    window.location.href = `${this.apiUrl}/google-login`;
  }

  /**
   * Logut
   */
  async signOut() {
    this.user.set(null);
    console.log('Signing out...');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
    }
  }

  /**
   * Hjälpmetod för att spara sessionen
   */
  public setSession(token: string, email: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email);

      // 2. Uppdatera signalen HÄR INNE
      this.user.set({ email: email });
    } else {
      console.warn('Trying to set session on the server side, which is not supported.');
    }
  }

  isTokenValid(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;

    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      const expiryTime = payload.exp * 1000;
      const currentTime = Date.now();

      return currentTime < expiryTime;
    } catch (error) {
      console.error('Could not validate or decode token:', error);
      return false;
    }
  }
}
