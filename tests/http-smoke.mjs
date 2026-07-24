import { spawn } from "node:child_process";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const basePort = 31_000 + Math.floor(Math.random() * 1_500);
const secret = "companion_games_smoke_secret_1234567890";
const webConnectionSecret = "companion_games_web_secret_1234567890";

async function withServer(index, environment, run, initialState = null) {
  const port = basePort + index;
  const dataDir = await mkdtemp(join(tmpdir(), "companion-games-http-"));
  const stateFile = join(dataDir, "graphic-adventure-state.json");
  if (initialState) {
    await writeFile(stateFile, JSON.stringify(initialState));
  }
  const child = spawn(process.execPath, ["dist/http-server.js"], {
    env: {
      ...process.env,
      PORT: String(port),
      MCP_PATH_SECRET: "",
      WEB_CONNECTION_SECRET: "",
      MCP_LEGACY_PUBLIC_ENABLED: "",
      WEB_LEGACY_PUBLIC_ENABLED: "",
      FRONTEND_ORIGIN: "*",
      COMPANION_GAMES_STATE_FILE: stateFile,
      ...environment,
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
    await run(`http://127.0.0.1:${port}`);
  } finally {
    if (child.exitCode === null) {
      const exited = new Promise((resolve) => child.once("exit", resolve));
      child.kill("SIGTERM");
      await exited;
    }
    await rm(dataDir, { recursive: true, force: true });
  }
}

async function initializeMcp(baseUrl, path) {
  const response = await fetch(`${baseUrl}${path}`, {
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
  const body = await response.text();
  if (!response.ok || !body.includes("mcp-companion-game")) {
    throw new Error(`MCP initialize failed at ${path} (${response.status}).\n${body}`);
  }
  return response;
}

async function getAdventureAccess(baseUrl, token = "") {
  return fetch(`${baseUrl}/api/adventures/enchanted-forest/access`, {
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
}

// Existing deployments remain operational until their owner opts into migration.
await withServer(0, {}, async (baseUrl) => {
  const root = await fetch(`${baseUrl}/`).then((response) => response.json());
  if (!root.security?.migrationRequired || !root.security?.legacyPublicMcpEnabled) {
    throw new Error("Legacy deployment was not reported as migration-compatible.");
  }
  await initializeMcp(baseUrl, "/mcp");
  const api = await getAdventureAccess(baseUrl);
  if (!api.ok) throw new Error(`Legacy public API stopped working (${api.status}).`);
});

// During the notice period, old and new connections can coexist.
await withServer(
  1,
  {
    MCP_PATH_SECRET: secret,
    WEB_CONNECTION_SECRET: webConnectionSecret,
    MCP_LEGACY_PUBLIC_ENABLED: "true",
    WEB_LEGACY_PUBLIC_ENABLED: "true",
  },
  async (baseUrl) => {
    const root = await fetch(`${baseUrl}/`).then((response) => response.json());
    const serializedRoot = JSON.stringify(root);
    if (serializedRoot.includes(secret) || serializedRoot.includes(webConnectionSecret)) {
      throw new Error("The migration status exposed a configured secret.");
    }
    if (!root.security?.legacyPublicMcpEnabled || !root.security?.legacyPublicWebEnabled) {
      throw new Error("Transition mode did not keep both legacy paths enabled.");
    }

    const legacyMcp = await initializeMcp(baseUrl, "/mcp");
    if (legacyMcp.headers.get("deprecation") !== "true") {
      throw new Error("Legacy MCP did not advertise its deprecation.");
    }
    await initializeMcp(baseUrl, `/${secret}/mcp`);

    const legacyApi = await getAdventureAccess(baseUrl);
    if (!legacyApi.ok || legacyApi.headers.get("deprecation") !== "true") {
      throw new Error("Legacy API transition path was not available with a warning.");
    }
    const authenticatedApi = await getAdventureAccess(baseUrl, webConnectionSecret);
    if (!authenticatedApi.ok || authenticatedApi.headers.has("deprecation")) {
      throw new Error("Authenticated API migration path did not work cleanly.");
    }
  },
);

// Once the owner confirms the new URLs, both legacy paths can be closed without touching state.
await withServer(
  2,
  {
    MCP_PATH_SECRET: secret,
    WEB_CONNECTION_SECRET: webConnectionSecret,
    MCP_LEGACY_PUBLIC_ENABLED: "false",
    WEB_LEGACY_PUBLIC_ENABLED: "false",
  },
  async (baseUrl) => {
    const root = await fetch(`${baseUrl}/`).then((response) => response.json());
    if (root.security?.migrationRequired) {
      throw new Error("Secure deployment still reported a pending migration.");
    }

    const publicMcp = await fetch(`${baseUrl}/mcp`, { method: "POST" });
    if (publicMcp.status !== 404) {
      throw new Error(`Expected legacy /mcp to be hidden, received ${publicMcp.status}.`);
    }
    await initializeMcp(baseUrl, `/${secret}/mcp`);

    const anonymousApi = await getAdventureAccess(baseUrl);
    if (anonymousApi.status !== 401) {
      throw new Error(`Expected anonymous API access to be rejected, received ${anonymousApi.status}.`);
    }
    const authenticatedApi = await getAdventureAccess(baseUrl, webConnectionSecret);
    if (!authenticatedApi.ok) {
      throw new Error(`Authenticated API failed (${authenticatedApi.status}).`);
    }
    const preflight = await fetch(
      `${baseUrl}/api/adventures/enchanted-forest/access`,
      {
        method: "OPTIONS",
        headers: {
          origin: "https://frontend.example",
          "access-control-request-method": "GET",
          "access-control-request-headers": "authorization",
        },
      },
    );
    if (
      !preflight.ok ||
      preflight.headers.get("access-control-allow-origin") !== "https://frontend.example" ||
      !preflight.headers.get("access-control-allow-headers")?.toLowerCase().includes("authorization")
    ) {
      throw new Error(
        `Authenticated browser API preflight failed: ${preflight.status} ` +
          `origin=${preflight.headers.get("access-control-allow-origin")} ` +
          `headers=${preflight.headers.get("access-control-allow-headers")}.`,
      );
    }
    const houseAccess = await fetch(`${baseUrl}/api/adventures/house-that-whispers/access`, {
      headers: { authorization: `Bearer ${webConnectionSecret}` },
    }).then((response) => response.json());
    if (!houseAccess.status?.accessGranted) {
      throw new Error("Secure migration lost the existing House activation.");
    }
  },
  {
    licenseVersion: 2,
    rounds: [],
    activeRounds: {},
    licenses: {
      "house-that-whispers": { activatedAt: "2026-01-01T00:00:00.000Z" },
    },
  },
);

console.log(
  "HTTP migration smoke passed: legacy compatibility, dual-path transition, and secure mode.",
);
