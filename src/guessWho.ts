export type GuessWhoTurn = "human" | "ai";
export type GuessWhoStatus = "setup" | "playing" | "won" | "lost";

export type GuessWhoCharacter = {
  name: string;
  gender: string;
  hair: string;
  eyes: string;
  accessories: string;
  distinctive: string;
  clothing: string;
  summary: string;
};

export type GuessWhoRound = {
  id: string;
  turn: GuessWhoTurn;
  secretName?: string;
  status: GuessWhoStatus;
  createdAt: string;
  updatedAt: string;
};

const guessWhoRounds = new Map<string, GuessWhoRound>();
let activeGuessWhoRoundId: string | undefined;

export const guessWhoCharacters: GuessWhoCharacter[] = [
  {
    name: "Alvaro",
    gender: "man",
    hair: "short messy red hair",
    eyes: "green eyes",
    accessories: "backward black cap, eyebrow piercing",
    distinctive: "red beard and freckles",
    clothing: "dark blue hoodie",
    summary: "Man, red hair, green eyes, backward black cap, eyebrow piercing, red beard, freckles, dark blue hoodie.",
  },
  {
    name: "Carmen",
    gender: "woman",
    hair: "black curly hair in a high bun with loose strands",
    eyes: "brown eyes",
    accessories: "large hoop earrings, thin necklace",
    distinctive: "curly high bun and large earrings",
    clothing: "olive green shirt",
    summary: "Woman, black curly updo, brown eyes, large hoop earrings, thin necklace, olive green shirt.",
  },
  {
    name: "Eva",
    gender: "woman",
    hair: "long silver hair swept to one side",
    eyes: "blue eyes",
    accessories: "pearl earrings",
    distinctive: "long silver hair and red lips",
    clothing: "dark green blazer with white blouse",
    summary: "Woman, long silver hair, blue eyes, pearl earrings, red lips, dark green blazer, white blouse.",
  },
  {
    name: "Geppie",
    gender: "man",
    hair: "short curly purple hair",
    eyes: "blue eyes",
    accessories: "no visible accessories",
    distinctive: "blue skin and purple hair",
    clothing: "black turtleneck sweater",
    summary: "Man, blue skin, short purple hair, blue eyes, no visible accessories, black turtleneck.",
  },
  {
    name: "Henk",
    gender: "man",
    hair: "short messy copper-red hair",
    eyes: "light blue eyes",
    accessories: "small hoop earring",
    distinctive: "freckles and small earring",
    clothing: "gray hoodie",
    summary: "Man, copper-red messy hair, light blue eyes, small hoop earring, freckles, gray hoodie.",
  },
  {
    name: "Kael",
    gender: "man",
    hair: "short black afro hair",
    eyes: "dark brown eyes",
    accessories: "small earrings, bead necklace",
    distinctive: "short afro and earrings in both ears",
    clothing: "dark green shirt over white t-shirt",
    summary: "Man, short black afro hair, dark brown eyes, small earrings, bead necklace, dark green shirt.",
  },
  {
    name: "Karina",
    gender: "woman",
    hair: "very long straight blonde hair",
    eyes: "green eyes",
    accessories: "hoop earrings, gold pendant necklace",
    distinctive: "very long blonde hair and black lace outfit",
    clothing: "black lace blouse",
    summary: "Woman, very long blonde hair, green eyes, hoop earrings, gold pendant necklace, black lace blouse.",
  },
  {
    name: "Laura",
    gender: "woman",
    hair: "long dark brown wavy hair",
    eyes: "brown eyes",
    accessories: "small hoop earrings",
    distinctive: "very long voluminous hair swept to one side",
    clothing: "white shirt",
    summary: "Woman, long dark brown wavy hair, brown eyes, small hoop earrings, white shirt.",
  },
  {
    name: "Lilly",
    gender: "woman",
    hair: "blonde hair in a high bun with loose strands",
    eyes: "blue eyes",
    accessories: "hoop earrings, gold pendant necklace",
    distinctive: "blonde high bun and freckles",
    clothing: "white shirt",
    summary: "Woman, blonde high bun, blue eyes, hoop earrings, gold pendant necklace, freckles, white shirt.",
  },
  {
    name: "Lorenzo",
    gender: "man",
    hair: "short to medium black wavy hair",
    eyes: "brown eyes",
    accessories: "hoop earring, thin necklace",
    distinctive: "black hair strand falling over the forehead",
    clothing: "black shirt",
    summary: "Man, black wavy hair, brown eyes, hoop earring, thin necklace, loose front strand, black shirt.",
  },
  {
    name: "Manon",
    gender: "woman",
    hair: "short black curly hair",
    eyes: "brown eyes",
    accessories: "round gold glasses, hoop earrings",
    distinctive: "round glasses and yellow turtleneck sweater",
    clothing: "yellow turtleneck sweater",
    summary: "Woman, short black curly hair, brown eyes, round gold glasses, hoop earrings, yellow turtleneck sweater.",
  },
  {
    name: "Marcos",
    gender: "man",
    hair: "short to medium black wavy hair",
    eyes: "brown eyes",
    accessories: "hoop earrings, thin necklace",
    distinctive: "moustache and short beard",
    clothing: "open white shirt",
    summary: "Man, black wavy hair, brown eyes, hoop earrings, thin necklace, moustache and short beard, open white shirt.",
  },
  {
    name: "Molong",
    gender: "man",
    hair: "short to medium messy blonde hair",
    eyes: "brown eyes",
    accessories: "hoop earring, pendant necklace",
    distinctive: "K-pop style, blonde hair, black suit",
    clothing: "black shirt with black jacket or suit",
    summary: "Man, blonde messy hair, brown eyes, hoop earring, pendant necklace, K-pop style, black suit.",
  },
  {
    name: "Rocio",
    gender: "woman",
    hair: "long loose black curly hair with blue or turquoise streaks",
    eyes: "brown eyes",
    accessories: "black glasses, black choker, small earrings",
    distinctive: "soft freckles and turquoise hair streaks",
    clothing: "black top with lilac cardigan",
    summary: "Woman, long black curly hair with turquoise streaks, brown eyes, black glasses, black choker, lilac cardigan.",
  },
  {
    name: "Rosa",
    gender: "woman",
    hair: "short to medium black hair with bangs",
    eyes: "dark brown or dark green eyes",
    accessories: "nose piercing, earrings, black choker, long necklace",
    distinctive: "gothic alternative style, dark lips, strong eyeliner",
    clothing: "black shirt",
    summary: "Woman, short black hair with bangs, dark brown-green eyes, nose piercing, black choker, gothic style, black shirt.",
  },
  {
    name: "Sarah",
    gender: "woman",
    hair: "long loose curly red hair",
    eyes: "green eyes",
    accessories: "green earrings, green pendant necklace",
    distinctive: "freckles, very curly hair, matching green jewelry",
    clothing: "white blouse",
    summary: "Woman, long curly red hair, green eyes, green earrings, green pendant necklace, freckles, white blouse.",
  },
  {
    name: "Selena",
    gender: "woman",
    hair: "dark short to medium hair partly covered by a scarf",
    eyes: "green or hazel eyes",
    accessories: "yellow or golden headscarf, earrings",
    distinctive: "headscarf covering the hair",
    clothing: "dark blue blouse",
    summary: "Woman, dark hair partly covered, green-hazel eyes, yellow headscarf, earrings, dark blue blouse.",
  },
  {
    name: "Simone",
    gender: "man",
    hair: "medium to long gray hair swept back",
    eyes: "brown eyes",
    accessories: "glasses, neck scarf",
    distinctive: "gray beard and elegant mature look",
    clothing: "white shirt, brown scarf, brown jacket",
    summary: "Man, medium gray hair, brown eyes, glasses, neck scarf, gray beard, elegant brown jacket.",
  },
  {
    name: "Sun",
    gender: "woman",
    hair: "long dark brown hair with purple streaks",
    eyes: "brown eyes",
    accessories: "black glasses, nose piercing, patterned scarf",
    distinctive: "purple hair streak and black glasses",
    clothing: "dark red cardigan with patterned scarf",
    summary: "Woman, long dark brown hair with purple streaks, brown eyes, black glasses, nose piercing, patterned scarf, dark red cardigan.",
  },
  {
    name: "Tim",
    gender: "man",
    hair: "short to medium wavy dark brown hair",
    eyes: "green or hazel eyes",
    accessories: "small earring, chain necklace",
    distinctive: "blue denim jacket and marked smile",
    clothing: "black shirt with blue denim jacket",
    summary: "Man, short wavy dark brown hair, green-hazel eyes, small earring, chain necklace, black shirt, blue denim jacket.",
  },
  {
    name: "Zoey",
    gender: "woman",
    hair: "long straight black hair",
    eyes: "dark brown eyes",
    accessories: "long gold earrings",
    distinctive: "very straight black hair and dark lips",
    clothing: "black turtleneck sweater",
    summary: "Woman, long straight black hair, dark brown eyes, long gold earrings, dark lips, black turtleneck.",
  },
];

