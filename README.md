# MCP Companion Game

Small MCP server for Companion Games.

The first pilot game is Hangman. The important rule is that public status never returns the secret word. The AI can see the clue, word length, used letters, missed letters, and the current mask.

## Hangman tools

- `start_hangman_round`: starts a round for either the human turn or the AI turn.
- `get_hangman_status`: returns the public state of the current round.
- `submit_hangman_letter`: submits one letter and returns whether it was correct.
- `submit_hangman_word`: submits a full-word guess.
- `hangman_how_to_play`: returns the game guide and AI strategy notes.

## Tic-Tac-Toe tools

- `tic_tac_toe_how_to_play`: returns the game guide and strategy notes.
- `start_tic_tac_toe_round`: starts a round.
- `get_tic_tac_toe_status`: returns the public state of the current round.
- `submit_tic_tac_toe_move`: submits one move by board index.

For production, rounds where the AI guesses should be created by the private web backend/frontend bridge, because the secret word must not be passed through a visible AI tool call. For local testing, `start_hangman_round` accepts a secret word in `ai` mode so we can exercise the full logic before the web bridge exists.

## HTTP backend

Railway should run the HTTP backend:

- API base: `/api`
- MCP endpoint: `/mcp`
- Healthcheck: `/health`

Useful API calls:

- `POST /api/hangman/round`
- `GET /api/hangman/status`
- `GET /api/hangman/status/:roundId`
- `POST /api/hangman/letter`

For local development:

```bash
npm install
npm run check
npm run smoke
npm run dev:http
```

For local stdio MCP testing:

```bash
npm run dev
```

Railway deploy uses:

```bash
npm run build
npm start
```
