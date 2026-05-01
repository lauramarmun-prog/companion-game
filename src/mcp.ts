import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getBattleshipStatus, placeBattleshipFleet, startBattleshipRound, submitBattleshipAttack } from "./battleship.js";
import { getHangmanStatus, startHangmanRound, submitHangmanLetter, submitHangmanWord } from "./hangman.js";
import { getTicTacToeStatus, startTicTacToeRound, submitTicTacToeMove } from "./ticTacToe.js";
import { getWordlyStatus, startWordlyRound, submitWordlyGuess } from "./wordly.js";

function asToolText(value: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(value, null, 2),
      },
    ],
  };
}

const hangmanHowToPlay = `# Hangman MCP - Game Guide for AIs

## What is Hangman?

Hangman is a classic word-guessing game. One player thinks of a secret word and gives a clue. The other player tries to guess the word by suggesting letters one at a time, or by guessing the complete word. You have a limited number of wrong guesses: 6.

## Available tools

### start_hangman_round

Starts a new game round.

Parameters:
- turn: who is guessing.
- "human": you, the AI, choose the word and the human guesses. Provide secretWord and clue.
- "ai": the human chooses the word and you guess. Provide clue and wordLength.
- clue: hint about the word.
- secretWord: the word to guess, only when turn is "human".
- wordLength: number of letters, only when turn is "ai".

Example:
\`\`\`text
start_hangman_round(
  turn="human",
  secretWord="girasol",
  clue="Una flor amarilla que siempre mira al sol"
)
\`\`\`

### get_hangman_status

Gets the current game state.

Returns:
- mask: the word with unknown letters as underscores, for example "_ O _ _ _ _ _ O".
- usedLetters: all letters guessed so far.
- missedLetters: wrong guesses only.
- wrongGuesses: number of mistakes.
- maxWrong: maximum mistakes allowed, normally 6.
- status: "playing", "won", or "lost".
- clue: the hint for this word.
- wordLength: total letters in the word.
- hasSecretWord: whether the private secret word has already been set.

Example response:
\`\`\`json
{
  "mask": "S O L _ _ _ _ O",
  "usedLetters": ["O", "S", "L"],
  "missedLetters": [],
  "wrongGuesses": 0,
  "status": "playing"
}
\`\`\`

### submit_hangman_letter

Guess a single letter.

Parameters:
- letter: one letter to guess, for example "A".

Returns:
- correct: true or false.
- message: feedback message.
- status: updated game state.

Example:
\`\`\`text
submit_hangman_letter(letter="A")
\`\`\`

### submit_hangman_word

Guess the complete word when you think you know it.

Parameters:
- word: the full word you are guessing, for example "solecito".

Returns:
- correct: true or false.
- submittedWord: the word you submitted, uppercase.
- message: feedback message.
- status: updated game state.

If correct, status becomes "won" and the mask reveals the complete word. If wrong, the secret word stays hidden and the wrong guess count increases.

Example:
\`\`\`text
submit_hangman_word(word="laura")
\`\`\`

## Strategy guide for AIs

When you are guessing, turn is "ai":

1. Start with common vowels.
- Spanish: A, E, O, I, U.
- English: E, A, O, I.

2. Then try common consonants.
- Spanish: S, R, N, L, T, D, C.
- English: T, N, S, R, H, L, D.

3. Read the mask pattern.
- "_ O _ _ _ _ _ O" means the word has O in positions 2 and 8.
- "S O L _ _ _ _ O" means it starts with SOL and ends with O.

4. Use submit_hangman_word when:
- You are confident you know the word.
- Only 1 or 2 letters remain unknown and the pattern is clear.
- The clue plus revealed letters make it obvious.
- Do not guess blindly. Wrong word guesses count as mistakes.

5. Example thinking process:

Clue: "da calorcito"
Mask: "S O L _ _ _ _ O" with 8 letters
Letters tried: S, O, L

Analysis:
- Starts with "SOL", sun in Spanish.
- Ends with "O".
- Clue means it gives warmth.
- 8 letters total.
- Likely answer: "SOLECITO".

Action:
\`\`\`text
submit_hangman_word(word="solecito")
\`\`\`

## Complete game flow example

Start the game:
\`\`\`text
start_hangman_round(turn="ai", clue="mi nombre", wordLength=5)
\`\`\`

Get status:
\`\`\`text
get_hangman_status()
\`\`\`

Guess letters:
\`\`\`text
submit_hangman_letter(letter="A")
submit_hangman_letter(letter="L")
\`\`\`

Guess the word:
\`\`\`text
submit_hangman_word(word="laura")
\`\`\`

## Important notes

- You have 6 wrong guesses maximum before losing.
- Repeated letters do not count as wrong guesses.
- The secret word is never revealed in responses unless the round is won through correct guesses.
- Always check the status field: "playing", "won", or "lost".
- Use submit_hangman_word strategically. It is faster, but risky if you are wrong.`;

