import { Link } from "react-router-dom";
import type { Book } from "../api/books";
import RatingStars from "./RatingStars";

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to={`/books/${book._id}`}
      className="flex flex-col items-center text-center"
    >
      <img
        src={book.imageUrl}
        alt={book.title}
        className="mb-3 h-52 w-36 rounded-lg object-cover shadow"
      />
      <h3 className="font-medium text-gray-800">{book.title}</h3>
      <p className="text-sm text-gray-600">{book.author}</p>
      <p className="text-sm text-gray-600">
        {book.year} • {book.genre}
      </p>
      <div className="mt-1 text-lg">
        <RatingStars value={book.averageRating} />
      </div>
    </Link>
  );
}
