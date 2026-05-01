import { randomUUID } from "node:crypto";
import cors from "cors";
import express, { type Request, type Response } from "express";
import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import {
  getHangmanStatus,
  startHangmanRound,
  submitHangmanLetter,
  submitHangmanWord,
  type HangmanTurn,
} from "./hangman.js";
import { createCompanionMcpServer } from "./mcp.js";
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
    version: "0.1.3",
    features: [
      "hangman-status",
      "hangman-letter-guess",
      "hangman-word-guess",
      "tic-tac-toe",
      "wordly",
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
      startWordlyRound: "POST /api/wordly/round",
      getWordlyStatus: "GET /api/wordly/status/:roundId?",
      submitWordlyGuess: "POST /api/wordly/guess",
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

app.post("/api/wordly/round", (req, res) => {
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

app.get("/api/wordly/status", (_req, res) => {
  try {
    const status = getWordlyStatus();
    res.json({ ok: true, status });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "No wordly round has been started yet.") {
      res.json({ ok: true, status: null, needsRound: true });
      return;
    }

    sendApiError(res, error);
  }
});

app.get("/api/wordly/status/:roundId", (req, res) => {
  try {
    const status = getWordlyStatus(req.params["roundId"]);
    res.json({ ok: true, status });
  } catch (error) {
    sendApiError(res, error);
  }
});

app.post("/api/wordly/guess", (req, res) => {
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
