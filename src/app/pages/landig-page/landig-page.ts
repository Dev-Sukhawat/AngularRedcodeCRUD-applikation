import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Home } from '../../components/ladningpage/home/home';
@Component({
  selector: 'app-landig-page',
  imports: [Navbar, Home],
  templateUrl: './landig-page.html',
  styleUrl: './landig-page.css',
})
export class LandigPage {}
