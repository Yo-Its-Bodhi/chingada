import { CornMark } from "./Brand";

type CraftMarkProps = {
  kind: "source" | "make" | "serve" | "drink" | "fruit" | "infuse";
  className?: string;
};

/**
 * A small family of kitchen marks drawn to match the corn identity.
 * Keep the neighbouring label in live text: these drawings are decorative.
 */
export function CraftMark({ kind, className = "" }: CraftMarkProps) {
  if (kind === "source") return <CornMark className={className} />;

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
      {kind === "make" ? (
        <>
          <path d="M13 43h38l5 17H8l5-17Z" />
          <path d="M8 60v8h48v-8M15 68v6M49 68v6" />
          <ellipse cx="32" cy="50" rx="12" ry="5" />
          <path d="M21 35c-5-5 5-8 0-13M32 32c-5-5 5-8 0-13M43 35c-5-5 5-8 0-13" />
          <path d="M25 49h1M32 51h1M38 48h1" />
          <circle cx="20" cy="64" r="1" fill="currentColor" stroke="none" />
          <circle cx="32" cy="64" r="1" fill="currentColor" stroke="none" />
          <circle cx="44" cy="64" r="1" fill="currentColor" stroke="none" />
        </>
      ) : kind === "serve" ? (
        <>
          <path d="M8 53c0-18 11-29 24-29s24 11 24 29" />
          <path d="M8 53c0 12 10 20 24 20s24-8 24-20" />
          <path d="M8 53c9 5 39 5 48 0" />
          <path d="m12 49 5-3 5 4 5-4 5 4 5-4 5 4 5-4 5 3" />
          <path d="M22 38c0-4 4-7 8-5M33 35c3-4 8-3 9 1M18 57c0 5 6 10 12 11" />
        </>
      ) : kind === "fruit" ? (
        <>
          <circle cx="32" cy="44" r="23" />
          <circle cx="32" cy="44" r="17" />
          <path d="M32 27v34M15 44h34M20 32l24 24M20 56l24-24" />
          <circle cx="32" cy="44" r="3" fill="currentColor" stroke="none" />
          <path d="M32 21c0-8 6-13 14-13-1 8-6 13-14 13ZM32 21l7-7" />
        </>
      ) : kind === "infuse" ? (
        <>
          <path d="M25 7h14v10H25ZM27 17v11c0 5-9 8-9 14v28c0 3 2 5 5 5h18c3 0 5-2 5-5V42c0-6-9-9-9-14V17" />
          <path d="M18 47h28M18 66h28M25 57c0-4 4-6 7-6s7 2 7 6-4 6-7 6-7-2-7-6ZM32 51v12" />
          <path d="M25 12h14M23 42h1M40 42h1" />
        </>
      ) : (
        <>
          <path d="m13 28 5 43c.2 2 1.9 3 4 3h20c2.1 0 3.8-1 4-3l5-43H13Z" />
          <path d="M15 37h34M19 65h26" />
          <path d="m22 43 10 3-3 11-10-3 3-11ZM37 40l9 5-5 10-9-5 5-10Z" />
          <path d="M42 27a13 13 0 1 0-13-13" />
          <path d="M42 27V15M43 14l10-1M42 14l-5-10M42 14l-10-1" />
          <path d="m40 15-10 4" />
          <path d="M10 26h3M51 26h3" />
        </>
      )}
    </svg>
  );
}
