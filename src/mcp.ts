import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getHangmanStatus, startHangmanRound, submitHangmanLetter, submitHangmanWord } from "./hangman.js";

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

export function createCompanionMcpServer() {
  const server = new McpServer({
    name: "mcp-companion-game",
    version: "0.1.0",
  });

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

  return server;
}
