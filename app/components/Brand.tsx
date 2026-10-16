type BrandProps = {
  className?: string;
  compact?: boolean;
};

/** The same corn mark is used in the wordmark, favicon and printed brand assets. */
export function CornMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M21 47V18C21 10.8 25.9 5 32 5s11 5.8 11 13v29" />
      <path d="M27 9v38M37 9v38M22 18h20M21 26h22M21 34h22M21 42h22" />
      <path d="M32 74C14 67 8 53 7 36c15 3 23 16 25 38Z" />
      <path d="M32 74c18-7 24-21 25-38-15 3-23 16-25 38Z" />
      <path d="M14 46c8 7 14 16 18 28M50 46c-8 7-14 16-18 28M32 74v3" />
    </svg>
  );
}

/** Live text keeps the restaurant name accessible and crisp at every size. */
export function Brand({ className = "", compact = false }: BrandProps) {
  return (
    <span
      className={`brand${compact ? " brand--compact" : ""}${className ? ` ${className}` : ""}`}
    >
      <CornMark className="brand__mark" />
      <span className="brand__type">
        <span className="brand__name">LA CHINGADA</span>
        {!compact && (
          <span className="brand__descriptor">
            Mexican street food · Toronto
          </span>
        )}
      </span>
    </span>
  );
}
