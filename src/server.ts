import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createCompanionMcpServer } from "./mcp.js";

async function main() {
  const server = createCompanionMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
