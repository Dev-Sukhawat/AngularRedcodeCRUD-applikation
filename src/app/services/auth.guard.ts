import { PLATFORM_ID, inject } from '@angular/core';
import { Router, CanActivateFn, ActivatedRoute } from '@angular/router';
import { AuthService } from './auth.service';
import { isPlatformServer } from '@angular/common';

/**
 * GUEST GUARD - För sidor som BARA utloggade får se (t.ex. Login)
 * Om du är inloggad blir du utslängd till /books
 */
export const guestGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) return true;

  if (authService.user()) {
    router.navigate(['/books']);
    return false;
  }
  return true;
};

/**
 * AUTH GUARD - För sidor som KRÄVER inloggning (t.ex. Books)
 * Om du inte är inloggad blir du skickad till /login
 */
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (isPlatformServer(platformId)) return true;

  if (!authService.user()) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
