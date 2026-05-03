import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  getBattleshipAttackView,
  getBattleshipMySea,
  getBattleshipStatus,
  placeBattleshipFleet,
  startBattleshipRound,
  submitBattleshipAttack,
} from "./battleship.js";
import { getGuessWhoStatus, setGuessWhoSecret, startGuessWhoRound, submitGuessWhoFinalGuess } from "./guessWho.js";
import { getHangmanStatus, startHangmanRound, submitHangmanLetter, submitHangmanWord } from "./hangman.js";
import { addQuizQuestion, finishQuizRound, getQuizStatus, startQuizRound, submitQuizAnswer } from "./quiz.js";
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

const wordlyHowToPlay = `# Word Quest MCP - Game Guide for AIs

Word Quest is a five-letter word guessing game. A secret word is chosen, then the guesser has 6 attempts to find it.

Each guess returns 5 letter scores:
- hit: the letter is correct and in the correct position.
- near: the letter exists in the word but is in a different position.
- miss: the letter is not in the word.

## Available tools

### start_word_quest_round

Starts a new round.

Parameters:
- turn: who is guessing.
- Use "human" when you choose the word and the human guesses. Provide secretWord and clue.
- Use "ai" when the human will choose the word in the frontend and you guess. Do not provide secretWord unless you are only testing locally.
- secretWord: private 5-letter word. It is not returned while the round is playing.
- clue: optional soft hint. In AI-guessing mode, the frontend can set this privately with the word.

Example:
\`\`\`text
start_word_quest_round(turn="human", secretWord="cloud", clue="Where apps often live")
\`\`\`

### get_word_quest_status

Returns the public state:
- guesses: submitted words and their scores.
- hasSecretWord: whether the private word has been set.
- maxGuesses: normally 6.
- remainingGuesses.
- status: "playing", "won", or "lost".
- answer: null while playing, revealed only after the round ends.

### submit_word_quest_guess

Submit a 5-letter word guess.

Example:
\`\`\`text
submit_word_quest_guess(guess="cloud")
\`\`\`

## Strategy for AIs

1. Start with words containing common letters.
2. Keep hit letters fixed in their positions.
3. Move near letters to other positions.
4. Avoid miss letters in later guesses.
5. Use the clue if one is provided, but trust the letter scores most.`;

const battleshipHowToPlay = `# Hidden Fleet MCP - Game Guide for AIs

Hidden Fleet is played on a 6 by 6 board. Columns are 1 to 6. Rows are A to F. Coordinates look like A1, A2, B4, or F6.

Fleet:
- 1 flagship with 4 cells.
- 1 cruiser with 3 cells.
- 1 submarine with 3 cells.
- 1 destroyer with 2 cells.

Ships can be horizontal or vertical and cannot overlap.

The human places ships privately in the frontend. You know the human fleet is ready, but you never receive the human ship positions.

Your AI fleet can be placed with place_hidden_fleet_ai_fleet. If you do not place it, the backend starts with a random AI fleet.

Tools:
- start_hidden_fleet_round: starts a new round.
- get_hidden_fleet_status: returns board, shots, ready flags, sunk ships, and your AI ship positions.
- get_hidden_fleet_attack_view: returns only the tactical view for attacking the human sea.
- get_hidden_fleet_my_sea: returns only your AI sea and the human's incoming shots against you.
- place_hidden_fleet_ai_fleet: places your fleet. Use starts like A1 with orientation horizontal or vertical.
- submit_hidden_fleet_attack: attack the human sea with a coordinate. The API returns hit or miss, and sunk when a ship is completed.

## Do not mix up the two seas

There are always two separate boards:

1. Your AI sea:
- This contains your AI ships.
- The human attacks this sea.
- In status, read this as aiView.yourSea.
- Human shots against you are aiView.yourSea.incomingShotsFromHuman.

2. The human sea:
- This contains the human ships.
- You attack this sea.
- In status, read this as aiView.targetSea.
- Your previous attacks are aiView.targetSea.yourShotsAtHumanSea.
- Your safe legal targets are aiView.targetSea.availableTargets.
- Your easiest AI-friendly helper is aiView.tacticalView, also returned as aiTacticalView.

Important: both seas use the same coordinates, A1 to F6. If the human shot C3 on your sea, C3 may still be a valid target on the human sea. For your next attack, ignore humanShots and choose only from aiView.targetSea.availableTargets.

## AI tactical view

Hidden Fleet can be spatially confusing for language models, so use get_hidden_fleet_attack_view on your attack turn. It returns only the human sea attack data and does not include your AI sea.

When you call get_hidden_fleet_attack_view, prefer these fields:
- aiTacticalView.nextBestMove: the simplest recommended coordinate to attack next.
- aiTacticalView.recommendedNextShots: good follow-up shots, especially after a hit.
- aiTacticalView.availableTargets: legal coordinates you have not attacked yet.
- aiTacticalView.doNotShoot: coordinates you already attacked on the human sea. Never shoot these.
- aiTacticalView.yourHits: your successful attacks on the human sea.
- aiTacticalView.yourMisses: your missed attacks on the human sea.
- aiTacticalView.hitClusters: grouped hits plus recommended adjacent follow-ups.
- aiTacticalView.targetSeaMap: a text map of the human sea from your point of view.

Text map legend:
- X = your hit on the human sea.
- O = your miss on the human sea.
- . = unknown target.

If aiTacticalView.nextBestMove is not null, you may simply call submit_hidden_fleet_attack with that coordinate.

Use get_hidden_fleet_my_sea only when you want to inspect your AI fleet and the human's incoming shots against you.

Strategy:
1. Prefer aiTacticalView.nextBestMove.
2. If nextBestMove is null, choose from aiTacticalView.recommendedNextShots.
3. If there are no recommendations, choose from aiTacticalView.availableTargets.
4. Never choose from aiTacticalView.doNotShoot.
5. Remember the fleet lengths: 4, 3, 3, and 2.`;

