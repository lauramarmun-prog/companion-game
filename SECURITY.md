Exit code: 0
Wall time: 2 seconds
Output:
# Security

## Reporting a vulnerability

Please report suspected security issues privately through GitHub's security advisory feature for this repository. Do not open a public issue containing an exploit, private MCP URL, secret game state, or deployment credentials.

## Deployment guidance

- Keep the full MCP URL private; its generated path protects access to the connector.
- Rotate `MCP_PATH_SECRET` in Railway if the URL is exposed.
- Restrict `FRONTEND_ORIGIN` when connecting a separate browser frontend.
- Never commit Railway variables, tokens, private URLs, or exported game state.

The public game-status tools are designed not to reveal active secret words, hidden fleets, or secret characters. Please include the affected game and tool or API route in a report.

