import { Component, input, output } from '@angular/core';
import { Book } from '../../../models/book-quote.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  book = input.required<Book>();
  edit = output<void>();
  delete = output<void>();
}
