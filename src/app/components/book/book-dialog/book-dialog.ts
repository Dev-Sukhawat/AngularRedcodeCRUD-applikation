import { Component, input, output, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../../models/book-quote.model';

@Component({
  selector: 'app-book-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './book-dialog.html',
  styleUrl: './book-dialog.css',
})
export class BookDialog implements OnInit {
  private fb = inject(FormBuilder);
  book = input<Book | null>(null);
  close = output<void>();
  saved = output<void>();

  saving = false;
  form = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
  });

  ngOnInit() {
    if (this.book()) this.form.patchValue(this.book()!);
  }

  async submit() {
    this.saving = true;
    // Här lägger du din fetch/save logik
    setTimeout(() => {
      this.saving = false;
      this.saved.emit();
    }, 1000);
  }
}
