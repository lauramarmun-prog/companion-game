import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, unlinkSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const stateFile = path.join(os.tmpdir(), `companion-adventure-continuity-${process.pid}.json`);
process.env.COMPANION_GAMES_STATE_FILE = stateFile;
process.env.HOUSE_OF_WHISPERS_ACCESS_CODE_HASH = createHash("sha256")
  .update("TEST")
  .digest("hex");

const game = await import("../src/adventure.js");
const adventureId = "house-that-whispers";

try {
  game.activateGraphicAdventure({ adventureId, accessCode: "TEST" });
  let status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "investigateParlor",
    playerName: "Laura",
  });

  const choose = (label: string) => {
    const choice = status.choices.find((candidate) => candidate.label === label);
    assert.ok(choice, `Missing choice "${label}" at ${status.sceneId}`);
    status = game.chooseGraphicAdventureOption({
      adventureId,
      roundId: status.roundId,
      choiceIndex: choice.index,
    }).status;
    return status;
  };

  choose("Check the writing desk");
  assert.match(status.text, /Someone went to great lengths to hide these/);
  choose("Take the pages with you");
  choose("Search the bookshelf");
  assert.equal(status.sceneId, "parlorDiaryAfterDesk");
  choose("Keep reading the diary");
  assert.match(status.text, /you already found them hidden inside the writing desk/);
  choose("Take the diary with you");

  assert.equal(status.eyebrow, "Chapter One: The Complete Archive");
  assert.ok(!status.choices.some((choice) => /desk/i.test(choice.label)));
  assert.ok(status.choices.some((choice) => /portrait/i.test(choice.label)));
  assert.ok(!/Chapter \d+[A-Z]/.test(status.eyebrow));

  const backed = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  assert.equal(backed.sceneId, "parlorDiaryBloodlineAfterDesk");
  assert.equal(backed.flags.hasDiary, undefined);
  assert.equal(backed.flags.matchedPages, undefined);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "kitchenEscape",
    playerName: "Laura",
  });
  choose("Investigate what's glinting on the table");
  choose("Search the kitchen for supplies or weapons");
  assert.ok(status.choices.some((choice) => choice.label === "Return to the photograph on the table"));

  console.log("Adventure continuity smoke passed.");
} finally {
  if (existsSync(stateFile)) unlinkSync(stateFile);
}
