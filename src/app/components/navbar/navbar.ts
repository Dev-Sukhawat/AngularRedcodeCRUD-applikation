import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service'; // Skapa denna
import { AuthService } from '../../services/auth.service'; // Skapa denna

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
})
export class Navbar {
  // Injecta tjänster (motsvarar hooks i React)
  private themeService = inject(ThemeService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Signals för state
  isMenuOpen = signal(false);

  // Exponera tjänsternas data till templaten
  user = this.authService.user; // Antar att detta är en Signal
  theme = this.themeService.theme; // Antar att detta är en Signal

  navItems = [
    { to: '/books', label: 'Books' },
    { to: '/quotes', label: 'Quotes' },
  ];

  toggleTheme() {
    this.themeService.toggle();
  }

  toggleMenu() {
    this.isMenuOpen.update((val) => !val);
  }

  async onSignOut() {
    await this.authService.signOut();
    this.isMenuOpen.set(false);
    this.router.navigate(['/login']);
  }
}
