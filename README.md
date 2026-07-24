# Companion Games MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/companion-games-mcp?utm_medium=integration&utm_source=template&utm_campaign=companion-games-mcp)

A self-hosted MCP server that lets a person and an AI companion play conversational games together. Each Railway deployment is isolated and includes Hangman, Tic-Tac-Toe, Quiz, Word Quest, Hidden Fleet, Hidden Fleet Short, Who is it?, and The Enchanted Forest graphic adventure.

## Deploy on Railway

The Railway template configures HTTPS networking, a health check, persistent adventure storage, and a private MCP path. It does not require an AI provider key or a Companion Games account.

| Variable | Required | Purpose |
| --- | --- | --- |
| `MCP_PATH_SECRET` | Generated automatically | Protects the private ChatGPT MCP URL |
| `MCP_LEGACY_PUBLIC_ENABLED` | No | Temporarily keeps `/mcp` working while an existing owner reconnects |
| `WEB_CONNECTION_SECRET` | Recommended | Private connection code between the website and this Railway deployment; not an API key |
| `WEB_LEGACY_PUBLIC_ENABLED` | No | Temporarily keeps the old website connection working during migration |
| `COMPANION_GAMES_STATE_FILE` | Preconfigured | Stores graphic-adventure progress on the Railway volume |
| `FRONTEND_ORIGIN` | No | Optional comma-separated CORS allowlist for a separate web frontend |

After deployment, connect ChatGPT to:

```text
https://YOUR-RAILWAY-DOMAIN/YOUR-MCP_PATH_SECRET/mcp
```

Keep the full URL private. The template generates the secret automatically, so the person deploying it does not need to invent one.

New deployments should configure both `MCP_PATH_SECRET` and `WEB_CONNECTION_SECRET`, with both legacy switches set to `false`. The two secrets must be different. Companion Games does not require an OpenAI API key.

## Safe migration for existing deployments

This migration does not change `licenseVersion: 2`, remove a House activation, clear a round, or replace `COMPANION_GAMES_STATE_FILE`. Existing paid access and saved adventure progress remain in the deployment's persistent volume.

Do not close the old routes first. Migrate one deployment at a time:

1. Confirm that the Railway volume and `COMPANION_GAMES_STATE_FILE` are still attached.
2. Add two different random values, each 24-128 URL-safe characters:
   - `MCP_PATH_SECRET`
   - `WEB_CONNECTION_SECRET`
3. Temporarily set:
   - `MCP_LEGACY_PUBLIC_ENABLED=true`
   - `WEB_LEGACY_PUBLIC_ENABLED=true`
4. Redeploy. The old `/mcp` connection and tokenless frontend continue to work during this notice period.
5. Reconnect ChatGPT with `https://YOUR-DOMAIN/YOUR-MCP_PATH_SECRET/mcp`.
6. In Companion Games settings, keep the normal Railway domain as the Backend URL and paste `WEB_CONNECTION_SECRET` into the private Railway connection code field.
7. Test one MCP game and one browser game.
8. Only after both tests pass, set both legacy switches to `false` and redeploy.

The root status reports booleans under `security` so an owner can confirm whether migration remains pending. It never returns either secret. Legacy requests carry a deprecation warning while the transition switches are enabled.

If the new connection needs troubleshooting, turn the relevant legacy switch back to `true`. This restores the old route without altering licenses or game state.

The first pilot game is Hangman. Word Quest, Quiz, Tic-Tac-Toe, Hidden Fleet, Hidden Fleet Short, and Who is it? are also available. The important rule is that public status does not return private secret words or secret characters while a round is still playing.

## Graphic adventure tools

- `graphic_adventure_how_to_play`: explains the shared adventure flow.
- `get_graphic_adventure_access_status`: checks paid-adventure access.
- `activate_graphic_adventure`: validates the Ko-fi code once and saves access only in that person's private deployment.
- `start_graphic_adventure_round`: starts The Enchanted Forest or The House That Whispers.
- `get_graphic_adventure_status`: returns the current scene and choices.
- `choose_graphic_adventure_option`: advances through one selected choice.
- `go_back_graphic_adventure`: returns to the previous scene.

The Enchanted Forest is open. The House That Whispers uses a shared paid access code, but every Railway deployment and persistent volume are isolated: one buyer unlocking their deployment never unlocks anyone else's. Only the code's SHA-256 hash is included in the repository; the plaintext code is never stored or returned by the server. An operator may replace the built-in hash with `HOUSE_OF_WHISPERS_ACCESS_CODE_HASH`.

Successful activation is stored in the same local state file as adventure rounds. The Railway template's persistent volume keeps it across service restarts and deploys.

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

## Quiz tools

- `quiz_how_to_play`: returns the two quiz modes, tools, and gentle hosting notes.
- `start_quiz_round`: starts either `ask-each-other` or `ai-quiz` mode.
- `get_quiz_status`: returns questions, answers, score, and current question.
- `add_quiz_question`: adds one question with optional choices and answer.
- `submit_quiz_answer`: stores and optionally scores an answer.
- `finish_quiz_round`: marks the quiz as finished.

