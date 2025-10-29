import {
  ArrowLeftIcon as ArrowLeft,
  PencilIcon as Pencil,
  TrashIcon as Trash,
} from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteBook,
  deleteRating,
  getBook,
  rateBook,
  updateRating,
  type Book,
} from "../api/books";
import { useAuth } from "../auth/AuthContext";
import Alert from "../components/Alert";
import RatingStars from "../components/RatingStars";
import { BookDetailSkeleton } from "../components/Skeleton";

export default function BookDetailPage() {
  const { id = "" } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [myRating, setMyRating] = useState<number | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showDeleteRatingAlert, setShowDeleteRatingAlert] = useState(false);
  const navigate = useNavigate();
  const { token, userId } = useAuth();

  useEffect(() => {
    setLoading(true);
    getBook(id)
      .then((b) => {
        setBook(b);
        const mine = b.ratings.find((r) => r.userId === (userId ?? ""));
        setMyRating(mine?.grade ?? null);
      })
      .catch((e) => {
        const message =
          e instanceof Error ? e.message : "Erreur lors du chargement du livre";
        toast.error(message);
      })
      .finally(() => setLoading(false));
  }, [id, userId]);

  const isOwner = useMemo(
    () => !!book && userId === book.userId,
    [book, userId]
  );

  const onDelete = async () => {
    if (!token || !book) return;
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (!token || !book) return;
    try {
      await deleteBook({ token, id: book._id });
      toast.success("Livre supprimé avec succès !");
      navigate("/");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erreur lors de la suppression du livre";
      toast.error(message);
    }
  };

  const onRate = async (grade: number) => {
    if (!token || !book) return;
    try {
      const updated = await rateBook({ token, id: book._id, rating: grade });
      setBook(updated);
      setMyRating(grade);
      toast.success(`Note de ${grade}/5 enregistrée !`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erreur lors de l'enregistrement de la note";
      toast.error(message);
    }
  };

  const onUpdateRating = async (grade: number) => {
    if (!token || !book) return;
    try {
      const updated = await updateRating({
        token,
        id: book._id,
        rating: grade,
      });
      setBook(updated);
      setMyRating(grade);
      toast.success(`Note mise à jour : ${grade}/5 !`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erreur lors de la mise à jour de la note";
      toast.error(message);
    }
  };

  const onDeleteRating = async () => {
    if (!token || !book) return;
    setShowDeleteRatingAlert(true);
  };

  const confirmDeleteRating = async () => {
    if (!token || !book) return;
    try {
      const updated = await deleteRating({ token, id: book._id });
      setBook(updated);
      setMyRating(null);
      toast.success("Note supprimée avec succès !");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erreur lors de la suppression de la note";
      toast.error(message);
    }
  };

  if (loading) return <BookDetailSkeleton />;
  if (!book) return null;

  return (
    <div className="flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-10 shadow-lg">
        <Link
          to="/"
          className="mb-6 flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={18} className="mr-2" /> Retour
        </Link>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex justify-center">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="h-auto w-64 rounded-lg shadow-md"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 p-4">
                <h2 className="font-serif text-xl text-gray-800 italic">
                  {book.title}
                </h2>
                <p className="mt-1 text-sm text-gray-600">par {book.author}</p>
              </div>
              <div className="grid grid-cols-2 text-sm">
                <div className="border-r border-gray-200 p-4">
                  <p className="text-gray-700">Genre</p>
                  <p className="font-medium text-gray-900 capitalize">
                    {book.genre}
                  </p>
                </div>
                <div className="p-4">
                  <p className="text-gray-700">Année</p>
                  <p className="font-medium text-gray-900">{book.year}</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 p-4">
                <div className="flex items-center space-x-1 text-lg text-amber-400">
                  <RatingStars value={book.averageRating} />
                </div>
                <p className="text-sm text-gray-700">{book.averageRating}/5</p>
              </div>
              <div className="border-t border-gray-200 bg-amber-50 p-4 text-center">
                <p className="mb-2 font-medium text-gray-700">Votre Note</p>
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        myRating === null
                          ? onRate(i + 1)
                          : onUpdateRating(i + 1)
                      }
                      className={`rounded px-2 py-1 ${
                        myRating === i + 1
                          ? "bg-amber-500 text-white"
                          : "bg-white text-amber-600 hover:bg-amber-100"
                      }`}
                      title={`Donner ${i + 1} ⭐`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                {myRating !== null && (
                  <button
                    onClick={onDeleteRating}
                    className="mt-3 text-sm text-red-600 hover:underline"
                  >
                    Supprimer ma note
                  </button>
                )}

                {!token && (
                  <p className="mt-2 text-xs text-gray-500">
                    Connectez-vous pour noter.
                  </p>
                )}
              </div>

              {isOwner && (
                <div className="flex items-center justify-end gap-3 border-t border-gray-200 p-4">
                  <Link
                    to={`/books/${book._id}/edit`}
                    className="inline-flex items-center gap-1 rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
                  >
                    <Pencil size={18} /> Modifier
                  </Link>
                  <button
                    onClick={onDelete}
                    className="inline-flex items-center gap-1 rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                  >
                    <Trash size={18} /> Supprimer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Alert
        open={showDeleteAlert}
        onOpenChange={setShowDeleteAlert}
        title="Supprimer ce livre ?"
        message="Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ce livre ?"
        onConfirm={confirmDelete}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        confirmVariant="danger"
      />
      <Alert
        open={showDeleteRatingAlert}
        onOpenChange={setShowDeleteRatingAlert}
        title="Supprimer votre note ?"
        message="Voulez-vous vraiment supprimer votre note pour ce livre ?"
        onConfirm={confirmDeleteRating}
        confirmLabel="Supprimer"
        cancelLabel="Annuler"
        confirmVariant="danger"
      />
    </div>
  );
}