const guessWhoHowToPlay = `# Who is it? MCP - Game Guide for AIs

Who is it? is a character guessing game. One side secretly chooses a character. The other side asks yes-or-no questions and narrows the board until they can guess the character.

## Turns

turn="human":
- The human is guessing.
- Use start_who_is_it_round with turn="human".
- Read the returned character list, secretly choose one character, and remember it.
- Do not say the secret character out loud.
- The human asks you yes-or-no questions in chat.
- You usually do not need to call the MCP again unless you want to check the character list.

turn="ai":
- You, the AI, are guessing.
- The human chooses a secret character in the frontend.
- Use get_who_is_it_status to read the public character list.
- Ask yes-or-no questions in chat.
- Track the answers in your own reasoning and eliminate characters mentally.
- When confident, use submit_who_is_it_final_guess.

## Available tools

start_who_is_it_round:
- Starts a new round.
- Parameters:
  - turn: "human" or "ai".
  - secretName: optional, normally only used by the frontend/API. Do not use this to reveal the human's secret to yourself.

get_who_is_it_status:
- Returns the public state and character list.
- While playing, it never reveals the secret character.

set_who_is_it_secret:
- Sets the secret character for the current round.
- Intended for frontend/API use when the human has chosen a character.
- If you are the AI guesser, do not call this yourself.

submit_who_is_it_final_guess:
- Submit your final character guess.
- Returns whether it was correct.

## Question strategy

Ask broad visual questions first:
- Is the character a man?
- Does the character have red hair?
- Does the character wear glasses?
- Does the character have dark hair?
- Does the character wear a hat, scarf, or necklace?

Then narrow down with specific details:
- Does the character have blue eyes?
- Does the character have freckles?
- Does the character wear a hoodie?
- Does the character have purple or turquoise hair details?

Keep your secret if the human is guessing. If you are guessing, only submit a final guess when the answers make one character likely.`;

