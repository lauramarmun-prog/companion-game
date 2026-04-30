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
    mcp: "/mcp",
    api: {
      health: "/health",
      startHangmanRound: "POST /api/hangman/round",
      getHangmanStatus: "GET /api/hangman/status/:roundId?",
      submitHangmanLetter: "POST /api/hangman/letter",
      submitHangmanWord: "POST /api/hangman/word",
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
