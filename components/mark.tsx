export function Mark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect
        x="1.5"
        y="1.5"
        width="29"
        height="29"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="16" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 4.5v5.5M16 22v5.5M4.5 16H10M22 16h5.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="21.5" cy="10.5" r="2" fill="#c4320d" />
    </svg>
  );
}
