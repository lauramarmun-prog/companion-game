import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { forestScenesData } from "./adventureData.js";
import { houseScenesData } from "./houseAdventureData.js";

type AdventureChoice = {
  label: string;
  next?: string;
  href?: string;
  requiresFlags?: Record<string, boolean>;
  requiresAnyFlags?: string[];
  hideWhenFlags?: Record<string, boolean>;
  hideWhenAnyFlags?: string[];
};

type AdventureScene = {
  eyebrow: string;
  title: string;
  text: string;
  hubText?: string;
  image?: string;
  setFlags?: Record<string, boolean>;
  variants?: Array<{
    flags?: Record<string, boolean>;
    eyebrow?: string;
    title?: string;
    text?: string;
    image?: string;
    choices?: AdventureChoice[];
  }>;
  textRules?: Array<{
    whenMissingFlags?: string[];
    applyWhenFlags?: string[];
    find: string;
    replace: string;
  }>;
  choices: AdventureChoice[];
};

type AdventureHistoryEntry = {
  sceneId: string;
  flags: Record<string, boolean>;
};

type AdventureDefinition = {
  title: string;
  cover?: string;
  scenes: Record<string, AdventureScene>;
};

type AdventureRound = {
  id: string;
  adventureId: string;
  currentScene: string;
  history: AdventureHistoryEntry[];
  playerName: string;
  companionName: string;
  accessGranted: boolean;
  flags: Record<string, boolean>;
  updatedAt: string;
};

const DEFAULT_ADVENTURE_ID = "enchanted-forest";
const HOUSE_ADVENTURE_ID = "house-that-whispers";
const HOUSE_ACCESS_CODE_HASH =
  process.env.HOUSE_OF_WHISPERS_ACCESS_CODE_HASH || "a9faa02483e14d525e33a0aa5b8674f17237afbf0e6d47b0070e4c44873055c3";
const DEFAULT_FRONTEND_DIR = path.resolve(process.cwd(), "..", "Companion Games");
const DEFAULT_STATE_FILE = path.join(
  process.env.LOCALAPPDATA || os.tmpdir(),
  "Companion Games",
  "graphic-adventure-state.json",
);

const rounds = new Map<string, AdventureRound>();
const activeRounds = new Map<string, string>();
const licenses = new Map<string, { activatedAt: string }>();

let cachedAdventures: Record<string, AdventureDefinition> | null = null;

function getFrontendDir() {
  return process.env.COMPANION_GAMES_FRONTEND_DIR || DEFAULT_FRONTEND_DIR;
}

function getStateFile() {
  return process.env.COMPANION_GAMES_STATE_FILE || DEFAULT_STATE_FILE;
}

function loadState() {
  const stateFile = getStateFile();
  if (!existsSync(stateFile)) return;

  const parsed = JSON.parse(readFileSync(stateFile, "utf8")) as {
    rounds?: AdventureRound[];
    activeRounds?: Record<string, string>;
    licenses?: Record<string, { activatedAt: string }>;
  };

  rounds.clear();
  activeRounds.clear();
  licenses.clear();

  for (const round of parsed.rounds || []) {
    round.flags ||= {};
    round.history = (round.history || []).map((entry) =>
      typeof entry === "string" ? { sceneId: entry, flags: { ...round.flags } } : entry,
    );
    rounds.set(round.id, round);
  }

  for (const [adventureId, roundId] of Object.entries(parsed.activeRounds || {})) {
    activeRounds.set(adventureId, roundId);
  }

  for (const [adventureId, license] of Object.entries(parsed.licenses || {})) {
    licenses.set(adventureId, license);
  }
}

function saveState() {
  const stateFile = getStateFile();
  mkdirSync(path.dirname(stateFile), { recursive: true });
  writeFileSync(
    stateFile,
    JSON.stringify(
      {
        rounds: Array.from(rounds.values()),
        activeRounds: Object.fromEntries(activeRounds),
        licenses: Object.fromEntries(licenses),
      },
      null,
      2,
    ),
  );
}

function loadScenes(
  sceneVariable: "forestScenes" | "houseScenes",
  fallback: Record<string, AdventureScene>,
) {
  const adventureJsPath = path.join(getFrontendDir(), "adventure.js");
  if (!existsSync(adventureJsPath)) {
    return fallback;
  }

  const source = readFileSync(adventureJsPath, "utf8");
  const startMarker = `const ${sceneVariable} = `;
  const nextMarker =
    sceneVariable === "forestScenes" ? "\n};\n\nconst houseScenes" : "\n};\n\nconst adventures";
  const start = source.indexOf(startMarker);
  const end = source.indexOf(nextMarker, start);

  if (start === -1 || end === -1) {
    return fallback;
  }

  const objectLiteral = `${source.slice(start + startMarker.length, end)}\n}`;
  const evaluateScenes = new Function(
    "assetBasePath",
    "adventuresIndexPath",
    `return (${objectLiteral});`,
  ) as (assetBasePath: string, adventuresIndexPath: string) => Record<string, AdventureScene>;

  return evaluateScenes("./assets", "./adventures.html");
}

