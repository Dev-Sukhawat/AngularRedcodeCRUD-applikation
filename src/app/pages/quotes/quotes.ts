import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { QuoteCard } from '../../components/quotes/quote-card/quote-card';
import { Navbar } from '../../components/navbar/navbar';
import { text } from 'stream/consumers';

@Component({
  selector: 'app-quotes',
  imports: [Navbar, QuoteCard, CommonModule, ReactiveFormsModule],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class Quotes implements OnInit {
  private quoteService = inject(QuoteService);
  private fb = inject(FormBuilder);

  quotes = signal<any[]>([
    {
      id: '1',
      title: 'The Pragmatic Programmer',
      text: 'Raction is great for building UIs!',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Clean Code',
      text: 'Even bad code can function. But ugly code has a negative impact on the team.',
      created_at: new Date().toISOString(),
    },
  ]);
  loading = signal(true);
  adding = signal(false);

  quoteForm = this.fb.group({
    text: ['', [Validators.required, Validators.minLength(3)]],
  });

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.quoteService.getQuotes().subscribe({
      next: (data) => {
        this.quotes.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  add() {
    if (this.quoteForm.invalid) return;
    this.adding.set(true);
    const text = this.quoteForm.value.text!;

    this.quoteService.addQuote(text).subscribe({
      next: () => {
        this.quoteForm.reset();
        this.adding.set(false);
        this.load();
      },
      error: () => this.adding.set(false),
    });
  }

  remove(id: string) {
    // Optimistisk uppdatering (som i din React-kod)
    const original = this.quotes();
    this.quotes.update((q) => q.filter((x) => x.id !== id));

    this.quoteService.deleteQuote(id).subscribe({
      error: () => {
        this.quotes.set(original); // Ångra om det skiter sig
        alert('Could not delete quote');
      },
    });
  }
}
