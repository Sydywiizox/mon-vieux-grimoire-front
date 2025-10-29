import {
  ArrowLeftIcon as ArrowLeft,
  CalendarIcon as Calendar,
  ImageSquareIcon as ImageSquare,
  PencilIcon as Pencil,
  TagIcon as Tag,
} from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { getBook, updateBook, type Book } from "../api/books";
import { useAuth } from "../auth/AuthContext";
import { reactSelectStyles } from "../components/selectStyles";
import { EditBookSkeleton } from "../components/Skeleton";
import { COMMON_GENRES, type Option } from "../constants/genres";

export default function EditBookPage() {
  const { id = "" } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [genre, setGenre] = useState<Option | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setLoading(true);
    getBook(id)
      .then((b) => {
        setBook(b);
        setTitle(b.title);
        setAuthor(b.author);
        setYear(b.year);
        setGenre({ label: b.genre, value: b.genre });
        setPreview(b.imageUrl);
      })
      .catch((err) => {
        const message =
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement du livre";
        toast.error(message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !book) return;
    setSaving(true);
    try {
      await updateBook({
        token,
        id: book._id,
        book: {
          title,
          author,
          year: Number(year),
          genre: genre?.value ?? book.genre,
        },
        file,
      });
      toast.success("Livre mis à jour avec succès !");
      navigate(`/books/${book._id}`);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Erreur lors de la mise à jour du livre";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <EditBookSkeleton />;

  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-10 shadow-xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={18} className="mr-2" /> Retour
        </button>
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl text-gray-800 italic">
            Modifier votre livre
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Vous pouvez modifier tous les champs sauf la note donnée
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-xl border border-amber-100 bg-amber-50 p-6">
            {preview && (
              <img
                src={preview}
                alt="Couverture du livre"
                className="mb-4 h-72 w-48 rounded-lg object-cover shadow-md"
              />
            )}
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="text-sm text-amber-700 hover:underline inline-flex items-center gap-1"
            >
              <ImageSquare size={18} /> Modifier le visuel
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              onChange={onFile}
              className="hidden"
            />
          </div>
          <form className="space-y-6" onSubmit={submit}>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Titre du livre
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Auteur
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 inline-flex items-center gap-2">
                  <Calendar size={18} /> Année
                </label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 inline-flex items-center gap-2">
                  <Tag size={18} /> Genre
                </label>
                <CreatableSelect<Option, false>
                  className="w-full"
                  styles={reactSelectStyles}
                  value={genre}
                  onChange={(v) => setGenre(v)}
                  options={COMMON_GENRES}
                  isClearable
                  placeholder="Choisir ou créer..."
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Note
              </label>
              <div className="flex items-center space-x-1 text-lg text-amber-400">
                La note ne peut pas être modifiée ici
              </div>
            </div>
            <div className="pt-4">
              <button
                disabled={saving}
                type="submit"
                className="w-full rounded-lg bg-amber-500 py-2.5 font-medium text-white shadow transition hover:bg-amber-600 inline-flex items-center justify-center gap-2"
              >
                <Pencil size={20} />{" "}
                {saving ? "Enregistrement..." : "Publier les modifications"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
