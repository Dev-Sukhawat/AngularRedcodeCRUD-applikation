import { Component, input, output } from '@angular/core';
import { Quote, Book } from '../../../models/book-quote.model';

@Component({
  selector: 'app-quote-card',
  standalone: true,
  imports: [],
  templateUrl: './quote-card.html',
  styleUrl: './quote-card.css',
})
export class QuoteCard {
  // Vi kräver att ett Quote-objekt skickas in
  quote = input.required<Quote>();

  // Event som skickas ut när man trycker på delete
  delete = output<void>();
}
