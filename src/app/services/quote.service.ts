import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../models/book-quote.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private http = inject(HttpClient);
  private apiUrl = 'https://din-backend-render.onrender.com/api/quotes';

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.apiUrl);
  }

  addQuote(text: string): Observable<Quote> {
    return this.http.post<Quote>(this.apiUrl, { text });
  }

  deleteQuote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
