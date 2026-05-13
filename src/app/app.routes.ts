import { Routes } from '@angular/router';
import { LandigPage } from './pages/landig-page/landig-page';
import { Books } from './pages/books/books';
import { Quotes } from './pages/quotes/quotes';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';

export const routes: Routes = [
  { path: '', title: 'Library', component: LandigPage },
  { path: 'books', title: 'Books', component: Books },
  { path: 'quotes', title: 'Quotes', component: Quotes },
  { path: 'login', title: 'Login', component: LoginPage },
  { path: 'register', title: 'Register', component: RegisterPage },
  { path: '**', redirectTo: '' },
];
