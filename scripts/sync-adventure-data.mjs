import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frontendFile = path.resolve(
  process.env.COMPANION_GAMES_ADVENTURE_FILE ||
    path.join(repoDir, "..", "..", "Apps", "Companion Games", "adventure.js"),
);
const outputFile = path.join(repoDir, "src", "houseAdventureData.ts");

if (!existsSync(frontendFile)) {
  throw new Error(`Companion Games adventure source not found: ${frontendFile}`);
}

const source = readFileSync(frontendFile, "utf8");
const startMarker = "const houseScenes = ";
const endMarker = "\n};\n\nconst adventures";
const start = source.indexOf(startMarker);
const end = source.indexOf(endMarker, start);

if (start === -1 || end === -1) {
  throw new Error("Could not extract houseScenes from the frontend adventure source.");
}

const objectLiteral = `${source.slice(start + startMarker.length, end)}\n}`.replaceAll(
  "${assetBasePath}",
  ".",
);

writeFileSync(
  outputFile,
  `// Generated from Companion Games/adventure.js by npm run sync:adventure.\nexport const houseScenesData = ${objectLiteral} as const;\n`,
  "utf8",
);

console.log(`Synced The House That Whispers into ${outputFile}`);
