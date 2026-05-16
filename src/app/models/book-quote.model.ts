export interface Book {
  id: string;
  title: string;
  author: string;
  userId: string;
  created_at: string;
  quotes: Quote[];
}

export interface Quote {
  id?: string; // uuid default gen_random_uuid() -> Valfri i frontend
  title: string; // text not null -> Obligatorisk
  text: string; // text not null -> Obligatorisk
  pageNumber: number | null; // integer null -> Kan vara ett nummer eller null
  bookId: string; // uuid not null -> Obligatorisk
  userId: string; // uuid not null -> Obligatorisk
  createdAt?: string; // timestamp with time zone default now() -> Valfri i frontend
}