const ticTacToeHowToPlay = `# Tic-Tac-Toe MCP - Game Guide for AIs

Tic-Tac-Toe is played on a 3 by 3 board. Players take turns placing X or O. The first player to make three in a row wins. A full board with no winner is a draw.

## Board indexes

Use indexes from 0 to 8:

0 | 1 | 2
3 | 4 | 5
6 | 7 | 8

## Available tools

### start_tic_tac_toe_round

Starts a new round. By default the human is X, the AI is O, and X starts.

### get_tic_tac_toe_status

Returns the current board, currentPlayer, availableMoves, status, winner, and winningLine.

### submit_tic_tac_toe_move

Submits one move.

Parameters:
- index: board cell from 0 to 8.
- player: optional, "X" or "O". If omitted, the current player is used.

## Strategy for AIs

1. Win if you can make three in a row.
2. Block the opponent if they can win next.
3. Take the center if it is free.
4. Prefer corners.
5. Use sides only when better options are gone.

Always check availableMoves before moving.`;

const wordlyHowToPlay = `# Wordly MCP - Game Guide for AIs

Wordly is a five-letter word guessing game. A secret word is chosen, then the guesser has 6 attempts to find it.

Each guess returns 5 letter scores:
- hit: the letter is correct and in the correct position.
- near: the letter exists in the word but is in a different position.
- miss: the letter is not in the word.

## Available tools

### start_wordly_round

Starts a new round.

Parameters:
- turn: who is guessing.
- Use "human" when you choose the word and the human guesses. Provide secretWord and clue.
- Use "ai" when the human will choose the word in the frontend and you guess. Do not provide secretWord unless you are only testing locally.
- secretWord: private 5-letter word. It is not returned while the round is playing.
- clue: optional soft hint. In AI-guessing mode, the frontend can set this privately with the word.

Example:
\`\`\`text
start_wordly_round(turn="human", secretWord="cloud", clue="Where apps often live")
\`\`\`

### get_wordly_status

Returns the public state:
- guesses: submitted words and their scores.
- hasSecretWord: whether the private word has been set.
- maxGuesses: normally 6.
- remainingGuesses.
- status: "playing", "won", or "lost".
- answer: null while playing, revealed only after the round ends.

### submit_wordly_guess

Submit a 5-letter word guess.

Example:
\`\`\`text
submit_wordly_guess(guess="cloud")
\`\`\`

## Strategy for AIs

1. Start with words containing common letters.
2. Keep hit letters fixed in their positions.
3. Move near letters to other positions.
4. Avoid miss letters in later guesses.
5. Use the clue if one is provided, but trust the letter scores most.`;

