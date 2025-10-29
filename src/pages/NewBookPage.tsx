import {
  ArrowLeftIcon as ArrowLeft,
  CalendarIcon as Calendar,
  ImageSquareIcon as ImageSquare,
  PaperPlaneTiltIcon as PaperPlaneTilt,
  TagIcon as Tag,
} from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import { createBook } from "../api/books";
import { useAuth } from "../auth/AuthContext";
import { reactSelectStyles } from "../components/selectStyles";
import { COMMON_GENRES, type Option } from "../constants/genres";

export default function NewBookPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [genre, setGenre] = useState<Option | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInput = useRef<HTMLInputElement | null>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    if (f) setPreview(URL.createObjectURL(f));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !file || !genre || !year) return;
    setSaving(true);
    try {
      await createBook({
        token,
        file,
        book: {
          title,
          author,
          year: Number(year),
          genre: genre.value,
        },
      });
      navigate("/");
    } finally {
      setSaving(false);
    }
  };

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
            Ajouter un livre
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Publiez un nouvel ouvrage
          </p>
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-xl border border-amber-100 bg-amber-50 p-6">
            {preview ? (
              <img
                src={preview}
                alt="Prévisualisation"
                className="mb-4 h-72 w-48 rounded-lg object-cover shadow-md"
              />
            ) : (
              <div className="mb-4 flex h-72 w-48 items-center justify-center rounded-lg border border-dashed border-amber-200 text-amber-400">
                Aperçu
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="text-sm text-amber-700 hover:underline inline-flex items-center gap-1"
            >
              <ImageSquare size={18} /> Choisir une image
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
                required
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
                required
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Année
                </label>
                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    required
                    type="number"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 p-2.5 pl-10 focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Genre
                </label>
                <div className="relative">
                  <Tag
                    size={18}
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <div className="pl-8">
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
              </div>
            </div>
            <div className="pt-4">
              <button
                disabled={saving}
                type="submit"
                className="w-full rounded-lg bg-amber-500 py-2.5 font-medium text-white shadow transition hover:bg-amber-600 inline-flex items-center justify-center gap-2"
              >
                <PaperPlaneTilt size={20} />{" "}
                {saving ? "Publication..." : "Publier"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
