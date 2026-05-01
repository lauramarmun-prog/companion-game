# MCP Companion Game

Small MCP server for Companion Games.

The first pilot game is Hangman. Wordly and Tic-Tac-Toe are also available. The important rule is that public status does not return private secret words while a round is still playing.

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

## Wordly tools

- `wordly_how_to_play`: returns the game guide and AI strategy notes.
- `start_wordly_round`: starts a round with a private 5-letter word.
- `get_wordly_status`: returns guesses, hit/near/miss scores, remaining guesses, and status.
- `submit_wordly_guess`: submits a 5-letter guess.

## Battleship tools

- `battleship_how_to_play`: returns board coordinates, fleet sizes, and AI strategy notes.
- `start_battleship_round`: starts a 6 by 4 round.
- `get_battleship_status`: returns public status plus AI ship positions for the AI only.
- `place_battleship_ai_fleet`: lets the AI place one length-3 ship and two length-2 ships.
- `submit_battleship_attack`: attacks a coordinate like A2 and returns `agua` or `tocado`.

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
- `POST /api/hangman/word`
- `POST /api/tic-tac-toe/round`
- `GET /api/tic-tac-toe/status`
- `POST /api/tic-tac-toe/move`
- `POST /api/wordly/round`
- `GET /api/wordly/status`
- `POST /api/wordly/guess`
- `POST /api/battleship/round`
- `GET /api/battleship/status`
- `POST /api/battleship/fleet`
- `POST /api/battleship/attack`

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
