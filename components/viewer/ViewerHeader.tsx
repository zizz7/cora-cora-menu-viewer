"use client";

export interface ViewerHeaderProps {
  title: string;
  currentPage: number;
  totalPages: number;
  onBack: () => void;
}

export default function ViewerHeader({
  title,
  currentPage,
  totalPages,
  onBack,
}: ViewerHeaderProps) {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-4 py-3"
      style={{
        backgroundColor: "rgba(250,248,245,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      {/* Back button */}
      <button
        onClick={onBack}
        aria-label="Back to bookcase"
        className="flex items-center justify-center text-on-surface"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Menu title */}
      <h1 className="font-heading text-base font-semibold text-on-surface truncate px-3 text-center flex-1">
        {title}
      </h1>

      {/* Page counter */}
      <span className="font-mono text-sm text-on-surface-muted whitespace-nowrap">
        {currentPage} / {totalPages}
      </span>
    </header>
  );
}
