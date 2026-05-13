import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-books',
  imports: [Navbar],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {}
