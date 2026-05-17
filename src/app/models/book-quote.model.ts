export interface Book {
  id: string;
  title: string;
  author: string;
  userId: string;
  created_at: string;
  quotes: Quote[];
}

export interface Quote {
  id?: string;
  title?: string;
  text: string;
  pageNumber?: number | null;
  bookId?: string;
  userId: string;
  createdAt?: string;
}