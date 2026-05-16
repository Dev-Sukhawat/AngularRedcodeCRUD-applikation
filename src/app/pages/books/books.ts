import { Component, signal, OnInit, inject } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { BookCard } from '../../components/book/book-card/book-card';
import { BookDialog } from '../../components/book/book-dialog/book-dialog';
import { Book } from '../../models/book-quote.model';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  imports: [Navbar, BookCard, BookDialog, CommonModule],
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books implements OnInit {
  private apiService = inject(ApiService);
  books = signal<Book[]>([]);
  loading = signal(false);
  isDialogOpen = signal(false);
  selectedBook = signal<Book | null>(null);

  ngOnInit() {
    this.loadBooks();
  }

  async loadBooks() {
    this.loading.set(true);
    this.apiService.getBooks().subscribe({
      next: (userBooks) => {
        this.books.set(userBooks);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Can not load books:', err);
        this.loading.set(false);
      },
    });
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
    if (
      confirm(
        'Are you sure you want to delete this book? All associated quotes will also be deleted.',
      )
    ) {
      this.loading.set(true);
      this.apiService.deleteBook(id).subscribe({
        next: () => {
          console.log('Book deleted successfully');
          this.loadBooks();
        },
        error: (err) => {
          console.error('Can not delete book:', err);
          this.loading.set(false);
        },
      });
    }
  }
}
