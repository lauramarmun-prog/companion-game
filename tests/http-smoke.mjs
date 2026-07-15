Exit code: 0
Wall time: 2.2 seconds
Output:
import { spawn } from "node:child_process";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const port = 31_000 + Math.floor(Math.random() * 2_000);
const secret = "companion_games_smoke_secret_1234567890";
const dataDir = await mkdtemp(join(tmpdir(), "companion-games-http-"));
const child = spawn(process.execPath, ["dist/http-server.js"], {
  env: {
    ...process.env,
    PORT: String(port),
    MCP_PATH_SECRET: secret,
    COMPANION_GAMES_STATE_FILE: join(dataDir, "graphic-adventure-state.json"),
  },
  stdio: ["ignore", "pipe", "pipe"],
});

let childOutput = "";
child.stdout.on("data", (chunk) => (childOutput += chunk));
child.stderr.on("data", (chunk) => (childOutput += chunk));

async function waitForHealth() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/health`);
      if (response.ok) return;
    } catch {
      // The server may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Server did not become healthy.\n${childOutput}`);
}

try {
  await waitForHealth();

  const root = await fetch(`http://127.0.0.1:${port}/`).then((response) => response.json());
  if (root.mcp !== "Private MCP path configured") {
    throw new Error(`Unexpected public MCP description: ${root.mcp}`);
  }
  if (JSON.stringify(root).includes(secret)) {
    throw new Error("The root response exposed MCP_PATH_SECRET.");
  }

  const publicMcp = await fetch(`http://127.0.0.1:${port}/mcp`, { method: "POST" });
  if (publicMcp.status !== 404) {
    throw new Error(`Expected /mcp to be hidden, received ${publicMcp.status}.`);
  }

  const initialize = await fetch(`http://127.0.0.1:${port}/${secret}/mcp`, {
    method: "POST",
    headers: {
      accept: "application/json, text/event-stream",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "companion-games-smoke", version: "1.0.0" },
      },
    }),
  });
  const initializeBody = await initialize.text();
  if (!initialize.ok || !initializeBody.includes("mcp-companion-game")) {
    throw new Error(`Private MCP initialize failed (${initialize.status}).\n${initializeBody}`);
  }

  console.log("HTTP smoke passed: health, private MCP path, hidden public path, and initialize response.");
} finally {
  child.kill("SIGTERM");
}

