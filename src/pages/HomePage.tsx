import { Plus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBestRated, getBooks, type Book } from "../api/books";
import BookCard from "../components/BookCard";
import RatingStars from "../components/RatingStars";
import Spinner from "../components/Spinner";

export default function HomePage() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [top, setTop] = useState<Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getBooks(), getBestRated()])
      .then(([b, t]) => {
        setBooks(b);
        setTop(t);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div
      className="bg-cover bg-center py-12 px-6"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80')",
      }}
    >
      <div className="mx-auto max-w-6xl rounded-2xl bg-white bg-opacity-95 p-10 shadow-xl">
        <div className="mb-12 text-center">
          <h2 className="font-serif text-3xl italic text-gray-800">
            Nos Livres
          </h2>
          <p className="mb-6 text-sm text-gray-500">à lire et à relire</p>
          <Link
            to="/books/new"
            className="inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2 font-medium text-white shadow transition hover:bg-amber-600"
          >
            <Plus size={18} /> Ajouter un livre
          </Link>
        </div>

        {!books || !top ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
              {books.map((book) => (
                <BookCard key={book._id} book={book} />
              ))}
            </div>

            <section className="mt-16">
              <h3 className="mb-8 font-serif text-xl text-gray-800 italic">
                Les mieux notés
              </h3>
              <div className="grid gap-8 md:grid-cols-3">
                {top.map((b) => (
                  <div key={b._id} className="flex flex-col items-center">
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      className="mb-3 h-52 w-36 rounded-lg object-cover shadow"
                    />
                    <p className="font-medium text-gray-800">{b.title}</p>
                    <p className="text-sm text-gray-600">
                      {b.year} • {b.genre}
                    </p>
                    <div className="mt-1 text-lg text-amber-400">
                      <RatingStars value={b.averageRating} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
