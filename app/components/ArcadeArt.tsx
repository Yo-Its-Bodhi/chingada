type ArcadeArtProps = { className?: string };

/** A brand illustration, rather than a mock game screen or a live leaderboard. */
export function ArcadeArt({ className = "" }: ArcadeArtProps) {
  return (
    <svg
      className={`arcade-art ${className}`}
      viewBox="0 0 620 460"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="310"
        cy="227"
        r="187"
        stroke="currentColor"
        strokeOpacity=".18"
      />
      <circle
        cx="310"
        cy="227"
        r="160"
        stroke="currentColor"
        strokeOpacity=".12"
      />
      <path d="m81 96 8-24 8 24 24 8-24 8-8 24-8-24-24-8Z" fill="#ffbd18" />
      <path d="m523 325 6-18 6 18 18 6-18 6-6 18-6-18-18-6Z" fill="#bd3026" />
      <path d="m518 102 5-15 5 15 15 5-15 5-5 15-5-15-15-5Z" fill="white" />
      <path
        d="m76 300 13-13m-13 0 13 13M549 213l13-13m-13 0 13 13"
        stroke="#ffbd18"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M160 418h307"
        stroke="currentColor"
        strokeOpacity=".22"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M186 47h248l26 86-16 195 29 87H147l29-87-16-195Z"
        fill="#25231e"
      />
      <path d="M194 53h232l19 62H175Z" fill="#ffbd18" />
      <text
        x="310"
        y="96"
        fill="#25231e"
        textAnchor="middle"
        fontFamily="Barlow Condensed, sans-serif"
        fontWeight="800"
        fontSize="35"
        letterSpacing="2"
      >
        CHINGADA ARCADE
      </text>
      <path
        d="M175 128h270l-17 174H192Z"
        fill="#006d70"
        stroke="white"
        strokeWidth="2"
      />
      <path d="M187 140h246l-15 150H202Z" stroke="white" strokeOpacity=".25" />
      <path
        d="M197 276h224M194 260h228M192 244h232M190 228h237M218 290l35-76m150 76-36-76m-57 76v-76"
        stroke="white"
        strokeOpacity=".1"
      />
      <rect x="209" y="158" width="90" height="86" rx="5" fill="#25231e" />
      <rect x="321" y="158" width="90" height="86" rx="5" fill="#25231e" />
      <g
        stroke="#ffbd18"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="254" cy="193" rx="23" ry="10" />
        <path d="M254 203v19m-12 0h24m-40-18v13m56-13v13m-56-13h8m40 0h8" />
        <ellipse cx="366" cy="193" rx="23" ry="10" />
        <path d="M366 203v19m-12 0h24m-40-18v13m56-13v13m-56-13h8m40 0h8" />
      </g>
      <circle
        cx="310"
        cy="198"
        r="17"
        fill="#bd3026"
        stroke="white"
        strokeWidth="2"
      />
      <text
        x="310"
        y="204"
        fill="white"
        textAnchor="middle"
        fontFamily="Barlow Condensed, sans-serif"
        fontWeight="800"
        fontSize="18"
      >
        VS
      </text>
      <text
        x="254"
        y="266"
        fill="white"
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontWeight="700"
        fontSize="10"
        letterSpacing="1"
      >
        YOUR TABLE
      </text>
      <text
        x="366"
        y="266"
        fill="white"
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontWeight="700"
        fontSize="10"
        letterSpacing="1"
      >
        THEIR TABLE
      </text>
      <path
        d="m190 310-17 44h274l-17-44Z"
        fill="#bd3026"
        stroke="#25231e"
        strokeWidth="3"
      />
      <ellipse cx="242" cy="337" rx="24" ry="9" fill="#25231e" />
      <path d="M242 335v-22" stroke="white" strokeWidth="5" />
      <circle
        cx="242"
        cy="308"
        r="10"
        fill="#ffbd18"
        stroke="#25231e"
        strokeWidth="3"
      />
      <ellipse
        cx="363"
        cy="333"
        rx="12"
        ry="7"
        fill="#ffbd18"
        stroke="#25231e"
        strokeWidth="3"
      />
      <ellipse
        cx="398"
        cy="333"
        rx="12"
        ry="7"
        fill="white"
        stroke="#25231e"
        strokeWidth="3"
      />
      <path d="M178 362h264l13 43H165Z" fill="#ffbd18" />
      <text
        x="310"
        y="389"
        fill="#25231e"
        textAnchor="middle"
        fontFamily="DM Sans, sans-serif"
        fontWeight="800"
        fontSize="12"
        letterSpacing="2"
      >
        TACOS. TABLES. TRASH TALK.
      </text>
    </svg>
  );
}

export function ArcadePrizeIcon({
  kind,
}: {
  kind: "merch" | "gift" | "tacos";
}) {
  return (
    <svg
      className="arcade-prize-icon"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "merch" && (
        <>
          <path d="m33 22-20 13 12 21 10-6v29h30V50l10 6 12-21-20-13c-9 12-25 12-34 0Z" />
          <path d="M40 57c3-10 7-15 10-15s7 5 10 15M50 42v23m-10-8 10 8 10-8" />
        </>
      )}
      {kind === "gift" && (
        <>
          <rect x="14" y="25" width="72" height="50" rx="5" />
          <path d="M15 43h70M36 25v50m0-48c-24-4-24-20-13-18 7 1 13 12 13 18Zm0 0c24-4 24-20 13-18-7 1-13 12-13 18Z" />
          <path d="M54 59h17" />
        </>
      )}
      {kind === "tacos" && (
        <>
          <path d="M13 68c1-28 17-46 37-46s36 18 37 46H13Z" />
          <path d="M28 67c0-22 9-36 22-36s22 14 22 36M22 50l11-6m9-12 5 11m13-7-5 12m13 1 9 7M35 58l6-7m12 8 6-6" />
          <path d="m17 77 9 4m46 0 11-4" />
        </>
      )}
    </svg>
  );
}
