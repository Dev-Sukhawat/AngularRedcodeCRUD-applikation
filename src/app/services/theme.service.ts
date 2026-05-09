import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);

  // Skapa signalen med ett standardvärde
  theme = signal<'light' | 'dark'>('light');

  constructor() {
    // Körs bara om vi är i webbläsaren
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
      if (savedTheme) {
        this.theme.set(savedTheme);
        this.applyTheme(savedTheme);
      }
    }
  }

  toggle() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', newTheme);
      this.applyTheme(newTheme);
    }
  }

  private applyTheme(theme: string) {
    if (isPlatformBrowser(this.platformId)) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
