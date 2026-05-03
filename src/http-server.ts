import { randomUUID } from "node:crypto";
import cors from "cors";
import express, { type Request, type Response } from "express";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import {
  getBattleshipAttackView,
  getBattleshipMySea,
  getBattleshipStatus,
  placeBattleshipFleet,
  startBattleshipRound,
  submitBattleshipAttack,
  type BattleshipOwner,
} from "./battleship.js";
import {
  getShortBattleshipAttackView,
  getShortBattleshipMySea,
  getShortBattleshipStatus,
  placeShortBattleshipFleet,
  startShortBattleshipRound,
  submitShortBattleshipAttack,
} from "./battleshipShort.js";
import {
  getGuessWhoStatus,
  setGuessWhoSecret,
  startGuessWhoRound,
  submitGuessWhoFinalGuess,
  type GuessWhoTurn,
} from "./guessWho.js";
import {
  getHangmanStatus,
  startHangmanRound,
  submitHangmanLetter,
  submitHangmanWord,
  type HangmanTurn,
} from "./hangman.js";
import { createCompanionMcpServer } from "./mcp.js";
import {
  addQuizQuestion,
  finishQuizRound,
  getQuizStatus,
  startQuizRound,
  submitQuizAnswer,
  type QuizAuthor,
  type QuizMode,
} from "./quiz.js";
import { getTicTacToeStatus, startTicTacToeRound, submitTicTacToeMove } from "./ticTacToe.js";
import { getWordlyStatus, startWordlyRound, submitWordlyGuess, type WordlyTurn } from "./wordly.js";

const port = Number(process.env.PORT ?? 3000);
const allowedOrigin = process.env.FRONTEND_ORIGIN ?? "*";

const app = createMcpExpressApp({ host: "0.0.0.0" });

function normalizeOrigin(origin: string) {
  return origin.replace(/\/$/, "");
}

const allowedOrigins = allowedOrigin
  .split(",")
  .map((origin) => normalizeOrigin(origin.trim()))
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes("*")) {
        callback(null, true);
        return;
      }

      const normalizedOrigin = normalizeOrigin(origin);
      const isLocalDev =
        normalizedOrigin.startsWith("http://127.0.0.1:") ||
        normalizedOrigin.startsWith("http://localhost:");

      callback(null, isLocalDev || allowedOrigins.includes(normalizedOrigin));
    },
  }),
);
app.use(express.json());

