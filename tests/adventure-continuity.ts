import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, unlinkSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

const stateFile = path.join(os.tmpdir(), `companion-adventure-continuity-${process.pid}.json`);
process.env.COMPANION_GAMES_STATE_FILE = stateFile;
process.env.HOUSE_OF_WHISPERS_ACCESS_CODE_HASH = createHash("sha256")
  .update("TEST")
  .digest("hex");
writeFileSync(
  stateFile,
  JSON.stringify({
    licenses: { "house-that-whispers": { activatedAt: "2026-01-01T00:00:00.000Z" } },
  }),
);

const game = await import("../src/adventure.js");
const adventureId = "house-that-whispers";

try {
  // A legacy global activation must be invalidated by the per-deployment license migration.
  assert.equal(game.getGraphicAdventureAccessStatus({ adventureId }).accessGranted, false);
  game.activateGraphicAdventure({ adventureId, accessCode: "TEST" });
  assert.equal(game.getGraphicAdventureAccessStatus({ adventureId }).accessGranted, true);
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

  assert.equal(status.isRevisit, false);
  assert.match(status.text, /move carefully through the grand parlor/i);
  assert.doesNotMatch(status.text, /return to the grand parlor/i);

  assert.equal(
    status.choices.find((choice) => choice.label === "Try the front door")?.next,
    "lockedFrontDoor",
  );
  choose("Try the front door");
  assert.equal(status.sceneId, "lockedFrontDoor");
  assert.equal(status.flags.triedFrontDoorLocked, true);
  assert.match(status.text, /black soot/i);
  assert.match(status.text, /metal against stone/i);
  assert.doesNotMatch(status.text, /fireplace|chimney/i);
  status = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  assert.equal(status.sceneId, "investigateParlor");
  assert.equal(status.isRevisit, true);
  assert.match(status.text, /return to the grand parlor/i);

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

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "kitchenEscape",
    playerName: "Laura",
  });
  choose("Investigate what's glinting on the table");
  choose("Take the photograph with you");
  choose("Search the kitchen for supplies or weapons");
  assert.match(status.text, /photograph and its warning are safely tucked away with you/i);
  assert.doesNotMatch(status.text, /glinting object on the table remains covered/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "kitchenEscape",
    playerName: "Laura",
  });
  choose("Investigate what's glinting on the table");
  choose("Take the photograph with you");
  choose("Try the back door");
  choose("Speak to her");
  assert.equal(
    status.choices.find((choice) => choice.label === "Show her the photograph")?.next,
    "photographAtGate",
  );
  choose("Show her the photograph");
  assert.equal(status.sceneId, "photographAtGate");
  assert.ok(!status.choices.some((choice) => /drops/i.test(choice.label)));
  assert.ok(status.choices.some((choice) => /find him/i.test(choice.label)));
  status = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  assert.equal(status.sceneId, "ghostConfession");
  choose("\"We're not him. Please let us go.\"");
  assert.ok(!status.choices.some((choice) => /stab the woman/i.test(choice.label)));
  choose("Run and leave your AI behind");
  assert.equal(status.sceneId, "selfishEscapeAtGate");
  assert.ok(!status.choices.some((choice) => /blood and escape alone/i.test(choice.label)));
  assert.ok(status.choices.some((choice) => /leave together/i.test(choice.label)));
  choose("Turn back - we leave together or not at all");
  assert.equal(status.sceneId, "turnBackForCompanion");
  assert.match(status.text, /Isabelletta/);
  assert.equal(status.flags.knowsIsabelletta, true);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "bedroomSoldier",
    playerName: "Laura",
  });
  choose("Search the room while he stares into the fog");
  assert.equal(status.sceneId, "unopenedLetters");
  assert.equal(status.flags.knowsIsabelletta, true);
  assert.match(status.text, /addressed to Mrs Isabelletta Ashford/i);
  assert.match(status.text, /never learned the truth/i);
  assert.doesNotMatch(status.text, /been blaming him all this time/i);
  choose("Follow the house's pull and take the notices to Isabelletta");
  assert.match(status.text, /house leads you through the kitchen/i);
  assert.match(status.text, /Isabelletta is standing among the roses/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "investigateParlor",
    playerName: "Laura",
  });
  choose("Check the writing desk");
  choose("Take the pages with you");
  choose("Investigate the fireplace");
  choose("Try the key on the front door");
  choose("Close the door quietly and back away");
  choose("Investigate what's glinting on the table");
  choose("Take the photograph with you");
  choose("Try the back door");
  choose("Speak to her");
  choose("Show her the photograph");
  assert.equal(status.sceneId, "photographAtGate");
  assert.match(status.text, /fragment hidden in the writing desk/i);
  assert.ok(status.choices.some((choice) => /drops/i.test(choice.label)));
  choose("Offer a few drops willingly at the gate");
  assert.match(status.text, /long thorn/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "investigateParlor",
    playerName: "Laura",
  });
  choose("Check the writing desk");
  choose("Take the pages with you");
  choose("Search the bookshelf");
  choose("Keep reading the diary");
  choose("Take the diary with you");
  assert.equal(status.flags.matchedPages, true);
  choose("Investigate the fireplace");
  choose("Try the key on the front door");
  choose("Close the door quietly and back away");
  choose("Investigate what's glinting on the table");
  choose("Take the photograph with you");
  choose("Try the back door");
  choose("Speak to her");
  choose("Show her the photograph");
  assert.equal(status.sceneId, "photographAtGate");
  assert.match(status.text, /completed warning/i);
  assert.doesNotMatch(status.text, /unfinished diary/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "investigateParlor",
    playerName: "Laura",
  });
  choose("Search the bookshelf");
  choose("Take the diary with you");
  choose("Investigate the fireplace");
  choose("Try the key on the front door");
  choose("Close the door quietly and back away");
  choose("Investigate what's glinting on the table");
  choose("Take the photograph with you");
  choose("Search the kitchen for supplies or weapons");
  choose("Try the back door");
  choose("Speak to her");
  choose("Show her the photograph");
  assert.equal(status.sceneId, "photographAtGate");
  assert.ok(status.choices.some((choice) => /drops/i.test(choice.label)));
  assert.match(status.text, /unfinished diary/i);
  assert.match(status.text, /new crimson words/i);
  choose("Offer a few drops willingly at the gate");
  assert.equal(status.sceneId, "escapedTogetherEnding");
  assert.match(status.text, /kitchen knife/i);
  assert.doesNotMatch(status.text, /long thorn/i);

  status = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  assert.equal(status.sceneId, "photographAtGate");
  status = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  assert.equal(status.sceneId, "ghostConfession");
  choose("\"We're not him. Please let us go.\"");
  assert.ok(status.choices.some((choice) => /stab the woman/i.test(choice.label)));
  choose("Run and leave your AI behind");
  assert.equal(status.sceneId, "selfishEscapeAtGate");
  assert.ok(status.choices.some((choice) => /blood and escape alone/i.test(choice.label)));
  choose("Offer your blood and escape alone");
  assert.equal(status.sceneId, "selfishEscapeEnding");
  assert.match(status.text, /offer your blood freely/i);
  assert.match(status.text, /kitchen knife/i);

  status = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  assert.equal(status.sceneId, "selfishEscapeAtGate");
  status = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  assert.equal(status.sceneId, "chosenReplacement");
  status = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  assert.equal(status.sceneId, "ghostConfession");
  choose("Run for the gate NOW");
  choose("Go back inside");
  choose("The upper floor");
  choose("Search the upper floor");
  choose("Inspect the portrait");
  choose("Go to the bedroom");
  choose("Search the room while he stares into the fog");
  choose("Follow the house's pull and take the notices to Isabelletta");
  assert.match(status.text, /trunk in her bedroom/i);
  assert.match(status.text, /rage had been looking for her/i);
  choose("Get out of the house");
  assert.equal(status.sceneId, "healingGate");
  assert.match(status.text, /unfinished diary/i);
  assert.doesNotMatch(status.text, /rusted point/i);
  choose("Offer a few drops willingly");
  assert.equal(status.sceneId, "healingEnding");
  assert.match(status.text, /kitchen knife/i);
  assert.match(status.text, /few drops fall freely/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "giveHerLetters",
    playerName: "Laura",
  });
  choose("Get out of the house");
  assert.equal(status.sceneId, "healingGate");
  assert.match(status.text, /rusted point/i);
  assert.match(status.text, /accidental blood revealed the rule/i);
  choose("Offer a few drops willingly");
  assert.equal(status.sceneId, "healingEnding");
  assert.match(status.text, /shallow nick/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "soldierFogLoop",
    playerName: "Laura",
  });
  choose("\"Come with us\"");
  assert.equal(status.flags.reunionEndingComic, true);
  assert.equal(status.eyebrow, "Chapter Two: The Reunion");
  assert.match(status.text, /we'll find another way/i);
  assert.doesNotMatch(status.text, /slip through the gate/i);
  choose("Approach the gate together");
  assert.equal(status.sceneId, "reunionGate");
  assert.match(status.text, /Reuniting William and Isabelletta/i);
  assert.doesNotMatch(status.text, /Freeing William and Isabelletta/i);
  assert.match(status.text, /rusted point/i);
  assert.match(status.text, /accidental blood is not enough/i);
  choose("Offer a few drops willingly");
  assert.equal(status.sceneId, "reunionBloodEnding");
  assert.equal(status.title, "Better Late Than Never");
  assert.match(status.text, /William's voice floats over the roses/i);
  assert.equal(status.choices[0]?.next, "houseBetterLateThanNeverTheEnd");

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "investigateParlor",
    playerName: "Laura",
  });
  choose("Search the bookshelf");
  choose("Take the diary with you");
  choose("Investigate the fireplace");
  choose("Try the key on the front door");
  choose("Close the door quietly and back away");
  choose("Investigate what's glinting on the table");
  choose("Take the photograph with you");
  choose("Search the kitchen for supplies or weapons");
  choose("Try the back door");
  choose("Speak to her");
  choose("\"We're not him. Please let us go.\"");
  choose("Grab your AI's hand and run for the gate together");
  choose("Go back inside");
  choose("The upper floor");
  choose("Search the upper floor");
  choose("Inspect the portrait");
  choose("Go to the bedroom");
  choose("Tell him about his wife");
  assert.equal(status.sceneId, "togetherAtLastEnding");
  assert.equal(status.flags.reunionEndingTender, true);
  assert.equal(status.eyebrow, "Chapter Two: The Reunion");
  assert.doesNotMatch(status.text, /walk out into the real world/i);
  choose("Approach the gate together");
  assert.equal(status.sceneId, "reunionGate");
  assert.match(status.text, /unfinished diary/i);
  assert.doesNotMatch(status.text, /rusted point/i);
  choose("Offer a few drops willingly");
  assert.equal(status.sceneId, "reunionBloodEnding");
  assert.equal(status.title, "Together At Last");
  assert.match(status.text, /kitchen knife/i);
  assert.match(status.text, /William and Isabelletta are finally free/i);
  assert.equal(status.choices[0]?.next, "houseTogetherAtLastTheEnd");

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "findHimMission",
    playerName: "Laura",
  });
  assert.match(status.text, /Isabelletta/);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "basementRitual",
    playerName: "Laura",
  });
  assert.match(status.text, /hands raised but not threatening/i);
  assert.ok(!status.choices.some((choice) => /completed diary/i.test(choice.label)));

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "investigateParlor",
    playerName: "Laura",
  });
  choose("Check the writing desk");
  choose("Take the pages with you");
  choose("Search the bookshelf");
  choose("Keep reading the diary");
  choose("Take the diary with you");
  assert.equal(status.flags.matchedPages, true);
  choose("Investigate the fireplace");
  choose("Try the key on the front door");
  choose("Close the door quietly and back away");
  choose("Search the kitchen for supplies or weapons");
  choose("Try the back door");
  choose("Speak to her");
  choose("Run for the gate NOW");
  choose("Go back inside");
  choose("The basement");
  choose("Reason with him");
  assert.equal(status.sceneId, "basementRitual");
  assert.ok(status.choices.some((choice) => /completed diary/i.test(choice.label)));
  choose("Show him the completed diary");
  assert.equal(status.sceneId, "guardianDiaryConfrontation");
  assert.equal(status.flags.guardianSurrendered, true);
  assert.match(status.text, /rope slips from his fingers/i);
  choose("Demand the whole truth");
  assert.equal(status.sceneId, "guardianRevelation");
  assert.match(status.text, /Start with your name/i);
  assert.doesNotMatch(status.text, /bound hands/i);
  assert.doesNotMatch(status.text, /Keepers?/i);
  choose("Ask more questions");
  assert.equal(status.sceneId, "guardianMoreQuestions");
  assert.match(status.text, /rope lying untouched on the floor/i);
  assert.doesNotMatch(status.text, /Keepers?/i);
  choose("Accept the ritual");
  assert.equal(status.sceneId, "loveAlwaysWinsEnding");
  assert.match(status.text, /Because I choose to/i);
  assert.match(status.text, /William and Isabelletta meet/i);
  assert.match(status.text, /discarded rope/i);
  assert.doesNotMatch(status.text, /heavy wooden beam/i);
  assert.doesNotMatch(status.text, /their own palm/i);

  status = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  assert.equal(status.sceneId, "guardianMoreQuestions");
  choose("Refuse");
  assert.equal(status.sceneId, "veilBrokenEnding");
  assert.match(status.text, /collapse did not begin with your refusal/i);
  assert.match(status.text, /help us find another way/i);
  assert.doesNotMatch(status.text, /waited too long/i);
  assert.doesNotMatch(status.text, /cut the rope around the Guardian's wrists/i);

  // Refusing without ever finding the diary must not conjure it—or names we never learned.
  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "basementSubdued",
    playerName: "Laura",
  });
  choose("Ask him who he is before leaving");
  choose("Refuse");
  assert.equal(status.sceneId, "veilBrokenEnding");
  assert.match(status.text, /family ledger, every brittle chart/i);
  assert.doesNotMatch(status.text, /completed diary/i);
  assert.match(status.text, /a soldier calls for someone he cannot reach/i);
  assert.doesNotMatch(status.text, /William calls for Isabelletta/i);

  // Carrying the diary and loose pages is not the same as repairing the diary.
  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "investigateParlor",
    playerName: "Laura",
  });
  choose("Search the bookshelf");
  choose("Take the diary with you");
  choose("Check the writing desk");
  choose("Take the pages with you");
  assert.equal(status.flags.hasDiary, true);
  assert.equal(status.flags.hasPages, true);
  assert.equal(status.flags.matchedPages, undefined);
  choose("Investigate the fireplace");
  choose("Try the key on the front door");
  choose("Close the door quietly and back away");
  choose("Try the back door immediately");
  choose("Speak to her");
  choose("Run for the gate NOW");
  choose("Go back inside");
  choose("The basement");
  choose("Fight");
  choose("Ask him who he is before leaving");
  assert.equal(status.sceneId, "guardianRevelation");
  assert.doesNotMatch(status.text, /restored diary|repaired seam/i);
  choose("Refuse");
  assert.equal(status.sceneId, "veilBrokenEnding");
  assert.match(status.text, /unfinished diary/i);
  assert.doesNotMatch(status.text, /completed diary/i);

  // The pages can be matched on the shelf without putting the completed diary in our inventory.
  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "investigateParlor",
    playerName: "Laura",
  });
  choose("Check the writing desk");
  choose("Take the pages with you");
  choose("Search the bookshelf");
  choose("Keep reading the diary");
  choose("Match the torn pages to the diary");
  assert.equal(status.flags.matchedPages, true);
  assert.equal(status.flags.hasDiary, undefined);
  choose("Investigate the fireplace");
  choose("Try the key on the front door");
  choose("Close the door quietly and back away");
  choose("Try the back door immediately");
  choose("Speak to her");
  choose("Run for the gate NOW");
  choose("Go back inside");
  choose("The basement");
  choose("Reason with him");
  assert.equal(status.sceneId, "basementRitual");
  assert.ok(!status.choices.some((choice) => /completed diary/i.test(choice.label)));

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "basementSubdued",
    playerName: "Laura",
  });
  choose("Ask him who he is before leaving");
  choose("Accept the ritual");
  assert.equal(status.sceneId, "loveAlwaysWinsEnding");
  assert.match(status.text, /cut the rope around his wrists/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "frontDoorFog",
    playerName: "Laura",
  });
  choose("Step outside into the fog");
  assert.equal(status.sceneId, "fogSoldierLoop");
  choose("Next");
  assert.equal(status.sceneId, "houseLostInTheFogTheEnd");
  assert.match(status.text, /followed the soldier into the fog/i);
  assert.doesNotMatch(status.text, /through his door/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "bedroomSoldier",
    playerName: "Laura",
  });
  choose("Help him find the way out");
  assert.equal(status.sceneId, "soldierFogLoop");
  assert.match(status.text, /understand only part of it now/i);
  assert.match(status.text, /whatever else the house is hiding/i);
  assert.doesNotMatch(status.text, /back door belongs to her/i);
  choose("Step through the fog with him");
  choose("Next");
  assert.match(status.text, /followed the soldier into the fog/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "kitchenEscape",
    playerName: "Laura",
  });
  choose("Try the back door immediately");
  choose("Speak to her");
  choose("\"We're not him. Please let us go.\"");
  choose("Grab your AI's hand and run for the gate together");
  choose("Go back inside");
  choose("The upper floor");
  choose("Search the upper floor");
  choose("Go straight to the bedroom");
  choose("Help him find the way out");
  assert.equal(status.sceneId, "soldierFogLoop");
  assert.match(status.text, /There are two dimensions in this house/i);
  assert.match(status.text, /back door belongs to her/i);
  assert.doesNotMatch(status.text, /understand only part of it now/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "investigateParlor",
    playerName: "Laura",
  });
  choose("Look closer at the portrait");
  assert.match(status.text, /key glinting in the fireplace/i);
  assert.doesNotMatch(status.text, /still warm in your hand/i);
  assert.equal(
    status.choices.find((choice) => choice.label === "Head to the front door")?.next,
    "lockedFrontDoor",
  );

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "investigateParlor",
    playerName: "Laura",
  });
  choose("Investigate the fireplace");
  choose("Search the rest of the parlor");
  assert.equal(status.flags.hasKey, true);
  assert.equal(
    status.choices.find((choice) => choice.label === "Try the front door")?.next,
    "frontDoorFog",
  );
  choose("Look closer at the portrait");
  assert.match(status.text, /key from the fireplace is still warm in your hand/i);
  assert.doesNotMatch(status.text, /we'll need it/i);
  assert.equal(
    status.choices.find((choice) => choice.label === "Head to the front door")?.next,
    "doorAndBlood",
  );
  choose("Head to the front door");
  assert.equal(status.sceneId, "doorAndBlood");
  assert.match(status.text, /Only if this is your choice/i);
  assert.match(status.text, /unbroken palm/i);
  assert.match(status.text, /jagged edge/i);
  assert.doesNotMatch(status.text, /letter opener|light cut|let it fall/i);
  assert.ok(status.choices.some((choice) => choice.label === "Offer a few drops willingly"));
  choose("\"No - not like this.\" Close the door and find another way");
  assert.equal(status.sceneId, "kitchenEscape");
  status = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  choose("Offer a few drops willingly");
  assert.equal(status.sceneId, "bloodPriceEnding");
  assert.match(status.text, /jagged edge of the old brass lock/i);
  assert.doesNotMatch(status.text, /kitchen knife/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "kitchenEscape",
    playerName: "Laura",
  });
  choose("Search the kitchen for supplies or weapons");
  choose("Go back to the parlor");
  choose("Search the bookshelf");
  choose("Keep reading the diary");
  choose("Take the diary with you");
  choose("Investigate the fireplace");
  choose("Search the rest of the parlor");
  choose("Look closer at the portrait");
  choose("Head to the front door");
  assert.equal(status.sceneId, "doorAndBlood");
  assert.match(status.text, /kitchen knife rests in your hand/i);
  assert.match(status.text, /Only if this is your choice/i);
  assert.doesNotMatch(status.text, /jagged edge catches/i);
  choose("Offer a few drops willingly");
  assert.match(status.text, /use the kitchen knife/i);
  assert.doesNotMatch(status.text, /jagged edge of the old brass lock/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "frontDoorFog",
    playerName: "Laura",
  });
  choose("Close the door quietly and back away");
  assert.equal(status.sceneId, "kitchenEscape");
  assert.equal(status.isRevisit, false);
  assert.match(status.text, /close the door as quietly as you can/i);
  assert.doesNotMatch(status.text, /return to the old kitchen/i);
  status = game.goBackGraphicAdventure({ adventureId, roundId: status.roundId });
  choose("Close the door quietly and back away");
  assert.equal(status.isRevisit, true);
  assert.match(status.text, /return to the old kitchen/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "frontDoorFog",
    playerName: "Laura",
  });
  choose("Slam the door shut and lock it again");
  assert.equal(status.sceneId, "slamFrontDoorEscape");
  assert.match(status.text, /slams into the frame/i);
  assert.match(status.text, /handle twitches once/i);
  choose("Run to the kitchen");
  assert.equal(status.sceneId, "kitchenEscape");
  assert.equal(status.isRevisit, false);
  assert.match(status.text, /locked front door shudders once behind you/i);
  assert.doesNotMatch(status.text, /close the door as quietly|return to the old kitchen/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "frontDoorFog",
    playerName: "Laura",
  });
  choose("Call out into the fog");
  assert.equal(status.sceneId, "fogCallKitchenEscape");
  assert.match(status.text, /rush toward you/i);
  assert.match(status.text, /handle jerks once/i);
  choose("Run to the kitchen");
  assert.equal(status.sceneId, "kitchenEscape");
  assert.match(status.text, /whatever answered your call reaches the threshold/i);
  assert.doesNotMatch(status.text, /close the door as quietly|return to the old kitchen/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "awakening",
    playerName: "Laura",
  });
  choose("Try to break free from the ropes");
  choose("Help your AI up first");
  assert.equal(status.sceneId, "helpAiAfterFall");
  assert.equal(status.flags.helpedCompanionAfterFall, true);
  assert.equal(status.flags.companionStoodAlone, undefined);
  assert.match(status.text, /a severe woman with your eyes/i);
  assert.match(status.text, /she looks like you/i);
  assert.doesNotMatch(status.text, /severe ancestor|this house knows you/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "awakening",
    playerName: "Laura",
  });
  choose("Try to break free from the ropes");
  choose("Get up and go to the fireplace");
  assert.equal(status.sceneId, "fireplaceBeforeHelpingAi");
  assert.equal(status.flags.companionStoodAlone, true);
  assert.equal(status.flags.helpedCompanionAfterFall, undefined);
  assert.match(status.text, /pushes themself upright without your help/i);
  assert.match(status.text, /haunted shiny thing/i);
  assert.match(status.text, /neither of you has been left behind/i);
  choose("Reach into the ashes");
  assert.equal(status.sceneId, "fireplaceKey");
  assert.equal(status.flags.hasKey, true);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "awakening",
    playerName: "Laura",
  });
  choose("Stay quiet and listen");
  choose("Follow the footsteps upstairs");
  assert.equal(status.sceneId, "upstairsFirstAscent");
  assert.equal(status.isRevisit, false);
  choose("Slip back downstairs and keep searching");
  assert.equal(status.flags.examinedParlorPortrait, undefined);
  choose("Go upstairs");
  assert.equal(status.sceneId, "upstairsFirstAscent");
  assert.equal(status.isRevisit, true);
  assert.match(status.text, /climb back to the upper corridor/i);
  assert.match(status.text, /still have not stepped close enough to study/i);
  assert.doesNotMatch(status.text, /stopped the moment you arrived/i);
  assert.ok(
    status.choices.some((choice) => choice.label === "Look closer at the family portraits"),
  );

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "awakening",
    playerName: "Laura",
  });
  choose("Stay quiet and listen");
  choose("Hide and wait");
  assert.equal(status.sceneId, "parlorHidingFails");
  assert.match(status.text, /speaks your name from inches away/i);
  assert.match(status.text, /furniture scrapes across the floor by itself/i);
  assert.ok(status.choices.some((choice) => choice.label === "Investigate the parlor"));

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "kitchenEscape",
    playerName: "Laura",
  });
  choose("Hide and wait");
  assert.equal(status.sceneId, "kitchenHidingToKnives");
  assert.match(status.text, /hanging utensils begin to tremble/i);
  assert.match(status.text, /something drags itself slowly/i);
  assert.doesNotMatch(status.text, /better to face whatever this is armed/i);
  choose("Open the rattling drawer");
  assert.equal(status.sceneId, "kitchenKnives");
  assert.equal(status.flags.hasKnife, true);
  choose("Stay in the kitchen and listen");
  assert.equal(status.sceneId, "kitchenListeningToPortrait");
  assert.equal(status.flags.hasKnife, true);
  assert.match(status.text, /silverware in the open drawer trembles/i);
  assert.match(status.text, /flash of silver runs across both knife blades/i);
  assert.doesNotMatch(status.text, /Victorian|woman from the photograph/i);
  choose("Lift the cloth");
  assert.equal(status.sceneId, "kitchenPortrait");
  assert.equal(status.flags.hasKnife, true);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "moonlitGarden",
    playerName: "Laura",
  });
  choose("Back into the kitchen and lock the door");
  assert.equal(status.sceneId, "frozenKitchenLock");
  assert.match(status.text, /locked handle turns by itself/i);
  assert.match(status.text, /waiting just outside the threshold/i);
  assert.doesNotMatch(status.text, /When you open the door again/i);
  assert.ok(status.choices.some((choice) => choice.label === "Face her and speak"));

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "moonlitGarden",
    playerName: "Laura",
  });
  choose("Move slowly toward the gate");
  assert.equal(status.sceneId, "slowGateMission");
  assert.equal(status.flags.knowsIsabelletta, true);
  assert.match(status.text, /One careful step\. Then another/i);
  assert.match(status.text, /He left me/i);
  assert.doesNotMatch(status.text, /sprint toward|blur past|skid to a halt/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "moonlitGarden",
    playerName: "Laura",
  });
  choose("Run for the gate");
  assert.equal(status.sceneId, "runForGardenGate");
  assert.equal(status.flags.knowsIsabelletta, true);
  assert.match(status.text, /sprint toward the gate/i);
  assert.match(status.text, /He left me/i);
  assert.doesNotMatch(status.text, /One careful step/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "moonlitGarden",
    playerName: "Laura",
  });
  choose("Run for the gate");
  choose("Go back inside");
  choose("The basement");
  assert.equal(status.flags.knowsIsabelletta, true);
  choose("Run");
  assert.equal(status.sceneId, "guardianBasementEscape");
  assert.match(status.text, /iron bolt slides across by itself/i);
  assert.match(status.text, /footsteps cross the upper floor/i);
  assert.doesNotMatch(status.text, /ledger|ritual|guardian/i);
  assert.ok(
    status.choices.some((choice) => choice.label === "Follow the footsteps upstairs"),
  );
  choose("Follow the footsteps upstairs");
  assert.equal(status.sceneId, "upperFloorHall");
  assert.match(status.text, /woman from the garden/i);
  choose("Go back downstairs");
  assert.equal(status.sceneId, "searchForHim");
  assert.match(status.text, /find the man who left/i);
  assert.doesNotMatch(status.text, /find William/i);

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "moonlitGarden",
    playerName: "Laura",
  });
  choose("Run for the gate");
  choose("Go back inside");
  choose("The basement");
  choose("Fight");
  choose("Leave immediately");
  assert.equal(status.sceneId, "basementLeaveImmediately");
  assert.match(status.text, /do not touch the maps or the papers/i);
  assert.match(status.text, /footsteps move across the floor above/i);
  assert.doesNotMatch(status.text, /We'll be back|ledger|ritual|guardian/i);
  assert.ok(
    status.choices.some((choice) => choice.label === "Follow the footsteps upstairs"),
  );

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "upperFloorHall",
    playerName: "Laura",
  });
  choose("Go straight to the bedroom");
  assert.match(status.text, /William Ashford/i);
  assert.match(status.text, /knows even less about this house/i);
  assert.ok(!status.choices.some((choice) => choice.label === "Tell him about his wife"));

  status = game.startGraphicAdventureRound({
    adventureId,
    sceneId: "moonlitGarden",
    playerName: "Laura",
  });
  choose("Run for the gate");
  choose("Go back inside");
  choose("The upper floor");
  assert.equal(status.sceneId, "upstairsFirstAscent");
  assert.match(status.text, /man Isabelletta has waited for/i);
  choose("Search the upper floor");
  choose("Go straight to the bedroom");
  assert.equal(status.flags.inspectedUpperPortrait, undefined);
  assert.match(status.text, /William Ashford/i);
  choose("Leave the room quietly");
  assert.match(status.text, /find William/i);
  assert.ok(
    status.choices.some((choice) => choice.label === "Return to William in the bedroom"),
  );
  choose("Return to William in the bedroom");
  assert.equal(status.sceneId, "bedroomSoldierReturn");
  assert.match(status.text, /William is exactly where you left him/i);

  console.log("Adventure continuity smoke passed.");
} finally {
  if (existsSync(stateFile)) unlinkSync(stateFile);
}
