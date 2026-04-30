export type HangmanTurn = "human" | "ai";

export type HangmanRound = {
  id: string;
  turn: HangmanTurn;
  secretWord?: string;
  clue: string;
  wordLength: number;
  usedLetters: string[];
  missedLetters: string[];
  maxWrong: number;
  status: "playing" | "won" | "lost";
  createdAt: string;
  updatedAt: string;
};

export type PublicHangmanStatus = {
  roundId: string;
  turn: HangmanTurn;
  clue: string;
  wordLength: number;
  hasSecretWord: boolean;
  mask: string;
  usedLetters: string[];
  missedLetters: string[];
  wrongGuesses: number;
  maxWrong: number;
  status: "playing" | "won" | "lost";
  nextActor: "human" | "ai";
};

const rounds = new Map<string, HangmanRound>();
let activeRoundId: string | undefined;

function createId() {
  return `hangman_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function cleanWord(value: string) {
  return value.toUpperCase().replace(/[^A-Z]/g, "");
}

function now() {
  return new Date().toISOString();
}

function getMask(round: HangmanRound) {
  if (!round.secretWord) return "_ ".repeat(round.wordLength).trim();

  return round.secretWord
    .split("")
    .map((letter) => (round.usedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

function getPublicStatus(round: HangmanRound): PublicHangmanStatus {
  return {
    roundId: round.id,
    turn: round.turn,
    clue: round.clue,
    wordLength: round.wordLength,
    hasSecretWord: Boolean(round.secretWord),
    mask: getMask(round),
    usedLetters: [...round.usedLetters],
    missedLetters: [...round.missedLetters],
    wrongGuesses: round.missedLetters.length,
    maxWrong: round.maxWrong,
    status: round.status,
    nextActor: round.turn,
  };
}

export function startHangmanRound(input: {
  turn: HangmanTurn;
  clue: string;
  secretWord?: string;
  wordLength?: number;
}) {
  const secretWord = input.secretWord ? cleanWord(input.secretWord) : undefined;
  const wordLength = secretWord?.length ?? input.wordLength;

  if (!wordLength || wordLength < 1) {
    throw new Error("A hangman round needs either a secret word or a word length.");
  }

  if (!input.clue.trim()) {
    throw new Error("A hangman round needs a clue.");
  }

  const timestamp = now();
  const round: HangmanRound = {
    id: createId(),
    turn: input.turn,
    secretWord,
    clue: input.clue.trim(),
    wordLength,
    usedLetters: [],
    missedLetters: [],
    maxWrong: 6,
    status: "playing",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  rounds.set(round.id, round);
  activeRoundId = round.id;
  return getPublicStatus(round);
}

export function getHangmanStatus(roundId = activeRoundId) {
  if (!roundId) throw new Error("No hangman round has been started yet.");

  const round = rounds.get(roundId);
  if (!round) throw new Error(`Hangman round not found: ${roundId}`);

  return getPublicStatus(round);
}

export function submitHangmanLetter(input: { roundId?: string; letter: string }) {
  const roundId = input.roundId ?? activeRoundId;
  if (!roundId) throw new Error("No hangman round has been started yet.");

  const round = rounds.get(roundId);
  if (!round) throw new Error(`Hangman round not found: ${roundId}`);
  if (round.status !== "playing") {
    return {
      correct: false,
      repeated: false,
      message: `This round is already ${round.status}.`,
      status: getPublicStatus(round),
    };
  }
  if (!round.secretWord) {
    throw new Error("This round does not have a private secret word yet.");
  }

  const letter = cleanWord(input.letter).slice(0, 1);
  if (!letter) throw new Error("Submit one letter from A to Z.");

  const repeated = round.usedLetters.includes(letter);
  const correct = round.secretWord.includes(letter);

  if (!repeated) {
    round.usedLetters.push(letter);
    round.usedLetters.sort();

    if (!correct) {
      round.missedLetters.push(letter);
      round.missedLetters.sort();
    }
  }

  const foundAllLetters = round.secretWord.split("").every((item) => round.usedLetters.includes(item));
  if (foundAllLetters) round.status = "won";
  if (round.missedLetters.length >= round.maxWrong) round.status = "lost";
  round.updatedAt = now();

  return {
    correct,
    repeated,
    letter,
    message: repeated
      ? `${letter} was already used.`
      : correct
        ? `${letter} is in the word.`
        : `${letter} is not in the word.`,
    status: getPublicStatus(round),
  };
}

export function submitHangmanWord(input: { roundId?: string; word: string }) {
  const roundId = input.roundId ?? activeRoundId;
  if (!roundId) throw new Error("No hangman round has been started yet.");

  const round = rounds.get(roundId);
  if (!round) throw new Error(`Hangman round not found: ${roundId}`);
  if (round.status !== "playing") {
    return {
      correct: false,
      message: `This round is already ${round.status}.`,
      status: getPublicStatus(round),
    };
  }
  if (!round.secretWord) {
    throw new Error("This round does not have a private secret word yet.");
  }

  const word = cleanWord(input.word);
  if (!word) throw new Error("Submit a word with letters from A to Z.");

  const correct = word === round.secretWord;
  if (correct) {
    round.secretWord.split("").forEach((letter) => {
      if (!round.usedLetters.includes(letter)) round.usedLetters.push(letter);
    });
    round.usedLetters.sort();
    round.status = "won";
  } else {
    round.missedLetters.push(word);
    round.missedLetters.sort();
    if (round.missedLetters.length >= round.maxWrong) round.status = "lost";
  }

  round.updatedAt = now();

  return {
    correct,
    submittedWord: word,
    message: correct ? "That is the secret word." : "That is not the secret word.",
    status: getPublicStatus(round),
  };
}
