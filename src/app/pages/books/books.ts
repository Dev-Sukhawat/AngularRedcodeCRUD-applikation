import { Component, signal, OnInit } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { BookCard } from '../../components/book/book-card/book-card';
import { BookDialog } from '../../components/book/book-dialog/book-dialog';
import { Book } from '../../models/book-quote.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [Navbar, BookCard, BookDialog, CommonModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books = signal<Book[]>([
    {
      id: '1',
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt & David Thomas',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Clean Code',
      author: 'Robert C. Martin',
      created_at: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Angular Pro Tips',
      author: 'Gemini Expert',
      created_at: new Date().toISOString(),
    },
  ]);

  loading = signal(false);
  isDialogOpen = signal(false);
  selectedBook = signal<Book | null>(null);

  ngOnInit() {
    this.loadBooks();
  }

  async loadBooks() {
    this.loading.set(true);
    // Här anropar du din service senare (t.ex. Supabase eller .NET API)
    // Exempel: this.books.set(await this.bookService.getAll());
    this.loading.set(false);
  }

  openCreate() {
    this.selectedBook.set(null);
    this.isDialogOpen.set(true);
  }

  openEdit(book: Book) {
    this.selectedBook.set(book);
    this.isDialogOpen.set(true);
  }

  handleDelete(id: string) {
    if (confirm('Delete this book?')) {
      // Logik för delete här
    }
  }
}
