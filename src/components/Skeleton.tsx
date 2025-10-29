export function Skeleton({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`animate-pulse rounded bg-gray-200 ${className}`}
      {...props}
    />
  );
}

export function BookCardSkeleton() {
  return (
    <div className="flex flex-col items-center text-center">
      <Skeleton className="mb-3 h-52 w-36" />
      <Skeleton className="mb-2 h-5 w-32" />
      <Skeleton className="mb-1 h-4 w-24" />
      <Skeleton className="mb-2 h-4 w-28" />
      <div className="mt-1 flex gap-1">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
      </div>
    </div>
  );
}

export function TopRatedSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="mb-3 h-52 w-36 rounded-lg" />
      <Skeleton className="mb-2 h-5 w-32" />
      <Skeleton className="mb-2 h-4 w-28" />
      <div className="mt-1 flex gap-1">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-5 w-5" />
      </div>
    </div>
  );
}

export function BookDetailSkeleton() {
  return (
    <div className="flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-10 shadow-lg">
        <Skeleton className="mb-6 h-5 w-20" />
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex justify-center">
            <Skeleton
              className="h-auto w-64 rounded-lg"
              style={{ aspectRatio: "2/3" }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 p-4">
                <Skeleton className="mb-2 h-7 w-48" />
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="grid grid-cols-2 text-sm">
                <div className="border-r border-gray-200 p-4">
                  <Skeleton className="mb-2 h-4 w-12" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <div className="p-4">
                  <Skeleton className="mb-2 h-4 w-12" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 p-4">
                <div className="flex gap-1">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-5 w-5" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="border-t border-gray-200 bg-amber-50 p-4 text-center">
                <Skeleton className="mx-auto mb-2 h-5 w-24" />
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-10 rounded" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditBookSkeleton() {
  return (
    <div className="flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl rounded-2xl bg-white p-10 shadow-xl">
        <Skeleton className="mb-6 h-5 w-20" />
        <div className="mb-10 text-center">
          <Skeleton className="mx-auto mb-2 h-8 w-64" />
          <Skeleton className="mx-auto h-4 w-80" />
        </div>
        <div className="grid gap-10 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-xl border border-amber-100 bg-amber-50 p-6">
            <Skeleton className="mb-4 h-72 w-48 rounded-lg" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="space-y-6">
            <div>
              <Skeleton className="mb-1 h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="mb-1 h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Skeleton className="mb-1 h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div>
                <Skeleton className="mb-1 h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="mb-1 h-4 w-16" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="pt-4">
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
