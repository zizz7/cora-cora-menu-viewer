"use client";

export default function ViewerError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-forest px-6 text-center">
      <h1 className="font-heading text-3xl font-semibold text-cream">
        Unable to Load Menu
      </h1>
      <p className="mt-3 max-w-sm font-body text-sm text-cream-muted">
        We couldn&apos;t load this menu right now. Please check your connection
        and try again.
      </p>
      <button
        onClick={() => {
          reset();
          window.location.reload();
        }}
        className="mt-6 rounded-full bg-amber px-8 py-3 font-body text-sm font-semibold text-forest shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        Try Again
      </button>
    </div>
  );
}
