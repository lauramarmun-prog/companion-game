# MCP Companion Game

Small MCP server for Companion Games.

The first pilot game is Hangman. Word Quest, Tic-Tac-Toe, Hidden Fleet, and Who is it? are also available. The important rule is that public status does not return private secret words or secret characters while a round is still playing.

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

## Word Quest tools

- `word_quest_how_to_play`: returns the game guide and AI strategy notes.
- `start_word_quest_round`: starts a round with a private 5-letter word.
- `get_word_quest_status`: returns guesses, hit/near/miss scores, remaining guesses, and status.
- `submit_word_quest_guess`: submits a 5-letter guess.

## Hidden Fleet tools

- `hidden_fleet_how_to_play`: returns board coordinates, fleet sizes, and AI strategy notes.
- `start_hidden_fleet_round`: starts an 8 by 8 round.
- `get_hidden_fleet_status`: returns public status plus AI ship positions for the AI only.
- `place_hidden_fleet_ai_fleet`: lets the AI place ships with lengths 4, 3, 3, and 2.
- `submit_hidden_fleet_attack`: attacks a coordinate like A2 and returns `agua` or `tocado`.

## Who is it? tools

- `who_is_it_how_to_play`: returns the game guide, turn rules, and question strategy notes.
- `start_who_is_it_round`: starts a round for either the human guessing or the AI guessing.
- `get_who_is_it_status`: returns public status and the character list.
- `set_who_is_it_secret`: sets the secret character, intended for frontend/API use.
- `submit_who_is_it_final_guess`: submits a final character guess.

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
- `POST /api/word-quest/round`
- `GET /api/word-quest/status`
- `POST /api/word-quest/guess`
- `POST /api/hidden-fleet/round`
- `GET /api/hidden-fleet/status`
- `POST /api/hidden-fleet/fleet`
- `POST /api/hidden-fleet/attack`
- `POST /api/who-is-it/round`
- `GET /api/who-is-it/status`
- `POST /api/who-is-it/secret`
- `POST /api/who-is-it/guess`

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