function sendApiError(res: Response, error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown error";
  res.status(400).json({ ok: false, error: message });
}

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    name: "mcp-companion-game",
    version: "0.1.4",
    features: [
      "hangman-status",
      "hangman-letter-guess",
      "hangman-word-guess",
      "tic-tac-toe",
      "quiz",
      "word-quest",
      "hidden-fleet",
      "hidden-fleet-short",
      "who-is-it",
      "empty-status-ok",
    ],
    mcp: "/mcp",
    api: {
      health: "/health",
      startHangmanRound: "POST /api/hangman/round",
      getHangmanStatus: "GET /api/hangman/status/:roundId?",
      submitHangmanLetter: "POST /api/hangman/letter",
      submitHangmanWord: "POST /api/hangman/word",
      startTicTacToeRound: "POST /api/tic-tac-toe/round",
      getTicTacToeStatus: "GET /api/tic-tac-toe/status/:roundId?",
      submitTicTacToeMove: "POST /api/tic-tac-toe/move",
      startQuizRound: "POST /api/quiz/round",
      getQuizStatus: "GET /api/quiz/status/:roundId?",
      addQuizQuestion: "POST /api/quiz/question",
      submitQuizAnswer: "POST /api/quiz/answer",
      finishQuizRound: "POST /api/quiz/finish",
      startWordQuestRound: "POST /api/word-quest/round",
      getWordQuestStatus: "GET /api/word-quest/status/:roundId?",
      submitWordQuestGuess: "POST /api/word-quest/guess",
      startHiddenFleetRound: "POST /api/hidden-fleet/round",
      getHiddenFleetStatus: "GET /api/hidden-fleet/status/:roundId?",
      getHiddenFleetAttackView: "GET /api/hidden-fleet/attack-view/:roundId?",
      getHiddenFleetMySea: "GET /api/hidden-fleet/my-sea/:roundId?",
      placeHiddenFleet: "POST /api/hidden-fleet/fleet",
      submitHiddenFleetAttack: "POST /api/hidden-fleet/attack",
      startHiddenFleetShortRound: "POST /api/hidden-fleet-short/round",
      getHiddenFleetShortStatus: "GET /api/hidden-fleet-short/status/:roundId?",
      getHiddenFleetShortAttackView: "GET /api/hidden-fleet-short/attack-view/:roundId?",
      getHiddenFleetShortMySea: "GET /api/hidden-fleet-short/my-sea/:roundId?",
      placeHiddenFleetShort: "POST /api/hidden-fleet-short/fleet",
      submitHiddenFleetShortAttack: "POST /api/hidden-fleet-short/attack",
      startWhoIsItRound: "POST /api/who-is-it/round",
      getWhoIsItStatus: "GET /api/who-is-it/status/:roundId?",
      setWhoIsItSecret: "POST /api/who-is-it/secret",
      submitWhoIsItFinalGuess: "POST /api/who-is-it/guess",
    },
  });
});

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/hangman/round", (req, res) => {
  try {
    const body = req.body as {
      turn?: HangmanTurn;
      clue?: string;
      secretWord?: string;
      wordLength?: number;
    };
    const status = startHangmanRound({
      turn: body.turn ?? "human",
      clue: body.clue ?? "",
      secretWord: body.secretWord,
      wordLength: body.wordLength,
    });
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get("/api/hangman/status", (_req, res) => {
  try {
    const status = getHangmanStatus();
    res.json({ ok: true, status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "No hangman round has been started yet.") {
      res.json({ ok: true, status: null, needsRound: true });
      return;
    }

    sendApiError(res, error);
  }
});

app.get("/api/hangman/status/:roundId", (req, res) => {
  try {
    const status = getHangmanStatus(req.params["roundId"]);
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post("/api/hangman/letter", (req, res) => {
  try {
    const body = req.body as { roundId?: string; letter?: string };
    const result = submitHangmanLetter({
      roundId: body.roundId,
      letter: body.letter ?? "",
    });
    res.json({ ok: true, result });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post("/api/hangman/word", (req, res) => {
  try {
    const body = req.body as { roundId?: string; word?: string };
    const result = submitHangmanWord({
      roundId: body.roundId,
      word: body.word ?? "",
    });
    res.json({ ok: true, result });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post("/api/tic-tac-toe/round", (req, res) => {
  try {
    const body = req.body as { humanPlayer?: "X" | "O"; startingPlayer?: "X" | "O" };
    const status = startTicTacToeRound(body);
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get("/api/tic-tac-toe/status", (_req, res) => {
  try {
    const status = getTicTacToeStatus();
    res.json({ ok: true, status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "No tic-tac-toe round has been started yet.") {
      res.json({ ok: true, status: null, needsRound: true });
      return;
    }

    sendApiError(res, error);
  }
});

app.get("/api/tic-tac-toe/status/:roundId", (req, res) => {
  try {
    const status = getTicTacToeStatus(req.params["roundId"]);
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post("/api/tic-tac-toe/move", (req, res) => {
  try {
    const body = req.body as { roundId?: string; index?: number; player?: "X" | "O" };
    const result = submitTicTacToeMove({
      roundId: body.roundId,
      index: body.index ?? -1,
      player: body.player,
    });
    res.json({ ok: true, result });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post("/api/quiz/round", (req, res) => {
  try {
    const body = req.body as { mode?: QuizMode; topic?: string; totalQuestions?: number };
    const status = startQuizRound({
      mode: body.mode,
      topic: body.topic,
      totalQuestions: body.totalQuestions,
    });
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get("/api/quiz/status", (_req, res) => {
  try {
    res.json({ ok: true, status: getQuizStatus() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "No quiz round has been started yet.") {
      res.json({ ok: true, status: null, needsRound: true });
      return;
    }
    sendApiError(res, error);
  }
});

app.get("/api/quiz/status/:roundId", (req, res) => {
  try {
    res.json({ ok: true, status: getQuizStatus(req.params["roundId"]) });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post("/api/quiz/question", (req, res) => {
  try {
    const body = req.body as {
      roundId?: string;
      author?: QuizAuthor;
      question?: string;
      choices?: string[];
      correctAnswer?: string;
      explanation?: string;
    };
    const result = addQuizQuestion({
      roundId: body.roundId,
      author: body.author,
      question: body.question ?? "",
      choices: body.choices,
      correctAnswer: body.correctAnswer,
      explanation: body.explanation,
    });
    res.json({ ok: true, result });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post("/api/quiz/answer", (req, res) => {
  try {
    const body = req.body as {
      roundId?: string;
      questionId?: string;
      questionIndex?: number;
      answer?: string;
      correct?: boolean;
    };
    const result = submitQuizAnswer({
      roundId: body.roundId,
      questionId: body.questionId,
      questionIndex: body.questionIndex,
      answer: body.answer ?? "",
      correct: body.correct,
    });
    res.json({ ok: true, result });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post("/api/quiz/finish", (req, res) => {
  try {
    const body = req.body as { roundId?: string };
    res.json({ ok: true, status: finishQuizRound({ roundId: body.roundId }) });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/word-quest/round", "/api/wordly/round"], (req, res) => {
  try {
    const body = req.body as {
      turn?: WordlyTurn;
      secretWord?: string;
      clue?: string;
      maxGuesses?: number;
    };
    const status = startWordlyRound({
      turn: body.turn,
      secretWord: body.secretWord ?? "",
      clue: body.clue,
      maxGuesses: body.maxGuesses,
    });
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/word-quest/status", "/api/wordly/status"], (_req, res) => {
  try {
    const status = getWordlyStatus();
    res.json({ ok: true, status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "No word quest round has been started yet.") {
      res.json({ ok: true, status: null, needsRound: true });
      return;
    }

    sendApiError(res, error);
  }
});

app.get(["/api/word-quest/status/:roundId", "/api/wordly/status/:roundId"], (req, res) => {
  try {
    const status = getWordlyStatus(String(req.params["roundId"]));
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/word-quest/guess", "/api/wordly/guess"], (req, res) => {
  try {
    const body = req.body as { roundId?: string; guess?: string };
    const result = submitWordlyGuess({
      roundId: body.roundId,
      guess: body.guess ?? "",
    });
    res.json({ ok: true, result });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/hidden-fleet/round", "/api/battleship/round"], (_req, res) => {
  try {
    res.json({ ok: true, status: startBattleshipRound() });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet/status", "/api/battleship/status"], (_req, res) => {
  try {
    res.json({ ok: true, status: getBattleshipStatus() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "No hidden fleet round has been started yet.") {
      res.json({ ok: true, status: null, needsRound: true });
      return;
    }
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet/status/:roundId", "/api/battleship/status/:roundId"], (req, res) => {
  try {
    res.json({ ok: true, status: getBattleshipStatus({ roundId: String(req.params["roundId"]) }) });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet/attack-view", "/api/battleship/attack-view"], (_req, res) => {
  try {
    res.json({ ok: true, view: getBattleshipAttackView() });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet/attack-view/:roundId", "/api/battleship/attack-view/:roundId"], (req, res) => {
  try {
    res.json({ ok: true, view: getBattleshipAttackView({ roundId: String(req.params["roundId"]) }) });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet/my-sea", "/api/battleship/my-sea"], (_req, res) => {
  try {
    res.json({ ok: true, view: getBattleshipMySea() });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet/my-sea/:roundId", "/api/battleship/my-sea/:roundId"], (req, res) => {
  try {
    res.json({ ok: true, view: getBattleshipMySea({ roundId: String(req.params["roundId"]) }) });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/hidden-fleet/fleet", "/api/battleship/fleet"], (req, res) => {
  try {
    const body = req.body as {
      roundId?: string;
      owner?: BattleshipOwner;
      ships?: Array<{ id?: string; start?: string; length: number; orientation: "horizontal" | "vertical"; cells?: string[] }>;
    };
    const status = placeBattleshipFleet({
      roundId: body.roundId,
      owner: body.owner ?? "human",
      ships: body.ships ?? [],
    });
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/hidden-fleet/attack", "/api/battleship/attack"], (req, res) => {
  try {
    const body = req.body as { roundId?: string; attacker?: BattleshipOwner; cell?: string };
    const result = submitBattleshipAttack({
      roundId: body.roundId,
      attacker: body.attacker ?? "human",
      cell: body.cell ?? "",
    });
    res.json({ ok: true, result });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/hidden-fleet-short/round", "/api/battleship-short/round"], (_req, res) => {
  try {
    res.json({ ok: true, status: startShortBattleshipRound() });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet-short/status", "/api/battleship-short/status"], (_req, res) => {
  try {
    res.json({ ok: true, status: getShortBattleshipStatus() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "No short hidden fleet round has been started yet.") {
      res.json({ ok: true, status: null, needsRound: true });
      return;
    }
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet-short/status/:roundId", "/api/battleship-short/status/:roundId"], (req, res) => {
  try {
    res.json({ ok: true, status: getShortBattleshipStatus({ roundId: String(req.params["roundId"]) }) });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet-short/attack-view", "/api/battleship-short/attack-view"], (_req, res) => {
  try {
    res.json({ ok: true, view: getShortBattleshipAttackView() });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet-short/attack-view/:roundId", "/api/battleship-short/attack-view/:roundId"], (req, res) => {
  try {
    res.json({ ok: true, view: getShortBattleshipAttackView({ roundId: String(req.params["roundId"]) }) });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet-short/my-sea", "/api/battleship-short/my-sea"], (_req, res) => {
  try {
    res.json({ ok: true, view: getShortBattleshipMySea() });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/hidden-fleet-short/my-sea/:roundId", "/api/battleship-short/my-sea/:roundId"], (req, res) => {
  try {
    res.json({ ok: true, view: getShortBattleshipMySea({ roundId: String(req.params["roundId"]) }) });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/hidden-fleet-short/fleet", "/api/battleship-short/fleet"], (req, res) => {
  try {
    const body = req.body as {
      roundId?: string;
      owner?: BattleshipOwner;
      ships?: Array<{ id?: string; start?: string; length: number; orientation: "horizontal" | "vertical"; cells?: string[] }>;
    };
    const status = placeShortBattleshipFleet({
      roundId: body.roundId,
      owner: body.owner ?? "human",
      ships: body.ships ?? [],
    });
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/hidden-fleet-short/attack", "/api/battleship-short/attack"], (req, res) => {
  try {
    const body = req.body as { roundId?: string; attacker?: BattleshipOwner; cell?: string };
    const result = submitShortBattleshipAttack({
      roundId: body.roundId,
      attacker: body.attacker ?? "human",
      cell: body.cell ?? "",
    });
    res.json({ ok: true, result });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/who-is-it/round", "/api/guess-who/round"], (req, res) => {
  try {
    const body = req.body as { turn?: GuessWhoTurn; secretName?: string };
    const status = startGuessWhoRound({
      turn: body.turn,
      secretName: body.secretName,
    });
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.get(["/api/who-is-it/status", "/api/guess-who/status"], (_req, res) => {
  try {
    res.json({ ok: true, status: getGuessWhoStatus() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "No who is it round has been started yet.") {
      res.json({ ok: true, status: null, needsRound: true });
      return;
    }
    sendApiError(res, error);
  }
});

app.get(["/api/who-is-it/status/:roundId", "/api/guess-who/status/:roundId"], (req, res) => {
  try {
    res.json({ ok: true, status: getGuessWhoStatus(String(req.params["roundId"])) });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/who-is-it/secret", "/api/guess-who/secret"], (req, res) => {
  try {
    const body = req.body as { roundId?: string; secretName?: string };
    const status = setGuessWhoSecret({
      roundId: body.roundId,
      secretName: body.secretName ?? "",
    });
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post(["/api/who-is-it/guess", "/api/guess-who/guess"], (req, res) => {
  try {
    const body = req.body as { roundId?: string; guess?: string };
    const result = submitGuessWhoFinalGuess({
      roundId: body.roundId,
      guess: body.guess ?? "",
    });
    res.json({ ok: true, result });
  } catch (error) {
    sendApiError(res, error);
  }
});

const transports: Record<string, StreamableHTTPServerTransport> = {};

async function handleMcpPost(req: Request, res: Response) {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;

  try {
    let transport: StreamableHTTPServerTransport;

    if (sessionId && transports[sessionId]) {
      transport = transports[sessionId];
    } else if (!sessionId && isInitializeRequest(req.body)) {
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (newSessionId) => {
          transports[newSessionId] = transport;
        },
      });

      transport.onclose = () => {
        const closedSessionId = transport.sessionId;
        if (closedSessionId) delete transports[closedSessionId];
      };

      const server = createCompanionMcpServer();
      await server.connect(transport);
    } else {
      res.status(400).json({
        jsonrpc: "2.0",
        error: { code: -32000, message: "Bad Request: No valid MCP session ID provided" },
        id: null,
      });
      return;
    }

    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("Error handling MCP POST", error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
}

async function handleMcpGetOrDelete(req: Request, res: Response) {
  const sessionId = req.headers["mcp-session-id"] as string | undefined;
  if (!sessionId || !transports[sessionId]) {
    res.status(400).send("Invalid or missing MCP session ID");
    return;
  }

  await transports[sessionId].handleRequest(req, res);
}

app.post("/mcp", handleMcpPost);
app.get("/mcp", handleMcpGetOrDelete);
app.delete("/mcp", handleMcpGetOrDelete);

const httpServer = app.listen(port, "0.0.0.0", () => {
  console.log(`Companion Games backend listening on port ${port}`);
});

async function shutdown() {
  for (const sessionId of Object.keys(transports)) {
    await transports[sessionId].close();
    delete transports[sessionId];
  }
  httpServer.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
