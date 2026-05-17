import { Component, input, output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Quote } from '../../../models/book-quote.model';

@Component({
  selector: 'app-quote-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote-dialog.html',
  styleUrl: './quote-dialog.css',
})
export class QuoteDialog implements OnInit {
  private fb = inject(FormBuilder);

  quote = input<Quote | null>(null);
  close = output<void>();
  saved = output<{ text: string; title: string | null; pageNumber: number | null }>();

  editForm = this.fb.group({
    title: ['', [Validators.minLength(2), Validators.maxLength(100)]],
    text: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],
    pageNumber: [null as number | null, [Validators.min(1)]],
  });

  ngOnInit() {
    const currentQuote = this.quote();
    if (currentQuote) {
      this.editForm.patchValue({
        title: currentQuote.title,
        text: currentQuote.text,
        pageNumber: currentQuote.pageNumber,
      });
    }
  }

  submit() {
    if (this.editForm.invalid) {
      console.log('Form is invalid:', this.editForm.errors);
      return;
    }

    const updatedData = {
      text: this.editForm.value.text!,
      title: this.editForm.value.title?.trim() || null,
      pageNumber: this.editForm.value.pageNumber ? Number(this.editForm.value.pageNumber) : null,
    };

    this.saved.emit(updatedData);
  }
}