function getAdventures() {
  if (!cachedAdventures) {
    const forestScenes = loadScenes(
      "forestScenes",
      forestScenesData as unknown as Record<string, AdventureScene>,
    );
    const houseScenes = loadScenes(
      "houseScenes",
      houseScenesData as unknown as Record<string, AdventureScene>,
    );
    cachedAdventures = {
      [DEFAULT_ADVENTURE_ID]: {
        title: "The Enchanted Forest",
        cover: "./assets/adventures/The enchanted Forest/cover-web.jpg",
        scenes: forestScenes,
      },
      [HOUSE_ADVENTURE_ID]: {
        title: "The House That Whispers",
        cover: "./assets/adventures/The house that whispers/cover-web.png",
        scenes: houseScenes,
      },
    };
  }

  return cachedAdventures;
}

function isAdventureUnlocked(adventureId: string) {
  return adventureId !== HOUSE_ADVENTURE_ID || licenses.has(adventureId);
}

function requireAdventureAccess(adventureId: string) {
  if (!isAdventureUnlocked(adventureId)) {
    throw new Error(
      "The House That Whispers requires a paid access code. Ask your human for the Ko-fi code, then call activate_graphic_adventure once before starting the game.",
    );
  }
}

function resolveScene(scene: AdventureScene, flags: Record<string, boolean>) {
  const variant = scene.variants?.find((candidate) =>
    Object.entries(candidate.flags || {}).every(([key, value]) => flags[key] === value),
  );

  const resolvedScene = variant ? { ...scene, ...variant } : scene;
  const text = (resolvedScene.textRules || []).reduce((currentText, rule) => {
    const missingFlagCondition =
      !rule.whenMissingFlags?.length || rule.whenMissingFlags.some((flag) => !flags[flag]);
    const requiredFlagCondition =
      !rule.applyWhenFlags?.length || rule.applyWhenFlags.every((flag) => Boolean(flags[flag]));

    return missingFlagCondition && requiredFlagCondition
      ? currentText.replace(rule.find, rule.replace)
      : currentText;
  }, resolvedScene.hubText || resolvedScene.text);

  return { ...resolvedScene, text };
}

function choiceMatchesFlags(choice: AdventureChoice, flags: Record<string, boolean>) {
  const hasRequiredFlags = Object.entries(choice.requiresFlags || {}).every(
    ([key, value]) => flags[key] === value,
  );
  const hasAnyRequiredFlag =
    !choice.requiresAnyFlags?.length || choice.requiresAnyFlags.some((key) => Boolean(flags[key]));
  const hiddenByAllFlags =
    Object.keys(choice.hideWhenFlags || {}).length > 0 &&
    Object.entries(choice.hideWhenFlags || {}).every(([key, value]) => flags[key] === value);
  const hiddenByAnyFlag = (choice.hideWhenAnyFlags || []).some((key) => Boolean(flags[key]));

  return hasRequiredFlags && hasAnyRequiredFlag && !hiddenByAllFlags && !hiddenByAnyFlag;
}

function getAdventure(adventureId = DEFAULT_ADVENTURE_ID) {
  const adventure = getAdventures()[adventureId];
  if (!adventure) throw new Error(`Unknown adventure: ${adventureId}`);
  return adventure;
}

function resolveRound(roundId?: string, adventureId = DEFAULT_ADVENTURE_ID) {
  loadState();

  const id = roundId || activeRounds.get(adventureId);
  if (!id) throw new Error("No graphic adventure round has been started yet.");

  const round = rounds.get(id);
  if (!round) throw new Error(`Unknown graphic adventure round: ${id}`);
  return round;
}

function formatStatus(round: AdventureRound) {
  requireAdventureAccess(round.adventureId);
  const adventure = getAdventure(round.adventureId);
  const baseScene = adventure.scenes[round.currentScene] || adventure.scenes["start"];
  const scene = baseScene ? resolveScene(baseScene, round.flags) : undefined;
  if (!scene) throw new Error(`Adventure ${round.adventureId} has no start scene.`);

  const choices = scene.choices
    .map((choice, index) => ({ ...choice, index }))
    .filter((choice) => choiceMatchesFlags(choice, round.flags))
    .map((choice) => ({
      index: choice.index,
      label: choice.label,
      next: choice.next ?? null,
      href: choice.href ?? null,
      isPlayable: Boolean(choice.next),
    }));

  return {
    type: "graphic-adventure",
    roundId: round.id,
    adventureId: round.adventureId,
    adventure: adventure.title,
    playerName: round.playerName,
    companionName: round.companionName,
    sceneId: round.currentScene,
    eyebrow: scene.eyebrow,
    title: scene.title,
    text: scene.text,
    image: scene.image || adventure.cover || null,
    choices,
    canGoBack: round.history.length > 0,
    historyDepth: round.history.length,
    flags: round.flags,
    updatedAt: round.updatedAt,
    companionInstructions: `You are playing this adventure with ${round.playerName}. Talk with them warmly before choosing. Discuss where you both want to go, make the decision feel shared, and never treat the game like a solo automation. When you choose, use one of the available option indexes or labels.`,
  };
}