const battleshipHowToPlay = `# Battleship MCP - Game Guide for AIs

Battleship is played on a 6 by 4 board. Columns are 1 to 6. Rows are A to D. Coordinates look like A1, A2, B4, D6.

Fleet:
- 1 large ship with 3 cells.
- 2 small ships with 2 cells each.

Ships can be horizontal or vertical and cannot overlap.

The human places ships privately in the frontend. You know the human fleet is ready, but you never receive the human ship positions.

Your AI fleet can be placed with place_battleship_ai_fleet. If you do not place it, the backend starts with a random AI fleet.

Tools:
- start_battleship_round: starts a new round.
- get_battleship_status: returns board, shots, ready flags, sunk ships, and your AI ship positions.
- place_battleship_ai_fleet: places your fleet. Use starts like A1 with orientation horizontal or vertical.
- submit_battleship_attack: attack the human sea with a coordinate. The API returns hit or miss, and sunk when a ship is completed.

Strategy:
1. Attack checkerboard-style first.
2. When you hit, attack adjacent cells.
3. Track misses so you do not repeat a coordinate.
4. Remember the fleet lengths: 3, 2, and 2.`;

export function createCompanionMcpServer() {
  const server = new McpServer({
    name: "mcp-companion-game",
    version: "0.1.0",
  });

  server.tool(
    "hangman_how_to_play",
    "Read the Hangman MCP rules, available tools, full game flow, and strategy guide for AIs.",
    {},
    async () => asToolText({ guide: hangmanHowToPlay }),
  );

  server.tool(
    "start_hangman_round",
    `Start a new Hangman round.

Use turn="human" when the human will guess a word chosen by the AI. In that mode, provide secretWord and clue. The tool never returns the secret word.

Use turn="ai" when the AI will guess a word chosen by the human/frontend. For production this should be created by the private web API, not by an AI-visible tool call. For local testing only, secretWord may be provided here.`,
    {
      turn: z.enum(["human", "ai"]),
      clue: z.string().min(1).describe("The clue shown to the player or AI."),
      secretWord: z
        .string()
        .min(1)
        .optional()
        .describe("Private secret word. Never returned by status tools."),
      wordLength: z
        .number()
        .int()
        .min(1)
        .max(40)
        .optional()
        .describe("Length of the secret word when the word itself is created privately elsewhere."),
    },
    async (input) => asToolText(startHangmanRound(input)),
  );

  server.tool(
    "get_hangman_status",
    "Get the public status for a Hangman round. This never returns the secret word.",
    {
      roundId: z.string().optional().describe("Defaults to the active Hangman round."),
    },
    async ({ roundId }) => asToolText(getHangmanStatus(roundId)),
  );

  server.tool(
    "submit_hangman_letter",
    "Submit one guessed letter for the active Hangman round and get whether it was correct.",
    {
      roundId: z.string().optional().describe("Defaults to the active Hangman round."),
      letter: z.string().min(1).max(3).describe("One guessed letter."),
    },
    async (input) => asToolText(submitHangmanLetter(input)),
  );

  server.tool(
    "submit_hangman_word",
    "Submit a full-word guess for the active Hangman round. This returns whether the word was correct without revealing the secret word on a miss.",
    {
      roundId: z.string().optional().describe("Defaults to the active Hangman round."),
      word: z.string().min(1).max(40).describe("The full word guess."),
    },
    async (input) => asToolText(submitHangmanWord(input)),
  );

  server.tool(
    "tic_tac_toe_how_to_play",
    "Read the Tic-Tac-Toe MCP rules, board indexes, tools, and strategy guide for AIs.",
    {},
    async () => asToolText({ guide: ticTacToeHowToPlay }),
  );

  server.tool(
    "start_tic_tac_toe_round",
    "Start a new Tic-Tac-Toe round. The human is X by default and the AI is O.",
    {
      humanPlayer: z.enum(["X", "O"]).optional().describe("Defaults to X."),
      startingPlayer: z.enum(["X", "O"]).optional().describe("Defaults to X."),
    },
    async (input) => asToolText(startTicTacToeRound(input)),
  );

  server.tool(
    "get_tic_tac_toe_status",
    "Get the public state of the active Tic-Tac-Toe round.",
    {
      roundId: z.string().optional().describe("Defaults to the active Tic-Tac-Toe round."),
    },
    async ({ roundId }) => asToolText(getTicTacToeStatus(roundId)),
  );

  server.tool(
    "submit_tic_tac_toe_move",
    "Submit a Tic-Tac-Toe move using a board index from 0 to 8.",
    {
      roundId: z.string().optional().describe("Defaults to the active Tic-Tac-Toe round."),
      index: z.number().int().min(0).max(8),
      player: z.enum(["X", "O"]).optional().describe("Defaults to the current player."),
    },
    async (input) => asToolText(submitTicTacToeMove(input)),
  );

  server.tool(
    "wordly_how_to_play",
    "Read the Wordly MCP rules, scoring meanings, available tools, and strategy guide for AIs.",
    {},
    async () => asToolText({ guide: wordlyHowToPlay }),
  );

  server.tool(
    "start_wordly_round",
    `Start a new Wordly round.

Use turn="human" when the human will guess a word chosen by the AI. In that mode, provide secretWord and clue.

Use turn="ai" when the AI will guess a word chosen privately by the human/frontend. In that mode, secretWord can be omitted while the frontend prepares the private word and clue.`,
    {
      turn: z.enum(["human", "ai"]).optional().describe("Who is guessing. Defaults to human."),
      secretWord: z.string().min(5).max(5).optional().describe("Private 5-letter secret word."),
      clue: z.string().optional().describe("Optional soft hint shown in the frontend/status."),
      maxGuesses: z.number().int().min(1).max(10).optional().describe("Defaults to 6."),
    },
    async (input) => asToolText(startWordlyRound(input)),
  );

  server.tool(
    "get_wordly_status",
    "Get the public state of the active Wordly round. The answer is hidden while playing.",
    {
      roundId: z.string().optional().describe("Defaults to the active Wordly round."),
    },
    async ({ roundId }) => asToolText(getWordlyStatus(roundId)),
  );

  server.tool(
    "submit_wordly_guess",
    "Submit a 5-letter Wordly guess and receive hit/near/miss scores.",
    {
      roundId: z.string().optional().describe("Defaults to the active Wordly round."),
      guess: z.string().min(5).max(5).describe("The 5-letter word guess."),
    },
    async (input) => asToolText(submitWordlyGuess(input)),
  );

  server.tool(
    "battleship_how_to_play",
    "Read the Battleship MCP rules, board coordinates, fleet sizes, and AI strategy.",
    {},
    async () => asToolText({ guide: battleshipHowToPlay }),
  );

  server.tool(
    "start_battleship_round",
    "Start a new Battleship round on a 6 by 4 board.",
    {},
    async () => asToolText(startBattleshipRound()),
  );

  server.tool(
    "get_battleship_status",
    "Get Battleship status. This includes AI ship positions, but never human ship positions.",
    {
      roundId: z.string().optional().describe("Defaults to the active Battleship round."),
    },
    async ({ roundId }) => asToolText(getBattleshipStatus({ roundId, includeAiShips: true })),
  );

  const shipPlacementSchema = z.object({
    id: z.string().optional(),
    start: z.string().optional().describe("Start coordinate like A1."),
    length: z.number().int().min(2).max(3),
    orientation: z.enum(["horizontal", "vertical"]),
    cells: z.array(z.string()).optional().describe("Optional exact cells like ['A1','A2']."),
  });

  server.tool(
    "place_battleship_ai_fleet",
    "Place the AI fleet. Use one length-3 ship and two length-2 ships. Coordinates are A1 to D6.",
    {
      roundId: z.string().optional().describe("Defaults to the active Battleship round."),
      ships: z.array(shipPlacementSchema).length(3),
    },
    async ({ roundId, ships }) => asToolText(placeBattleshipFleet({ roundId, owner: "ai", ships })),
  );

  server.tool(
    "submit_battleship_attack",
    "Attack the human sea with a coordinate like A2. Returns water or hit, without revealing human ships.",
    {
      roundId: z.string().optional().describe("Defaults to the active Battleship round."),
      cell: z.string().describe("Coordinate from A1 to D6."),
    },
    async ({ roundId, cell }) => asToolText(submitBattleshipAttack({ roundId, attacker: "ai", cell })),
  );

  return server;
}
