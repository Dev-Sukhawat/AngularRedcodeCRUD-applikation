import { Component, input, output, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../../models/book-quote.model';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-book-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './book-dialog.html',
  styleUrl: './book-dialog.css',
})
export class BookDialog implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);

  book = input<Book | null>(null);
  close = output<void>();
  saved = output<void>();

  saving = false;
  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
  });

  get mode(): string {
    return this.book() ? 'Edit Book' : 'Add New Book';
  }

  ngOnInit() {
    if (this.book()) {
      this.form.patchValue(this.book()!);
    }
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.saving = true;

    const formValues = {
      title: this.form.value.title ?? '',
      author: this.form.value.author ?? '',
    };

    console.log('Form values:', formValues);

    const currentBook = this.book();

    if (currentBook && currentBook.id) {
      this.apiService.updateBook(currentBook.id, formValues).subscribe({
        next: (updatedBook) => {
          this.saving = false;
          this.saved.emit();
        },
        error: (err) => {
          this.saving = false;
          console.error('Could not update book in PostgreSQL:', err);
          alert(
            'Something went wrong when updating the book. Please check that you are properly logged in.',
          );
        },
      });
    } else {
      this.apiService.createBook(formValues).subscribe({
        next: (savedBook) => {
          this.saving = false;
          this.saved.emit();
        },
        error: (err) => {
          this.saving = false;
          console.error('Could not create book in PostgreSQL:', err);
          alert(
            'Something went wrong when creating the book. Please check that you are properly logged in.',
          );
        },
      });
    }
  }
}
