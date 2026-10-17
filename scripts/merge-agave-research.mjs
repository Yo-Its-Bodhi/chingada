import { readFile, writeFile, stat } from "node:fs/promises";
import { agaveRecords } from "../app/agave-data.ts";
import { houseInfusions } from "../app/house-infusions.ts";

const known = new Map([...agaveRecords, ...houseInfusions].map(record=>[record.id,record]));
const merged = new Map();
for (const batch of ["a", "b", "c", "d"]) {
  let input;
  try {input=JSON.parse(await readFile(new URL(`../reports/agave-research-${batch}.json`,import.meta.url),"utf8"));}
  catch(error) {if(error.code === "ENOENT") continue; throw error;}
  for(const record of Array.isArray(input) ? input : input.records) {
    if(!known.has(record.id) || known.get(record.id).name !== record.name) throw new Error(`Unknown collection record ${record.id}`);
    if(merged.has(record.id)) throw new Error(`Duplicate research record ${record.id}`);
    for(const source of record.sources ?? []) if(!/^https:\/\//.test(source.url)) throw new Error(`Invalid source for ${record.id}`);
    for(const [field,value] of Object.entries(record.facts ?? {})) if(typeof value !== "string") throw new Error(`Non-text ${field} for ${record.id}`);
    if(record.image) {
      if(!record.image.localPath.startsWith("/images/agave-researched/") || record.image.localPath.includes("..")) throw new Error(`Invalid image path for ${record.id}`);
      if(record.image.alphaVerified && record.image.visualVerified) {
        const asset = await stat(new URL(`../public${record.image.localPath}`,import.meta.url));
        if(!asset.isFile() || !record.image.width || !record.image.height) throw new Error(`Invalid image for ${record.id}`);
      }
    }
    merged.set(record.id,record);
  }
}
const records=[...merged.values()].sort((a,b)=>a.id-b.id);
await writeFile(new URL("../app/agave-research-data.json",import.meta.url),JSON.stringify(records,null,2)+"\n");
console.log(JSON.stringify({records:records.length,expressionsVerified:records.filter(record=>record.expressionVerified).length,photosApproved:records.filter(record=>record.expressionVerified && record.image?.alphaVerified && record.image?.visualVerified).length}));