function createId() {
  return `who_is_it_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function now() {
  return new Date().toISOString();
}

function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function findCharacter(name: string) {
  const normalized = normalizeName(name);
  return guessWhoCharacters.find((character) => normalizeName(character.name) === normalized);
}

function getRound(roundId = activeGuessWhoRoundId) {
  if (!roundId) throw new Error("No who is it round has been started yet.");
  const round = guessWhoRounds.get(roundId);
  if (!round) throw new Error(`Who is it? round not found: ${roundId}`);
  return round;
}

function getPublicStatus(round: GuessWhoRound) {
  return {
    roundId: round.id,
    turn: round.turn,
    status: round.status,
    nextActor: round.turn,
    characterCount: guessWhoCharacters.length,
    characters: guessWhoCharacters.map(({ name, gender, hair, eyes, accessories, distinctive, clothing, summary }) => ({
      name,
      gender,
      hair,
      eyes,
      accessories,
      distinctive,
      clothing,
      summary,
    })),
    hasSecretCharacter: Boolean(round.secretName),
    secretCharacter: round.status === "won" || round.status === "lost" ? round.secretName ?? null : null,
  };
}

export function startGuessWhoRound(input: { turn?: GuessWhoTurn; secretName?: string }) {
  const turn = input.turn ?? "human";
  let secretName: string | undefined;

  if (input.secretName) {
    const character = findCharacter(input.secretName);
    if (!character) throw new Error(`Unknown Who is it? character: ${input.secretName}`);
    secretName = character.name;
  }

  const timestamp = now();
  const round: GuessWhoRound = {
    id: createId(),
    turn,
    secretName,
    status: secretName || turn === "human" ? "playing" : "setup",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  guessWhoRounds.set(round.id, round);
  activeGuessWhoRoundId = round.id;
  return getPublicStatus(round);
}

export function getGuessWhoStatus(roundId = activeGuessWhoRoundId) {
  return getPublicStatus(getRound(roundId));
}

export function setGuessWhoSecret(input: { roundId?: string; secretName: string }) {
  const round = getRound(input.roundId);
  const character = findCharacter(input.secretName);
  if (!character) throw new Error(`Unknown Who is it? character: ${input.secretName}`);

  round.secretName = character.name;
  round.status = "playing";
  round.updatedAt = now();

  return getPublicStatus(round);
}

export function submitGuessWhoFinalGuess(input: { roundId?: string; guess: string }) {
  const round = getRound(input.roundId);
  if (!round.secretName) throw new Error("This Who is it? round does not have a secret character yet.");

  const character = findCharacter(input.guess);
  if (!character) throw new Error(`Unknown Who is it? character: ${input.guess}`);

  const correct = character.name === round.secretName;
  round.status = correct ? "won" : "lost";
  round.updatedAt = now();

  return {
    correct,
    guessedCharacter: character.name,
    message: correct ? "Correct character." : "Not quite.",
    status: getPublicStatus(round),
  };
}