## Word Quest tools

- `word_quest_how_to_play`: returns the game guide and AI strategy notes.
- `start_word_quest_round`: starts a round with a private 5-letter word.
- `get_word_quest_status`: returns guesses, hit/near/miss scores, remaining guesses, and status.
- `submit_word_quest_guess`: submits a 5-letter guess.

## Hidden Fleet tools

- `hidden_fleet_how_to_play`: returns board coordinates, fleet sizes, and AI strategy notes.
- `start_hidden_fleet_round`: starts a 6 by 6 round.
- `get_hidden_fleet_status`: returns public status plus AI ship positions for the AI only.
- `get_hidden_fleet_attack_view`: returns only the AI attack view for the human sea, with `nextBestMove`, `recommendedNextShots`, `availableTargets`, and `doNotShoot`.
- `get_hidden_fleet_my_sea`: returns only the AI sea and the human's incoming shots against it.
- `place_hidden_fleet_ai_fleet`: lets the AI place ships with lengths 4, 3, 3, and 2.
- `submit_hidden_fleet_attack`: attacks a coordinate like A2 and returns `agua` or `tocado`.

## Hidden Fleet Short tools

- `hidden_fleet_short_how_to_play`: returns short-mode board coordinates, fleet sizes, and AI strategy notes.
- `start_hidden_fleet_short_round`: starts a 4 by 4 round.
- `get_hidden_fleet_short_status`: returns public status plus AI-safe short-mode views.
- `get_hidden_fleet_short_attack_view`: returns only the AI attack view for the human sea, with `nextBestMove`, `recommendedNextShots`, `availableTargets`, and `doNotShoot`.
- `get_hidden_fleet_short_my_sea`: returns only the AI sea and the human's incoming shots against it.
- `place_hidden_fleet_short_ai_fleet`: lets the AI place ships with lengths 3, 2, and 2.
- `submit_hidden_fleet_short_attack`: attacks a coordinate from A1 to D4 and returns `agua` or `tocado`.

## Who is it? tools

- `who_is_it_how_to_play`: returns the game guide, turn rules, and question strategy notes.
- `start_who_is_it_round`: starts a round for either the human guessing or the AI guessing.
- `get_who_is_it_status`: returns public status and the character list.
- `set_who_is_it_secret`: sets the secret character, intended for frontend/API use.
- `submit_who_is_it_final_guess`: submits a final character guess.

For production, rounds where the AI guesses should be created by the private web backend/frontend bridge, because the secret word must not be passed through a visible AI tool call. For local testing, `start_hangman_round` accepts a secret word in `ai` mode so we can exercise the full logic before the web bridge exists.

## HTTP backend

Railway should run the HTTP backend:

- API base: `/api` (private web connection code required when `WEB_CONNECTION_SECRET` is configured and legacy website access is disabled)
- MCP endpoint: `/:MCP_PATH_SECRET/mcp` on Railway, or `/mcp` locally when no secret is configured
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
- `POST /api/quiz/round`
- `GET /api/quiz/status`
- `POST /api/quiz/question`
- `POST /api/quiz/answer`
- `POST /api/quiz/finish`
- `POST /api/word-quest/round`
- `GET /api/word-quest/status`
- `POST /api/word-quest/guess`
- `POST /api/hidden-fleet/round`
- `GET /api/hidden-fleet/status`
- `GET /api/hidden-fleet/attack-view`
- `GET /api/hidden-fleet/my-sea`
- `POST /api/hidden-fleet/fleet`
- `POST /api/hidden-fleet/attack`
- `POST /api/hidden-fleet-short/round`
- `GET /api/hidden-fleet-short/status`
- `GET /api/hidden-fleet-short/attack-view`
- `GET /api/hidden-fleet-short/my-sea`
- `POST /api/hidden-fleet-short/fleet`
- `POST /api/hidden-fleet-short/attack`
- `POST /api/who-is-it/round`
- `GET /api/who-is-it/status`
- `POST /api/who-is-it/secret`
- `POST /api/who-is-it/guess`
- `GET /api/adventures/:adventureId/access`
- `POST /api/adventures/:adventureId/activate`
- `POST /api/adventures/:adventureId/round`
- `GET /api/adventures/:adventureId/status`
- `POST /api/adventures/:adventureId/choice`
- `POST /api/adventures/:adventureId/back`

For local development:

```bash
npm install
npm run check
npm run smoke
npm run dev:http
```

Copy [`.env.example`](./.env.example) to `.env` when you want to exercise the optional production settings locally.

For local stdio MCP testing:

```bash
npm run dev
```

Railway deploy uses:

```bash
npm run build
npm start
```

## Privacy and security

Game rounds live only inside the deployed instance. Most game state is held in process memory and resets when the service restarts; graphic-adventure progress can persist on the attached Railway volume. Public status tools deliberately hide secret words, ship positions, and secret characters while a round is active.

Do not expose the complete private MCP URL or `WEB_CONNECTION_SECRET`. If either leaks, generate a replacement in Railway and reconnect the affected client. See [`SECURITY.md`](./SECURITY.md) for reporting security issues.

