import records from "./agave-research-data.json";

export type AgaveResearchRecord = {
  id: number;
  name: string;
  displayName?: string;
  displayType?: string;
  category?: string;
  status?: string;
  expressionVerified: boolean;
  /** A clarified expression must not inherit notes from a different old bottle. */
  legacyIdentityConflict?: boolean;
  sources: { url: string; title: string }[];
  facts?: Record<string, string | undefined>;
  image?: {
    sourceType?: "owner-upload";
    sourceUrl?: string;
    sourcePage: string;
    localPath: string;
    width: number;
    height: number;
    alphaVerified: boolean;
    visualVerified: boolean;
  } | null;
  unresolvedReason?: string;
};

export const agaveResearch = new Map<number, AgaveResearchRecord>(
  (records as AgaveResearchRecord[]).map((record) => [record.id, record]),
);

export function agavePhoto(id: number) {
  const record = agaveResearch.get(id);
  const image = record?.image;
  return record?.expressionVerified &&
    image?.alphaVerified &&
    image?.visualVerified
    ? image
    : undefined;
}
