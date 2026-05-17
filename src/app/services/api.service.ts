// src/app/services/book.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book, Quote } from '../models/book-quote.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  // === Books ===
  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/books`);
  }

  updateBook(id: string, book: Partial<Book>): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/books/${id}`, book);
  }

  createBook(book: Partial<Book>): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/books`, book);
  }

  deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/books/${id}`);
  }

  // === Quotes ===
  // Get Quote
  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.apiUrl}/quotes`);
  }

  // Create Quote
  createQuote(quoteData: {
    text: string;
    title?: string | null;
    pageNumber?: number | null;
  }): Observable<Quote> {
    return this.http.post<Quote>(`${this.apiUrl}/quotes`, quoteData);
  }

  // Update Quote
  updateQuote(
    id: string,
    quoteData: { text: string; title: string | null; pageNumber: number | null },
  ): Observable<Quote> {
    return this.http.put<Quote>(`${this.apiUrl}/quotes/${id}`, quoteData);
  }

  // Remove Quote
  deleteQuote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/quotes/${id}`);
  }
}
