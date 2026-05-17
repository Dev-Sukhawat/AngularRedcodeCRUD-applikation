import { Component, input, output } from '@angular/core';
import { Quote } from '../../../models/book-quote.model';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [],
  templateUrl: './quote-card.html',
  styleUrl: './quote-card.css',
})
export class QuoteCard {
  quote = input.required<Quote>();
  edit = output<void>();
  delete = output<void>();
}