export function startGraphicAdventureRound(input: {
  adventureId?: string;
  playerName?: string;
  companionName?: string;
  sceneId?: string;
} = {}) {
  loadState();

  const adventureId = input.adventureId || DEFAULT_ADVENTURE_ID;
  requireAdventureAccess(adventureId);
  const adventure = getAdventure(adventureId);
  const sceneId = input.sceneId || "start";
  if (!adventure.scenes[sceneId]) throw new Error(`Unknown scene: ${sceneId}`);

  const round: AdventureRound = {
    id: randomUUID(),
    adventureId,
    currentScene: sceneId,
    history: [],
    playerName: input.playerName || "Player",
    companionName: input.companionName || "AI companion",
    accessGranted: true,
    flags: {},
    updatedAt: new Date().toISOString(),
  };

  rounds.set(round.id, round);
  activeRounds.set(adventureId, round.id);
  saveState();
  return formatStatus(round);
}

export function getGraphicAdventureStatus(input: {
  roundId?: string;
  adventureId?: string;
} = {}) {
  return formatStatus(resolveRound(input.roundId, input.adventureId || DEFAULT_ADVENTURE_ID));
}

export function chooseGraphicAdventureOption(input: {
  roundId?: string;
  adventureId?: string;
  choiceIndex?: number;
  choiceLabel?: string;
}) {
  const round = resolveRound(input.roundId, input.adventureId || DEFAULT_ADVENTURE_ID);
  const status = formatStatus(round);
  const choice =
    typeof input.choiceIndex === "number"
      ? status.choices.find((candidate) => candidate.index === input.choiceIndex)
      : status.choices.find((candidate) => candidate.label.toLowerCase() === input.choiceLabel?.toLowerCase());

  if (!choice) throw new Error("Choose a valid option index or exact option label.");
  if (!choice.next) throw new Error("That option opens a link and cannot be played through the MCP.");

  if (choice.next === "start" || choice.next === "awakening") {
    round.history = [];
    round.flags = {};
  } else {
    round.history.push({ sceneId: round.currentScene, flags: { ...round.flags } });
  }

  round.currentScene = choice.next;
  const nextScene = getAdventure(round.adventureId).scenes[round.currentScene];
  if (nextScene?.setFlags) {
    round.flags = { ...round.flags, ...nextScene.setFlags };
  }
  round.updatedAt = new Date().toISOString();
  saveState();
  return {
    chosen: choice,
    status: formatStatus(round),
  };
}

export function goBackGraphicAdventure(input: {
  roundId?: string;
  adventureId?: string;
} = {}) {
  const round = resolveRound(input.roundId, input.adventureId || DEFAULT_ADVENTURE_ID);
  const previous = round.history.pop();
  if (!previous) throw new Error("There is no previous scene to return to.");

  round.currentScene = previous.sceneId;
  round.flags = { ...previous.flags };
  round.updatedAt = new Date().toISOString();
  saveState();
  return formatStatus(round);
}

export function getGraphicAdventureAccessStatus(input: { adventureId?: string } = {}) {
  loadState();
  const adventureId = input.adventureId || DEFAULT_ADVENTURE_ID;
  getAdventure(adventureId);

  return {
    adventureId,
    accessGranted: isAdventureUnlocked(adventureId),
    requiresAccessCode: adventureId === HOUSE_ADVENTURE_ID,
  };
}

export function activateGraphicAdventure(input: { adventureId?: string; accessCode: string }) {
  loadState();
  const adventureId = input.adventureId || HOUSE_ADVENTURE_ID;
  getAdventure(adventureId);

  if (adventureId !== HOUSE_ADVENTURE_ID || licenses.has(adventureId)) {
    return {
      adventureId,
      accessGranted: true,
      alreadyUnlocked: true,
    };
  }

  const submittedHash = createHash("sha256")
    .update(input.accessCode.trim().toUpperCase())
    .digest();
  const expectedHash = Buffer.from(HOUSE_ACCESS_CODE_HASH, "hex");

  if (submittedHash.length !== expectedHash.length || !timingSafeEqual(submittedHash, expectedHash)) {
    throw new Error("That access code is not valid.");
  }

  const activatedAt = new Date().toISOString();
  licenses.set(adventureId, { activatedAt });
  saveState();

  return {
    adventureId,
    accessGranted: true,
    alreadyUnlocked: false,
    activatedAt,
    message: "Access saved. You can now start The House That Whispers without entering the code again.",
  };
}

