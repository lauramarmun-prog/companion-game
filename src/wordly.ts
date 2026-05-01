export type WordlyTurn = "human" | "ai";
export type WordlyLetterScore = "hit" | "near" | "miss";
export type WordlyStatus = "playing" | "won" | "lost";

export type WordlyGuess = {
  word: string;
  score: WordlyLetterScore[];
};

export type WordlyRound = {
  id: string;
  turn: WordlyTurn;
  secretWord: string;
  clue: string | null;
  guesses: WordlyGuess[];
  maxGuesses: number;
  status: WordlyStatus;
  createdAt: string;
  updatedAt: string;
};

const wordlyRounds = new Map<string, WordlyRound>();
let activeWordlyRoundId: string | undefined;

function createId() {
  return `wordly_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function now() {
  return new Date().toISOString();
}

function cleanWord(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase();
}

function scoreGuess(guess: string, target: string): WordlyLetterScore[] {
  const result = Array<WordlyLetterScore>(5).fill("miss");
  const remaining = target.split("");

  guess.split("").forEach((letter, index) => {
    if (letter === target[index]) {
      result[index] = "hit";
      remaining[index] = "";
    }
  });

  guess.split("").forEach((letter, index) => {
    if (result[index] === "hit") return;

    const found = remaining.indexOf(letter);
    if (found !== -1) {
      result[index] = "near";
      remaining[found] = "";
    }
  });

  return result;
}

function getPublicStatus(round: WordlyRound) {
  const complete = round.status !== "playing";

  return {
    roundId: round.id,
    turn: round.turn,
    clue: round.clue,
    wordLength: 5,
    guesses: round.guesses.map((guess) => ({
      word: guess.word,
      score: [...guess.score],
    })),
    maxGuesses: round.maxGuesses,
    guessCount: round.guesses.length,
    remainingGuesses: Math.max(round.maxGuesses - round.guesses.length, 0),
    status: round.status,
    nextActor: round.turn,
    answer: complete ? round.secretWord : null,
  };
}

export function startWordlyRound(input: {
  turn?: WordlyTurn;
  secretWord: string;
  clue?: string | null;
  maxGuesses?: number;
}) {
  const secretWord = cleanWord(input.secretWord);
  if (secretWord.length !== 5) {
    throw new Error("Wordly needs a secret word with exactly 5 letters.");
  }

  const timestamp = now();
  const round: WordlyRound = {
    id: createId(),
    turn: input.turn ?? "human",
    secretWord,
    clue: input.clue?.trim() || null,
    guesses: [],
    maxGuesses: input.maxGuesses ?? 6,
    status: "playing",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  wordlyRounds.set(round.id, round);
  activeWordlyRoundId = round.id;
  return getPublicStatus(round);
}

export function getWordlyStatus(roundId = activeWordlyRoundId) {
  if (!roundId) throw new Error("No wordly round has been started yet.");

  const round = wordlyRounds.get(roundId);
  if (!round) throw new Error(`Wordly round not found: ${roundId}`);

  return getPublicStatus(round);
}

export function submitWordlyGuess(input: { roundId?: string; guess: string }) {
  const roundId = input.roundId ?? activeWordlyRoundId;
  if (!roundId) throw new Error("No wordly round has been started yet.");

  const round = wordlyRounds.get(roundId);
  if (!round) throw new Error(`Wordly round not found: ${roundId}`);
  if (round.status !== "playing") {
    return {
      accepted: false,
      message: `This round is already ${round.status}.`,
      status: getPublicStatus(round),
    };
  }

  const guess = cleanWord(input.guess);
  if (guess.length !== 5) {
    throw new Error("Wordly guesses must have exactly 5 letters.");
  }

  const score = scoreGuess(guess, round.secretWord);
  round.guesses.push({ word: guess, score });

  if (guess === round.secretWord) {
    round.status = "won";
  } else if (round.guesses.length >= round.maxGuesses) {
    round.status = "lost";
  }

  round.updatedAt = now();

  return {
    accepted: true,
    guess,
    score,
    correct: guess === round.secretWord,
    message:
      round.status === "won"
        ? "Correct word."
        : round.status === "lost"
          ? "No guesses left."
          : `${round.maxGuesses - round.guesses.length} guesses left.`,
    status: getPublicStatus(round),
  };
}
