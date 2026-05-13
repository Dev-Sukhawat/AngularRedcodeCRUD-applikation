import { Component } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-quotes',
  imports: [Navbar],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class Quotes {}
