type PhotoSlotProps = {
  src?: string;
  srcSet?: string;
  alt?: string;
  label: string;
  className?: string;
  sizes?: string;
  position?: string;
  width?: number;
  height?: number;
};

/** A visible shot list: missing photographs never become silent empty boxes. */
export function PhotoSlot({
  src,
  srcSet,
  alt,
  label,
  className = "",
  sizes,
  position,
  width = 600,
  height = 600,
}: PhotoSlotProps) {
  return (
    <div
      className={`photo-slot ${src ? "has-photo" : "needs-photo"} ${className}`}
    >
      {src ? (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes ?? "(max-width: 760px) 100vw, 33vw"}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          alt={alt ?? label}
          style={position ? { objectPosition: position } : undefined}
        />
      ) : (
        <div className="photo-placeholder">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <path
              d="M7 14h9l3-5h10l3 5h9v25H7V14Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
            <circle
              cx="24"
              cy="26"
              r="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M35 19h2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span>PHOTO NEEDED</span>
          <strong>{label}</strong>
        </div>
      )}
    </div>
  );
}
