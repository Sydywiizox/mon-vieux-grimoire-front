import { CircularProgress } from "@/components/CircularProgress.tsx";
import { PlusIcon as Plus } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getBestRated, getBooks, type Book } from "../api/books";
import BookCard from "../components/BookCard";
import RatingStars from "../components/RatingStars";
import { TopRatedSkeleton } from "../components/Skeleton";

export default function HomePage() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [top, setTop] = useState<Book[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [slowLoad, setSlowLoad] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!books) {
      const interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 5));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [books]);

  useEffect(() => {
    // Déclenche un message au bout de 3 secondes si les livres ne sont pas encore chargés
    const timer = setTimeout(() => {
      if (!books) setSlowLoad(true);
    }, 3000);

    Promise.all([getBooks(), getBestRated()])
      .then(([b, t]) => {
        setBooks(b);
        setTop(t);
        setSlowLoad(false);
      })
      .catch((e) => {
        const message =
          e instanceof Error
            ? e.message
            : "Erreur lors du chargement des livres";
        setError(message);
        toast.error(message);
      })
      .finally(() => clearTimeout(timer));

    return () => clearTimeout(timer);
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

        {error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <>
            {/* Message d’attente long */}
            {slowLoad && !books && (
              <div className="mb-4 rounded-lg bg-yellow-50 border border-yellow-200 p-3 text-center text-sm text-yellow-700">
                ⚠️ Le serveur peut prendre un peu de temps à se lancer (hébergé
                sur Render en version free). Merci de patienter quelques
                secondes le temps que le serveur se lance... (30s environ)
              </div>
            )}

            <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
              {!books ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20">
                  <CircularProgress
                    value={progress}
                    size={100}
                    showLabel
                    labelClassName="text-lg font-semibold"
                    renderLabel={() => "Chargement..."}
                    className="stroke-amber-300/30"
                    progressClassName="stroke-amber-500"
                  />
                </div>
              ) : (
                books.map((book) => <BookCard key={book._id} book={book} />)
              )}
            </div>

            <section className="mt-16">
              <h3 className="mb-8 font-serif text-xl text-gray-800 italic">
                Les mieux notés
              </h3>
              <div className="grid gap-8 md:grid-cols-3">
                {!top
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <TopRatedSkeleton key={i} />
                    ))
                  : top.map((b) => (
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
