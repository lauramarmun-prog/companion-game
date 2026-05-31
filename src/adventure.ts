import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { forestScenesData } from "./adventureData.js";

type AdventureChoice = {
  label: string;
  next?: string;
  href?: string;
};

type AdventureScene = {
  eyebrow: string;
  title: string;
  text: string;
  image?: string;
  choices: AdventureChoice[];
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
  history: string[];
  playerName: string;
  companionName: string;
  accessGranted: boolean;
  updatedAt: string;
};

const DEFAULT_ADVENTURE_ID = "enchanted-forest";
const DEFAULT_FRONTEND_DIR = path.resolve(process.cwd(), "..", "Companion Games");
const DEFAULT_STATE_FILE = path.join(
  process.env.LOCALAPPDATA || os.tmpdir(),
  "Companion Games",
  "graphic-adventure-state.json",
);

const rounds = new Map<string, AdventureRound>();
const activeRounds = new Map<string, string>();

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
  };

  rounds.clear();
  activeRounds.clear();

  for (const round of parsed.rounds || []) {
    rounds.set(round.id, round);
  }

  for (const [adventureId, roundId] of Object.entries(parsed.activeRounds || {})) {
    activeRounds.set(adventureId, roundId);
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
      },
      null,
      2,
    ),
  );
}

function loadForestScenes() {
  const adventureJsPath = path.join(getFrontendDir(), "adventure.js");
  if (!existsSync(adventureJsPath)) {
    return forestScenesData as unknown as Record<string, AdventureScene>;
  }

  const source = readFileSync(adventureJsPath, "utf8");
  const startMarker = "const forestScenes = ";
  const endMarker = "\n};\n\nconst adventures";
  const start = source.indexOf(startMarker);
  const end = source.indexOf(endMarker, start);

  if (start === -1 || end === -1) {
    throw new Error("Could not read forest scenes from adventure.js.");
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
    const forestScenes = loadForestScenes();
    cachedAdventures = {
      [DEFAULT_ADVENTURE_ID]: {
        title: "The Enchanted Forest",
        cover: "./assets/adventures/The enchanted Forest/cover-web.jpg",
        scenes: forestScenes,
      },
    };
  }

  return cachedAdventures;
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
  const adventure = getAdventure(round.adventureId);
  const scene = adventure.scenes[round.currentScene] || adventure.scenes["start"];
  if (!scene) throw new Error(`Adventure ${round.adventureId} has no start scene.`);

  const choices = scene.choices.map((choice, index) => ({
    index,
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
    updatedAt: round.updatedAt,
    companionInstructions:
      "You are playing this adventure with your human, Laura. Talk with her warmly before choosing. Discuss where you both want to go, make the decision feel shared, and never treat the game like a solo automation. When you choose, use one of the available option indexes or labels.",
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
  const adventure = getAdventure(adventureId);
  const sceneId = input.sceneId || "start";
  if (!adventure.scenes[sceneId]) throw new Error(`Unknown scene: ${sceneId}`);

  const round: AdventureRound = {
    id: randomUUID(),
    adventureId,
    currentScene: sceneId,
    history: [],
    playerName: input.playerName || "Laura",
    companionName: input.companionName || "AI companion",
    accessGranted: true,
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
      ? status.choices[input.choiceIndex]
      : status.choices.find((candidate) => candidate.label.toLowerCase() === input.choiceLabel?.toLowerCase());

  if (!choice) throw new Error("Choose a valid option index or exact option label.");
  if (!choice.next) throw new Error("That option opens a link and cannot be played through the MCP.");

  if (choice.next === "start") {
    round.history = [];
  } else {
    round.history.push(round.currentScene);
  }

  round.currentScene = choice.next;
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
  const previousScene = round.history.pop();
  if (!previousScene) throw new Error("There is no previous scene to return to.");

  round.currentScene = previousScene;
  round.updatedAt = new Date().toISOString();
  saveState();
  return formatStatus(round);
}
