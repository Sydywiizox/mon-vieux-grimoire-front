import {
  StarIcon as Star,
  StarHalfIcon as StarHalf,
} from "@phosphor-icons/react";

export default function RatingStars({
  value,
  size = 20,
}: {
  value: number;
  size?: number;
}) {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5 && full < 5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return (
    <div className="inline-flex items-center text-amber-400">
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`f-${i}`} size={size} weight="fill" />
      ))}
      {hasHalf && <StarHalf size={size} weight="fill" />}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`e-${i}`} size={size} />
      ))}
    </div>
  );
}
