import { Routes } from '@angular/router';
import { LandigPage } from './pages/landig-page/landig-page';
import { Books } from './pages/books/books';
import { Quotes } from './pages/quotes/quotes';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';
import { guestGuard, authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', title: 'Library', component: LandigPage, canActivate: [guestGuard] },
  { path: 'books', title: 'Books', component: Books, canActivate: [authGuard] },
  { path: 'quotes', title: 'Quotes', component: Quotes, canActivate: [authGuard] },
  { path: 'login', title: 'Login', component: LoginPage, canActivate: [guestGuard] },
  { path: 'register', title: 'Register', component: RegisterPage, canActivate: [guestGuard] },
  { path: '**', redirectTo: '' },
];