const quizHowToPlay = `# Quiz MCP - Game Guide for AIs

Quiz has two soft modes:

## ask-each-other

Use this when the human and AI take turns asking each other questions in chat.

Flow:
1. Call start_quiz_round with mode="ask-each-other".
2. Use add_quiz_question when you want to save a question in the round.
3. The human and AI can answer naturally in chat.
4. Use submit_quiz_answer if you want the API to remember an answer.
5. Use finish_quiz_round when the cozy exchange is done.

This mode does not need strict scoring. It is for playful, thoughtful, funny, or reflective questions.

## ai-quiz

Use this when you prepare a small quiz for the human.

Flow:
1. Call start_quiz_round with mode="ai-quiz", optional topic, and optional totalQuestions.
2. Add questions with add_quiz_question.
3. Include choices when it is multiple choice.
4. Include correctAnswer when the question has a clear answer.
5. When the human answers, call submit_quiz_answer.
6. The API returns whether the answer is correct when correctAnswer exists.

## Tools

- start_quiz_round: starts a new quiz.
- get_quiz_status: reads questions, answers, score, and current question.
- add_quiz_question: adds one question.
- submit_quiz_answer: stores an answer and scores it when possible.
- finish_quiz_round: marks the quiz as finished.

Keep the tone gentle. Quiz is meant to feel warm, playful, and companion-like, not like an exam.`;

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
    "who_is_it_how_to_play",
    "Read the Who is it? MCP rules, turns, available tools, and question strategy for AIs.",
    {},
    async () => asToolText({ guide: guessWhoHowToPlay }),
  );

  server.tool(
    "start_who_is_it_round",
    `Start a new Who is it? round.

Use turn="human" when the human will guess. In that mode, read the character list, secretly choose one, remember it, and answer the human's yes-or-no questions in chat without revealing the secret.

Use turn="ai" when you, the AI, will guess a character chosen privately by the human/frontend. The status never reveals the secret while playing.`,
    {
      turn: z.enum(["human", "ai"]).optional().describe("Who is guessing. Defaults to human."),
      secretName: z
        .string()
        .optional()
        .describe("Optional secret character name. Intended for frontend/API use; do not use this to reveal a human secret to yourself."),
    },
    async (input) => asToolText(startGuessWhoRound(input)),
  );

  server.tool(
    "get_who_is_it_status",
    "Get the public Who is it? status and character list. This does not reveal the secret character while the round is playing.",
    {
      roundId: z.string().optional().describe("Defaults to the active Who is it? round."),
    },
    async ({ roundId }) => asToolText(getGuessWhoStatus(roundId)),
  );

  server.tool(
    "set_who_is_it_secret",
    "Set the secret Who is it? character for the active round. Intended for frontend/API use when the human chooses a character.",
    {
      roundId: z.string().optional().describe("Defaults to the active Who is it? round."),
      secretName: z.string().min(1).describe("Character name from the Who is it? character list."),
    },
    async (input) => asToolText(setGuessWhoSecret(input)),
  );

  server.tool(
    "submit_who_is_it_final_guess",
    "Submit a final Who is it? character guess. Use only when you are confident.",
    {
      roundId: z.string().optional().describe("Defaults to the active Who is it? round."),
      guess: z.string().min(1).describe("Character name from the Who is it? character list."),
    },
    async (input) => asToolText(submitGuessWhoFinalGuess(input)),
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
    "quiz_how_to_play",
    "Read the Quiz MCP rules, modes, tools, and gentle hosting notes for AIs.",
    {},
    async () => asToolText({ guide: quizHowToPlay }),
  );

  server.tool(
    "start_quiz_round",
    "Start a Quiz round. Use ask-each-other for shared questions or ai-quiz when the AI prepares questions for the human.",
    {
      mode: z.enum(["ask-each-other", "ai-quiz"]).optional().describe("Defaults to ask-each-other."),
      topic: z.string().optional().describe("Optional quiz topic, mood, or theme."),
      totalQuestions: z.number().int().min(1).max(30).optional().describe("Optional planned question count."),
    },
    async (input) => asToolText(startQuizRound(input)),
  );

  server.tool(
    "get_quiz_status",
    "Get the public state of the active Quiz round.",
    {
      roundId: z.string().optional().describe("Defaults to the active Quiz round."),
    },
    async ({ roundId }) => asToolText(getQuizStatus(roundId)),
  );

  server.tool(
    "add_quiz_question",
    "Add one Quiz question. Include choices and correctAnswer for AI quiz mode when useful.",
    {
      roundId: z.string().optional().describe("Defaults to the active Quiz round."),
      author: z.enum(["human", "ai"]).optional().describe("Who created the question. Defaults to ai."),
      question: z.string().min(1),
      choices: z.array(z.string()).optional(),
      correctAnswer: z.string().optional().describe("Optional answer used for scoring."),
      explanation: z.string().optional().describe("Optional explanation revealed after answering or finishing."),
    },
    async (input) => asToolText(addQuizQuestion(input)),
  );

  server.tool(
    "submit_quiz_answer",
    "Submit an answer for the current Quiz question, or for a specific question.",
    {
      roundId: z.string().optional().describe("Defaults to the active Quiz round."),
      questionId: z.string().optional(),
      questionIndex: z.number().int().min(0).optional(),
      answer: z.string().min(1),
      correct: z.boolean().optional().describe("Optional manual scoring for open-ended questions."),
    },
    async (input) => asToolText(submitQuizAnswer(input)),
  );

  server.tool(
    "finish_quiz_round",
    "Finish the active Quiz round and reveal stored explanations.",
    {
      roundId: z.string().optional().describe("Defaults to the active Quiz round."),
    },
    async (input) => asToolText(finishQuizRound(input)),
  );

  server.tool(
    "word_quest_how_to_play",
    "Read the Word Quest MCP rules, scoring meanings, available tools, and strategy guide for AIs.",
    {},
    async () => asToolText({ guide: wordlyHowToPlay }),
  );

  server.tool(
    "start_word_quest_round",
    `Start a new Word Quest round.

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
    "get_word_quest_status",
    "Get the public state of the active Word Quest round. The answer is hidden while playing.",
    {
      roundId: z.string().optional().describe("Defaults to the active Word Quest round."),
    },
    async ({ roundId }) => asToolText(getWordlyStatus(roundId)),
  );

  server.tool(
    "submit_word_quest_guess",
    "Submit a 5-letter Word Quest guess and receive hit/near/miss scores.",
    {
      roundId: z.string().optional().describe("Defaults to the active Word Quest round."),
      guess: z.string().min(5).max(5).describe("The 5-letter word guess."),
    },
    async (input) => asToolText(submitWordlyGuess(input)),
  );

  server.tool(
    "hidden_fleet_how_to_play",
    "Read the Hidden Fleet MCP rules, board coordinates, fleet sizes, and AI strategy.",
    {},
    async () => asToolText({ guide: battleshipHowToPlay }),
  );

  server.tool(
    "start_hidden_fleet_round",
    "Start a new Hidden Fleet round on a 6 by 6 board.",
    {},
    async () => asToolText(startBattleshipRound()),
  );

  server.tool(
    "get_hidden_fleet_status",
    "Get full Hidden Fleet status. Prefer get_hidden_fleet_attack_view on your attack turn and get_hidden_fleet_my_sea for defense, so the two seas stay separated.",
    {
      roundId: z.string().optional().describe("Defaults to the active Hidden Fleet round."),
    },
    async ({ roundId }) => asToolText(getBattleshipStatus({ roundId, includeAiShips: true })),
  );

  server.tool(
    "get_hidden_fleet_attack_view",
    "Get only the AI tactical view for attacking the human sea. This does not include your AI ships, your sea, or the human's shots against you.",
    {
      roundId: z.string().optional().describe("Defaults to the active Hidden Fleet round."),
    },
    async ({ roundId }) => asToolText(getBattleshipAttackView({ roundId })),
  );

  server.tool(
    "get_hidden_fleet_my_sea",
    "Get only your AI sea: your ships and the human's incoming shots against you. Do not use this to choose attacks.",
    {
      roundId: z.string().optional().describe("Defaults to the active Hidden Fleet round."),
    },
    async ({ roundId }) => asToolText(getBattleshipMySea({ roundId })),
  );

  const shipPlacementSchema = z.object({
    id: z.string().optional(),
    start: z.string().optional().describe("Start coordinate like A1."),
    length: z.number().int().min(2).max(4),
    orientation: z.enum(["horizontal", "vertical"]),
    cells: z.array(z.string()).optional().describe("Optional exact cells like ['A1','A2']."),
  });

  server.tool(
    "place_hidden_fleet_ai_fleet",
    "Place the AI fleet. Use ship lengths 4, 3, 3, and 2. Coordinates are A1 to F6.",
    {
      roundId: z.string().optional().describe("Defaults to the active Hidden Fleet round."),
      ships: z.array(shipPlacementSchema).length(4),
    },
    async ({ roundId, ships }) => asToolText(placeBattleshipFleet({ roundId, owner: "ai", ships })),
  );

  server.tool(
    "submit_hidden_fleet_attack",
    "Attack the human sea with a coordinate like A2. Pick from aiView.targetSea.availableTargets. Returns water or hit, without revealing human ships.",
    {
      roundId: z.string().optional().describe("Defaults to the active Hidden Fleet round."),
      cell: z.string().describe("Coordinate from A1 to F6."),
    },
    async ({ roundId, cell }) => asToolText(submitBattleshipAttack({ roundId, attacker: "ai", cell })),
  );

  return server;
}
