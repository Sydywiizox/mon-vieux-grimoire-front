import { api } from "./client";

export type Rating = { userId: string; grade: number };
export type Book = {
  _id: string;
  userId: string;
  title: string;
  author: string;
  imageUrl: string;
  year: number;
  genre: string;
  ratings: Rating[];
  averageRating: number;
};

export async function getBooks() {
  return api<Book[]>("/api/books");
}

export async function getBestRated() {
  return api<Book[]>("/api/books/bestrating");
}

export async function getBook(id: string) {
  return api<Book>(`/api/books/${id}`);
}

export async function createBook(params: {
  token: string;
  book: Omit<Book, "_id" | "ratings" | "averageRating" | "imageUrl" | "userId">;
  file: File;
}) {
  const form = new FormData();
  form.append("book", JSON.stringify(params.book));
  form.append("image", params.file);
  return api<{ message: string }>(`/api/books`, {
    method: "POST",
    body: form,
    authToken: params.token,
  });
}

export async function updateBook(params: {
  token: string;
  id: string;
  book: Partial<Omit<Book, "_id" | "ratings" | "averageRating" | "imageUrl">>;
  file?: File | null;
}) {
  const hasFile = !!params.file;
  if (hasFile) {
    const form = new FormData();
    form.append("book", JSON.stringify(params.book));
    if (params.file) form.append("image", params.file);
    return api<{ message: string }>(`/api/books/${params.id}`, {
      method: "PUT",
      body: form,
      authToken: params.token,
    });
  }
  return api<{ message: string }>(`/api/books/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(params.book),
    authToken: params.token,
  });
}

export async function deleteBook(params: { token: string; id: string }) {
  return api<{ message: string }>(`/api/books/${params.id}`, {
    method: "DELETE",
    authToken: params.token,
  });
}

export async function rateBook(params: {
  token: string;
  id: string;
  rating: number;
}) {
  return api<Book>(`/api/books/${params.id}/rating`, {
    method: "POST",
    body: JSON.stringify({ rating: params.rating }),
    authToken: params.token,
  });
}
