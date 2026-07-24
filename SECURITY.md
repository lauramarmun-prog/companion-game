# Security

## Reporting a vulnerability

Please report suspected security issues privately through GitHub's security advisory feature for this repository. Do not open a public issue containing an exploit, private MCP URL, secret game state, or deployment credentials.

## Deployment guidance

- Keep the full MCP URL private; its generated path protects access to the connector.
- Rotate `MCP_PATH_SECRET` in Railway if the URL is exposed.
- Configure a separate `WEB_CONNECTION_SECRET` before disabling legacy website access. This is not an OpenAI API key.
- Use `MCP_LEGACY_PUBLIC_ENABLED=true` and `WEB_LEGACY_PUBLIC_ENABLED=true` only for a bounded migration window.
- Test the private MCP URL and authenticated browser API before turning either legacy switch off.
- Closing legacy routes does not remove saved House access or adventure progress from the persistent volume.
- Restrict `FRONTEND_ORIGIN` when connecting a separate browser frontend.
- Never commit Railway variables, API tokens, private URLs, or exported game state.

The public game-status tools are designed not to reveal active secret words, hidden fleets, or secret characters. Please include the affected game and tool or API route in a report.

