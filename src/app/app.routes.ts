import { Routes } from '@angular/router';
import { LandigPage } from './pages/landig-page/landig-page';
import { MainPage } from './pages/main-page/main-page';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';

export const routes: Routes = [
  { path: '', title: 'Library', component: LandigPage },
  { path: 'main', title: 'Main', component: MainPage },
  { path: 'login', title: 'Login', component: LoginPage },
  { path: 'register', title: 'Register', component: RegisterPage },
  { path: '**', redirectTo: '' },
];
