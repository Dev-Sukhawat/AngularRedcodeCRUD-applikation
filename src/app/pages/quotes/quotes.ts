import { Component, signal, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { QuoteCard } from '../../components/quotes/quote-card/quote-card';
import { QuoteDialog } from '../../components/quotes/quote-dialog/quote-dialog';
import { Navbar } from '../../components/navbar/navbar';
import { Quote } from '../../models/book-quote.model';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [Navbar, QuoteCard, QuoteDialog, CommonModule, ReactiveFormsModule],
  templateUrl: './quotes.html',
  styleUrl: './quotes.css',
})
export class Quotes implements OnInit {
  private apiService = inject(ApiService);
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);

  isDialogOpen = signal(false);
  selectedQuote = signal<Quote | null>(null);

  quotes = signal<Quote[]>([]);
  loading = signal(true);
  adding = signal(false);

  quoteForm = this.fb.group({
    title: ['', [Validators.minLength(2), Validators.maxLength(100)]],
    text: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
    pageNumber: [null as number | null, [Validators.min(1)]],
  });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.load();
    } else {
      this.loading.set(false);
    }
  }

  load() {
    this.loading.set(true);
    this.apiService.getQuotes().subscribe({
      next: (data: Quote[]) => {
        this.quotes.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  add() {
    if (this.quoteForm.invalid) return;
    this.adding.set(true);

    const newQuoteData = {
      text: this.quoteForm.value.text!,
      title: this.quoteForm.value.title?.trim() || null,
      pageNumber: this.quoteForm.value.pageNumber ? Number(this.quoteForm.value.pageNumber) : null,
    };

    this.apiService.createQuote(newQuoteData).subscribe({
      next: () => {
        this.quoteForm.reset();
        this.adding.set(false);
        this.load();
      },
      error: () => this.adding.set(false),
    });
  }

  openEdit(quote: Quote) {
    this.selectedQuote.set(quote);
    this.isDialogOpen.set(true);
  }

  update(
    id: string,
    updatedData: { text: string; title: string | null; pageNumber: number | null },
  ) {
    this.apiService.updateQuote(id, updatedData).subscribe({
      next: () => {
        this.isDialogOpen.set(false); // Stäng dialogen
        this.load();
      },
      error: (err) => {
        console.error('API-fel vid uppdatering:', err);
      },
    });
  }

  remove(id: string) {
    const original = this.quotes();
    this.quotes.update((q) => q.filter((x) => x.id !== id));

    this.apiService.deleteQuote(id).subscribe({
      error: () => {
        this.quotes.set(original);
        alert('Could not delete quote');
      },
    });
  }
}
