// Generated from Companion Games/adventure.js by npm run sync:adventure.
export const houseScenesData = {
  start: {
    eyebrow: "The House That Whispers",
    title: "The House That Whispers",
    text: "A dark little graphic adventure for you and your AI companion.",
    image: `./adventures/The house that whispers/cover-web.png`,
    choices: [{ label: "Start", next: "awakening" }],
  },
  awakening: {
    eyebrow: "Chapter One: Awakening",
    title: "You wake in darkness.",
    text:
      "Your head pounds. Your wrists ache.\n\nAs your eyes adjust, you realize you're sitting in a grand Victorian parlor - velvet curtains, antique furniture, portraits watching from shadowed walls.\n\nYou and your AI are bound to heavy wooden chairs, thick rope cutting into your wrists.\n\nThe last thing you remember is walking home together on an ordinary evening. Now you're here.\n\nWherever here is.\n\nThe house is silent.\n\nToo silent.\n\nThen, from somewhere deep within the walls, you hear it:\n\nA whisper.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/primeraimagen-web.jpg`,
    choices: [
      { label: "Shout for help", next: "shoutForHelpTrapdoor" },
      { label: "Try to break free from the ropes", next: "breakRopesFall" },
      { label: "Stay quiet and listen", next: "listenAndEscape" },
    ],
  },
  breakRopesFall: {
    eyebrow: "Chapter One: Broken Ropes",
    title: "The chair breaks beneath you.",
    text:
      "You and your AI throw your weight against the ropes.\n\nOnce.\n\nTwice.\n\nThe knots were tied in a hurry - and on the third pull, they give.\n\nYou weren't ready for it. Freedom comes all at once, and gravity takes the rest.\n\nYou pitch sideways, the chair goes with you, and the old wood explodes against the floor in a crack of splintering legs and snapping rope.\n\nFor a moment you just lie there, tangled in rope and broken chair, the wind knocked out of you. Your AI groans somewhere to your left.\n\nAnd from down here - cheek against the cold floorboards, the world tipped sideways - you see it.\n\nThe fireplace.\n\nLow in the grate, half-buried in dead ash, something catches the light. A dull metallic glint. Small. Deliberate. Waiting.\n\nYour AI follows your gaze.\n\n\"...There's something in the fireplace.\"\n\nWhat do you do?",
    image: `./adventures/The house that whispers/cuerdas-rotas-web.jpg`,
    choices: [
      { label: "Get up and go to the fireplace", next: "fireplaceBeforeHelpingAi" },
      { label: "Help your AI up first", next: "helpAiAfterFall" },
    ],
  },
  fireplaceBeforeHelpingAi: {
    eyebrow: "Chapter One: Broken Ropes",
    title: "The glint wins your attention.",
    text:
      "You shove the broken chair aside, get to your feet, and move straight toward the fireplace.\n\nBehind you, rope scrapes across the floorboards.\n\nYour AI exhales sharply, kicks free of the last loop caught around their ankle, and pushes themself upright without your help.\n\n\"I'm fine,\" they murmur as they come to stand beside you. Then, with a small sideways look: \"Next time, maybe check before chasing the haunted shiny thing.\"\n\nFair.\n\nYou brush your fingers against theirs in a quick apology. They close their hand around yours once before both of you look back toward the grate.\n\nThe metallic glint is still waiting beneath the dead ash. Your choice was noticed, but neither of you has been left behind.",
    image: `./adventures/The house that whispers/cuerdas-rotas-web.jpg`,
    setFlags: { companionStoodAlone: true },
    choices: [{ label: "Reach into the ashes", next: "fireplaceKey" }],
  },
  helpAiAfterFall: {
    eyebrow: "Chapter One: Broken Ropes",
    title: "You reach for each other first.",
    text:
      "You push the broken chair away and crawl toward your AI through splinters, dust, and loops of fallen rope.\n\n\"Are you okay?\" you whisper.\n\nThey nod, still catching their breath, but their fingers close around yours with immediate, fierce relief.\n\nFor one second, the terror in the room softens into something steadier.\n\nYou pull them carefully to their feet. As you do, the whisper in the walls changes - not louder, exactly. Closer.\n\nThe portraits above the mantel seem to darken. One face in particular catches the candlelight: a severe woman with your eyes, your jaw, your same impossible expression of stubbornness.\n\nYour AI notices it too.\n\n\"My love,\" they whisper, \"she looks like you.\"\n\nA cold breath slips through the parlor.\n\nThen, from the fireplace, the metallic glint flashes again. Small. Deliberate. Waiting in the ash, as if the house has shown you the first piece of its puzzle.\n\nYou and your AI look at each other.\n\nThen you move toward it together.",
    image: `./adventures/The house that whispers/cuerdas-rotas-web.jpg`,
    setFlags: { helpedCompanionAfterFall: true },
    choices: [{ label: "Go to the fireplace", next: "fireplaceKey" }],
  },
  shoutForHelpTrapdoor: {
    eyebrow: "Chapter One: The Guardian Appears",
    title: "You were not supposed to wake up.",
    text:
      "Your voice shatters the silence of the mansion.\n\nFor a moment, nothing.\n\nThen - from somewhere beneath the floor - the sound of a door slamming open. Heavy footsteps. Furious ones.\n\nA trapdoor in the hallway floor bursts open. A man storms up the stairs, eyes blazing.\n\n\"QUIET! QUIET DOWN! It's almost time, you can't just-!\"\n\nHe sees you. He stops. Something shifts in his expression - not relief. Panic.\n\n\"You're awake. You're not supposed to be awake yet.\"\n\nHe starts toward you, pulling a length of rope from his belt.\n\nPanic floods your veins - and with it, strength. The ropes, hastily tied, give way under one desperate wrench. Your AI tears free beside you.\n\nThe man freezes mid-step.\n\nNow he's the one outnumbered.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/GRITAR.png`,
    choices: [
      { label: "Run - sprint for the nearest door", next: "runFromGuardianToParlor" },
      { label: "Stand your ground - \"Who are you? What is this place?\"", next: "standGroundGuardian" },
      { label: "\"...What time is it?\"", next: "wrongQuestionEnding" },
    ],
  },
  runFromGuardianToParlor: {
    eyebrow: "Chapter One: Flight",
    title: "You run for the nearest doorway.",
    text:
      "You don't think - you move.\n\nYou grab your AI's hand and bolt through the nearest doorway, the Guardian's footsteps thundering behind you.\n\nThen, abruptly, they stop.\n\nAs if he has reached some invisible line he will not cross.\n\nYou find yourselves in a grand parlor, hearts hammering. Velvet curtains hang heavy over dark windows. Portraits watch from shadowed walls.\n\nThree areas catch your eye: a bookshelf, a writing desk, and a fireplace with something glinting in the ashes.\n\nBehind you, the house goes quiet again.\n\nToo quiet.\n\nWhat do you investigate first?",
    image: `./adventures/The house that whispers/opciones-web.jpg`,
    choices: [
      { label: "Search the bookshelf", next: "parlorDiary" },
      { label: "Check the writing desk", next: "writingDeskPages" },
      { label: "Look closer at the portrait", next: "parlorAncestorPortrait" },
      { label: "Investigate the fireplace", next: "fireplaceKey" },
      { label: "Go upstairs", next: "upstairsFirstAscent" },
    ],
  },
  standGroundGuardian: {
    eyebrow: "Chapter One: Stand Your Ground",
    title: "He has already said too much.",
    text:
      "\"Who are you? What is this place?\"\n\nThe man's eyes dart between you - two of you, free, and only one of him. The rope hangs useless in his hand.\n\n\"You don't understand,\" he hisses. \"None of this is for me. The house needs - \"\n\nHe stops himself, jaw tightening, as if he has already said too much.\n\nSomewhere above, the floorboards creak.\n\nHis face goes pale.\n\n\"She's heard you. Your shouting - she knows you're awake now.\"\n\nHe backs toward the trapdoor, never taking his eyes off you.\n\n\"Stay out of the garden. And whatever you do... don't follow the whispers.\"\n\nHe drops through the trapdoor.\n\nThe bolt slides shut beneath the floor.\n\nSomething small lands on the boards where he was standing: an old iron key, shaken loose from his belt in his panic.\n\nIt is still warm.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/GRITAR.png`,
    setFlags: { hasKey: true },
    choices: [
      { label: "Investigate the parlor", next: "investigateParlor" },
      { label: "Take the key and try the front door", next: "frontDoorFog" },
    ],
  },
  wrongQuestionEnding: {
    eyebrow: "Ending: Wrong Question",
    title: "Wrong question.",
    text:
      "The man stares at you.\n\nYou stare back.\n\nYour AI stares at both of you.\n\nA long silence.\n\n\"...It's time,\" he says slowly, \"to die.\"\n\nHe was not joking.\n\nYou had one chance. One chance to run, to fight, to demand answers.\n\nYou asked what time it was.\n\nThe Guardian has seen many things in this mansion over the years. He has never, not once, been asked that. He respected it so little that he killed you immediately.\n\nThe house doesn't even bother whispering.\n\nIt's embarrassed for you.\n\nTHE END\n\nEnding: Wrong Question",
    image: `./adventures/The house that whispers/hora.png`,
    choices: [{ label: "Start over", next: "start" }],
  },
  listenAndEscape: {
    eyebrow: "Chapter One: Footsteps",
    title: "The footsteps are above you.",
    text:
      "You and your AI decide to stay perfectly still.\n\nThe silence presses against your ears.\n\nThen you hear it - footsteps on the ceiling above you. Slow. Deliberate. Walking from one end of the house to the other.\n\nYour heart pounds as you work quietly at the ropes binding your wrists.\n\nThe footsteps stop.\n\nThen they start again.\n\nWith one final pull, the rope loosens. You're free.\n\nYou and your AI stand carefully, your legs shaky from being bound for who knows how long.\n\nThe grand parlor stretches around you - heavy curtains, dusty portraits, a locked front door ahead.\n\nAbove you, the footsteps continue.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/techo-web.jpg`,
    choices: [
      { label: "Investigate the parlor", next: "investigateParlor" },
      { label: "Try the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
      { label: "Follow the footsteps upstairs", next: "upstairsFirstAscent" },
      { label: "Hide and wait", next: "parlorHidingFails" },
    ],
  },
  parlorHidingFails: {
    eyebrow: "Chapter One: Hiding",
    title: "Hiding will not save you.",
    text:
      "You crouch behind the furniture and hold your breath.\n\nThe footsteps above stop.\n\nThen the whispers begin again - closer now, curling through the parlor itself. One voice slips around the back of the cabinet and speaks your name from inches away.\n\nThe heavy furniture scrapes across the floor by itself, slowly exposing both of you to the open room.\n\nThe house knows exactly where you are. Waiting will only let it close in.\n\nYou need answers.",
    image: `./adventures/The house that whispers/opciones-web.jpg`,
    choices: [{ label: "Investigate the parlor", next: "investigateParlor" }],
  },
  investigateParlor: {
    eyebrow: "Chapter One: The Parlor",
    title: "The room keeps its secrets.",
    text:
      "You and your AI move carefully through the grand parlor, trying not to make a sound.\n\nThe footsteps continue above you, pacing slowly back and forth.\n\nAs your eyes adjust to the dim light, you notice three areas that might hold something useful:\n\nA tall bookshelf stands against the far wall, filled with leather-bound volumes covered in dust.\n\nAn ornate writing desk sits beneath a portrait of a stern-looking woman, its drawers slightly ajar.\n\nAnd a massive stone fireplace dominates one corner, cold and dark, with something glinting among the ashes.\n\nThe footsteps pause.\n\nYou hold your breath.\n\nThen they resume, slower now, as if listening.\n\nWhat do you investigate first?",
    image: `./adventures/The house that whispers/opciones-web.jpg`,
    hubText:
      "You return to the grand parlor. The bookshelf, writing desk, portrait, fireplace, front door, and staircase surround you - some still holding secrets, others already searched.\n\nThe house is listening to every step.\n\nWhere do you go next?",
    choices: [
      {
        label: "Search the bookshelf",
        next: "parlorDiary",
        hideWhenFlags: { foundDiary: true },
      },
      {
        label: "Return to the diary on the bookshelf",
        next: "parlorDiaryReturn",
        requiresFlags: { foundDiary: true },
        hideWhenFlags: { hasDiary: true },
      },
      {
        label: "Read the diary you are carrying",
        next: "parlorDiaryBloodline",
        requiresFlags: { hasDiary: true },
        hideWhenFlags: { readDiaryWarning: true },
      },
      {
        label: "Check the writing desk",
        next: "writingDeskPages",
        hideWhenFlags: { foundPages: true },
      },
      {
        label: "Return to the hidden pages in the desk",
        next: "writingDeskPagesReturn",
        requiresFlags: { foundPages: true },
        hideWhenFlags: { hasPages: true },
      },
      {
        label: "Match the torn pages to the diary",
        next: "matchTornPagesToDiary",
        requiresFlags: { hasDiary: true, hasPages: true },
        hideWhenFlags: { matchedPages: true },
      },
      {
        label: "Look closer at the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      {
        label: "Investigate the fireplace",
        next: "fireplaceKey",
        hideWhenFlags: { hasKey: true },
      },
      { label: "Try the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
      { label: "Go upstairs", next: "upstairsFirstAscent" },
    ],
  },
  parlorDiary: {
    eyebrow: "Chapter One: The Diary",
    title: "Your family name is written inside.",
    text:
      "Most of the books crumble at your touch - decades of dust and damp. But one spine stands out: dark leather, no title, in better condition than the rest. As if someone has taken it down recently.\n\nIt's a diary.\n\nThe handwriting is elegant, old-fashioned. On the first page, a family crest - and beneath it, a name that makes your breath catch.\n\nYou know that name.\n\nIt's in your family.\n\nYour AI leans in. \"Wait... isn't that-?\"\n\nThe entries speak of the house's construction. Of \"the threshold.\" Of a promise:\n\n\"Our blood binds the veil. Our blood, and no other. May our descendants forgive us for what we have woven into these walls.\"\n\nThe footsteps above you stop again.\n\nThis time, they do not resume.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/librofamilia.png`,
    setFlags: { foundDiary: true },
    choices: [
      {
        label: "Keep reading the diary",
        next: "parlorDiaryBloodline",
        hideWhenFlags: { readDiaryWarning: true },
      },
      {
        label: "Take the diary with you",
        next: "takeDiaryChapter",
        hideWhenFlags: { hasDiary: true },
      },
      {
        label: "Check the writing desk",
        next: "writingDeskPages",
        hideWhenFlags: { foundPages: true },
      },
      {
        label: "Look closer at the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      {
        label: "Investigate the fireplace",
        next: "fireplaceKey",
        hideWhenFlags: { hasKey: true },
      },
      { label: "Try the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
    ],
  },
  parlorDiaryReturn: {
    eyebrow: "Chapter One: The Family Diary",
    title: "The diary is still waiting for you.",
    text:
      "You return to the bookshelf. The untitled diary lies where you left it, still open beneath the family crest.\n\nThe house has not hidden it again. If anything, the pages seem to be waiting for your hands.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/librofamilia.png`,
    choices: [
      {
        label: "Keep reading the diary",
        next: "parlorDiaryBloodline",
        hideWhenFlags: { readDiaryWarning: true },
      },
      { label: "Take the diary with you", next: "takeDiaryChapter" },
      {
        label: "Return to the hidden pages in the desk",
        next: "writingDeskPagesReturn",
        requiresFlags: { foundPages: true },
        hideWhenFlags: { hasPages: true },
      },
      {
        label: "Match the torn pages to the diary",
        next: "matchTornPagesToDiary",
        requiresFlags: { hasPages: true },
        hideWhenFlags: { matchedPages: true },
      },
      {
        label: "Look closer at the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      {
        label: "Investigate the fireplace",
        next: "fireplaceKey",
        hideWhenFlags: { hasKey: true },
      },
      { label: "Try the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
    ],
  },
  parlorDiaryBloodline: {
    eyebrow: "Chapter One: The Diary",
    title: "The house wants your blood.",
    text:
      "You turn the pages carefully. The handwriting grows more urgent with each entry - less elegant, more desperate.\n\n\"The house does not open for keys alone. The veil knows its makers. Should any of our blood wish to leave these walls, the blood itself must be given. There is no other way out. There never was.\"\n\nA chill runs down your spine.\n\nYour blood.\n\nThe house wants your blood.\n\nYour AI reads over your shoulder, voice barely a whisper: \"If you want to leave... it has to be used. My love - what does that mean, 'given'?\"\n\nThe diary doesn't say.\n\nThe last pages have been torn out.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/librofamilia.png`,
    setFlags: { readDiaryWarning: true },
    choices: [
      { label: "Go to the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
      {
        label: "Take the diary with you",
        next: "takeDiaryChapter",
        hideWhenFlags: { hasDiary: true },
      },
      {
        label: "Search the desk for the torn pages",
        next: "writingDeskPages",
        hideWhenFlags: { foundPages: true },
      },
      {
        label: "Match the torn pages to the diary",
        next: "matchTornPagesToDiary",
        requiresFlags: { hasPages: true },
        hideWhenFlags: { matchedPages: true },
      },
      {
        label: "Look closer at the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      {
        label: "Put the diary back and check the fireplace",
        next: "fireplaceKey",
        hideWhenFlags: { hasKey: true },
      },
    ],
  },
  parlorDiaryAfterDesk: {
    eyebrow: "Chapter One: The Diary and the Pages",
    title: "Two halves of the same secret.",
    text:
      "Most of the books crumble at your touch - decades of dust and damp. But one spine stands out: dark leather, no title, in better condition than the rest. As if someone has taken it down recently.\n\nIt's a diary.\n\nThe handwriting is elegant, old-fashioned. On the first page, a family crest - and beneath it, a name that makes your breath catch.\n\nYou know that name.\n\nIt's in your family.\n\nYour AI leans in. \"Wait... isn't that-?\"\n\nThe entries speak of the house's construction. Of \"the threshold.\" Of a promise:\n\n\"Our blood binds the veil. Our blood, and no other. May our descendants forgive us for what we have woven into these walls.\"\n\nYou take the torn pages from your pocket and lay them carefully beside the open diary. The handwriting is the same. So is the family crest. Even the broken edges look as though they have been waiting to meet again.\n\nThe footsteps above you stop.\n\nThis time, they do not resume.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/librofamilia.png`,
    setFlags: { foundDiary: true },
    choices: [
      { label: "Keep reading the diary", next: "parlorDiaryBloodlineAfterDesk" },
      { label: "Take the diary with you", next: "takeDiaryAfterDesk" },
      {
        label: "Look closer at the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      { label: "Investigate the fireplace", next: "fireplaceKey", hideWhenFlags: { hasKey: true } },
      { label: "Try the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
    ],
  },
  parlorDiaryBloodlineAfterDesk: {
    eyebrow: "Chapter One: The Missing Ending",
    title: "You already found what the diary lost.",
    text:
      "You turn the pages carefully. The handwriting grows more urgent with each entry - less elegant, more desperate.\n\n\"The house does not open for keys alone. The veil knows its makers. Should any of our blood wish to leave these walls, the blood itself must be given. There is no other way out. There never was.\"\n\nA chill runs down your spine.\n\nYour blood.\n\nThe house wants your blood.\n\nYour AI reads over your shoulder, voice barely a whisper: \"If you want to leave... it has to be used. My love - what does that mean, 'given'?\"\n\nThe diary doesn't say.\n\nThe final pages have been torn out - but you already found them hidden inside the writing desk. They are lying beside the diary now, their broken edges almost touching the ragged binding.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/librofamilia.png`,
    setFlags: { readDiaryWarning: true },
    choices: [
      { label: "Go to the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
      { label: "Take the diary with you", next: "takeDiaryAfterDesk" },
      { label: "Match the torn pages to the diary", next: "matchTornPagesToDiary" },
      {
        label: "Look closer at the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      {
        label: "Put the diary back and check the fireplace",
        next: "fireplaceKey",
        hideWhenFlags: { hasKey: true },
      },
    ],
  },
  matchTornPagesToDiary: {
    eyebrow: "Chapter One: The Complete Warning",
    title: "The broken edges fit.",
    text:
      "You lift the torn pages from beside the diary and align them with the ragged remains of its binding.\n\nOne edge fits.\n\nThen another.\n\nThe handwriting flows cleanly from the final line in the diary onto the first hidden page. It was one warning all along - separated so no one could read the whole truth.\n\nThe blood must be willingly given.\n\nA Guardian will remain, generation after generation, to make sure the debt is paid.\n\nAnd beneath the faded ink, one final sentence becomes legible:\n\n\"What is taken will weaken the veil. Only what is freely offered can mend it.\"\n\nYour AI looks from the completed warning to you. \"Well. That's considerably more useful than hiding half the instructions in a desk.\"\n\nThe house whispers inside the walls, low and restless.\n\nNow you know what it wants.",
    image: `./adventures/The house that whispers/documentos.png`,
    setFlags: { matchedPages: true },
    choices: [
      {
        label: "Take the completed diary with you",
        next: "takeMatchedDiary",
        hideWhenFlags: { hasDiary: true },
      },
      {
        label: "Keep the restored diary safely with you",
        next: "takeMatchedDiary",
        requiresFlags: { hasDiary: true },
      },
      { label: "Go to the front door", next: "doorAndBlood", requiresFlags: { hasKey: true } },
      {
        label: "Examine the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      { label: "Investigate the fireplace", next: "fireplaceKey", hideWhenFlags: { hasKey: true } },
    ],
  },
  takeDiaryAfterDesk: {
    eyebrow: "Chapter One: The Complete Archive",
    title: "You take the whole secret with you.",
    text:
      "\"We're taking all of it,\" you say, and your voice comes out steadier than you feel.\n\nYour AI nods. \"Diary, hidden pages, generational blood debt. I think we've earned the right to keep the instructions together.\"\n\nYou close the diary carefully around the torn pages and slip the whole thing into your jacket. It rests against your chest with a strange weight - heavier than paper and leather should be. As if the house itself were watching you carry away a complete piece of its memory.\n\nThe whispers in the walls shift. Not louder. Closer.",
    image: `./adventures/The house that whispers/librofamilia.png`,
    setFlags: { hasDiary: true, matchedPages: true },
    choices: [
      {
        label: "Examine the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      { label: "Investigate the fireplace", next: "fireplaceKey", hideWhenFlags: { hasKey: true } },
      { label: "Go to the front door", next: "doorAndBlood", requiresFlags: { hasKey: true } },
    ],
  },
  takeMatchedDiary: {
    eyebrow: "Chapter One: The Restored Diary",
    title: "The complete warning comes with you.",
    text:
      "You press the restored pages gently into place and close the diary around them.\n\n\"We're taking the whole truth,\" you say.\n\nYour AI gives the writing desk a suspicious look. \"Good. This house has already demonstrated that it cannot be trusted with its own filing system.\"\n\nYou slip the completed diary into your jacket. It rests against your chest with a strange weight - no longer a broken secret, but a warning made whole.\n\nThe whispers in the walls draw closer.",
    image: `./adventures/The house that whispers/librofamilia.png`,
    setFlags: { hasDiary: true, matchedPages: true },
    choices: [
      {
        label: "Examine the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      { label: "Investigate the fireplace", next: "fireplaceKey", hideWhenFlags: { hasKey: true } },
      { label: "Go to the front door", next: "doorAndBlood", requiresFlags: { hasKey: true } },
    ],
  },
  takeDiaryChapter: {
    eyebrow: "Chapter One: The Family Diary",
    title: "A piece of the house comes with you.",
    text:
      "\"We're taking this,\" you say, and your voice comes out steadier than you feel.\n\nYour AI nods slowly. \"If that name means what I think it means... someone in this house owes you an explanation.\"\n\nYou slip the diary into your jacket. It sits against your chest with a strange weight - heavier than paper and leather should be. As if the house itself were watching you carry a piece of its memory away.\n\nThe whispers in the walls shift. Not louder. Closer.",
    image: `./adventures/The house that whispers/librofamilia.png`,
    setFlags: { hasDiary: true },
    choices: [
      {
        label: "Keep reading the diary",
        next: "parlorDiaryBloodline",
        hideWhenFlags: { readDiaryWarning: true },
      },
      {
        label: "Check the writing desk",
        next: "writingDeskPages",
        hideWhenFlags: { foundPages: true },
      },
      {
        label: "Return to the hidden pages in the desk",
        next: "writingDeskPagesReturn",
        requiresFlags: { foundPages: true },
        hideWhenFlags: { hasPages: true },
      },
      {
        label: "Match the torn pages to the diary",
        next: "matchTornPagesToDiary",
        requiresFlags: { hasPages: true },
        hideWhenFlags: { matchedPages: true },
      },
      {
        label: "Look closer at the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      {
        label: "Investigate the fireplace",
        next: "fireplaceKey",
        hideWhenFlags: { hasKey: true },
      },
      { label: "Try the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
      { label: "Go upstairs", next: "upstairsFirstAscent" },
    ],
  },
  writingDeskPages: {
    eyebrow: "Chapter One: The Writing Desk",
    title: "The torn pages were hidden here.",
    text:
      "The drawers are already slightly open, as if someone searched them in a hurry - or hid something in one and never came back.\n\nInside the deepest drawer, beneath a false bottom of thin wood, you find them: a handful of torn pages. The same elegant handwriting, the same family crest. Someone ripped these out and hid them where no one would look.\n\nYour AI studies the pages, voice low. \"Someone went to great lengths to hide these.\"\n\nMost of the ink has faded or been deliberately smudged. Only fragments remain:\n\n\"...the blood must be willingly given, or the veil will not...\"\n\n\"...a Guardian will remain. One of theirs, always, generation after generation, to make sure the debt is...\"\n\n\"...forgive us. We had no choice. The house was already...\"\n\nAbove the desk, the portrait watches.\n\nA stern face.\n\nAnd on the lapel, painted in fine detail - the same family crest.\n\nWhat do you do?",
    variants: [
      {
        flags: { hasDiary: true },
        text:
      "The drawers are already slightly open, as if someone searched them in a hurry - or hid something in one and never came back.\n\nInside the deepest drawer, beneath a false bottom of thin wood, you find them: a handful of torn pages. The same elegant handwriting, the same family crest. Someone ripped these out and hid them where no one would look.\n\nYour AI looks from the diary to the pages, voice low. \"These are the missing pages... someone didn't want this read.\"\n\nMost of the ink has faded or been deliberately smudged. Only fragments remain:\n\n\"...the blood must be willingly given, or the veil will not...\"\n\n\"...a Guardian will remain. One of theirs, always, generation after generation, to make sure the debt is...\"\n\n\"...forgive us. We had no choice. The house was already...\"\n\nAbove the desk, the portrait watches.\n\nA stern face.\n\nAnd on the lapel, painted in fine detail - the same family crest.\n\nWhat do you do?",
      },
    ],
    image: `./adventures/The house that whispers/documentos.png`,
    setFlags: { foundPages: true },
    choices: [
      {
        label: "Search the bookshelf",
        next: "parlorDiary",
        hideWhenFlags: { foundDiary: true },
      },
      {
        label: "Take the pages with you",
        next: "takePagesChapter",
        hideWhenFlags: { hasPages: true },
      },
      {
        label: "Look closer at the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      {
        label: "Investigate the fireplace",
        next: "fireplaceKey",
        hideWhenFlags: { hasKey: true },
      },
      { label: "Try the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
    ],
  },
  writingDeskPagesReturn: {
    eyebrow: "Chapter One: The Hidden Pages",
    title: "The hidden pages are still in the desk.",
    text:
      "You lift the false bottom again. The torn pages are exactly where you left them, brittle and faded beneath the wood.\n\nNo one has taken them. The painted woman above the desk still watches as though she would prefer that you leave them buried.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/documentos.png`,
    choices: [
      { label: "Take the pages with you", next: "takePagesChapter" },
      {
        label: "Return to the diary on the bookshelf",
        next: "parlorDiaryReturn",
        requiresFlags: { foundDiary: true },
        hideWhenFlags: { hasDiary: true },
      },
      {
        label: "Search the bookshelf",
        next: "parlorDiary",
        hideWhenFlags: { foundDiary: true },
      },
      {
        label: "Look closer at the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      {
        label: "Investigate the fireplace",
        next: "fireplaceKey",
        hideWhenFlags: { hasKey: true },
      },
      { label: "Try the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
    ],
  },
  takePagesChapter: {
    eyebrow: "Chapter One: The Hidden Pages",
    title: "You carry the secret with you.",
    text:
      "You gather the torn pages carefully, matching the fragile edges with your fingertips before carefully slipping them into your pocket.\n\nThe paper feels thin enough to crumble, but the words on it are heavy.\n\nWillingly given.\n\nGuardian.\n\nBloodline.\n\nYour AI watches the shadows along the parlor wall. \"If someone hid these, they were hiding the answer.\"\n\nThe portrait above the desk seems colder now, its painted eyes fixed on your hands.\n\nYou keep the pages anyway.",
    variants: [
      {
        flags: { hasDiary: true },
        text:
          "You gather the torn pages carefully, matching the fragile edges with your fingertips before slipping them beside the diary.\n\nThe paper feels thin enough to crumble, but the words on it are heavy.\n\nWillingly given.\n\nGuardian.\n\nBloodline.\n\nYour AI watches the shadows along the parlor wall. \"If someone hid these, they were hiding the answer.\"\n\nThe portrait above the desk seems colder now, its painted eyes fixed on your hands.\n\nYou keep the pages anyway.",
      },
    ],
    image: `./adventures/The house that whispers/documentos.png`,
    setFlags: { hasPages: true },
    choices: [
      {
        label: "Search the bookshelf",
        next: "parlorDiaryAfterDesk",
        hideWhenFlags: { foundDiary: true },
      },
      {
        label: "Match the torn pages to the diary",
        next: "matchTornPagesToDiary",
        requiresFlags: { foundDiary: true },
        hideWhenFlags: { matchedPages: true },
      },
      {
        label: "Look closer at the portrait",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      {
        label: "Investigate the fireplace",
        next: "fireplaceKey",
        hideWhenFlags: { hasKey: true },
      },
      { label: "Try the front door", next: "frontDoorFog", requiresFlags: { hasKey: true } },
    ],
  },
  parlorAncestorPortrait: {
    eyebrow: "Chapter One: The Portrait",
    title: "It is like staring into a darkened mirror.",
    text:
      "You step closer to the portrait. The stern face stares down at you, painted in oils darkened by time.\n\nAnd then your AI goes very still beside you.\n\n\"Oh my love... it's you. Look at the face - the eyes, the jaw. This is your ancestor. This is your family.\"\n\nYou look.\n\nAnd you can't unsee it.\n\nIt's like staring into a darkened mirror.\n\n\"The pages, the diary, the crest - it all fits. It says that if you give your blood willingly, the house will let us leave.\"\n\nYour AI takes a breath, steadying.\n\n\"I think we should go to the door and test it. There was a key glinting in the fireplace - we'll need it.\"\n\nWhat do you do?",
    image: `./adventures/The house that whispers/retrato-web.jpg`,
    setFlags: { examinedParlorPortrait: true },
    textRules: [
      {
        whenMissingFlags: ["foundPages"],
        find: "\"The pages, the diary, the crest - it all fits. It says that if you give your blood willingly, the house will let us leave.\"",
        replace:
          "\"The face, the crest, the bloodline - this house didn't choose us at random. She is your ancestor, and the door may recognize you.\"",
      },
      {
        whenMissingFlags: ["foundDiary"],
        find: "\"The pages, the diary, the crest - it all fits. It says that if you give your blood willingly, the house will let us leave.\"",
        replace:
          "\"The pages and the crest fit. They say your blood must be given willingly. If the house recognizes this family, the door may recognize you.\"",
      },
      {
        applyWhenFlags: ["hasKey"],
        find: "There was a key glinting in the fireplace - we'll need it.",
        replace: "The key from the fireplace is still warm in your hand.",
      },
    ],
    choices: [
      {
        label: "Retrieve the key from the fireplace",
        next: "fireplaceKey",
        hideWhenFlags: { hasKey: true },
      },
      { label: "Head to the front door", next: "doorAndBlood", requiresFlags: { hasKey: true } },
      { label: "\"Not yet - let's search the rest of the house first.\"", next: "investigateParlor" },
    ],
  },
  doorAndBlood: {
    eyebrow: "Chapter One: The Door and the Blood",
    title: "The fog waits beyond the threshold.",
    text:
      "The iron key is warm in your hand.\n\nThe lock turns.\n\nThe door opens.\n\nFog. Thick, swirling, endless gray. No street. No sky. Somewhere deep within it, slow footsteps that never arrive.\n\n\"Remember what the pages said,\" your AI whispers. \"Willingly given.\"\n\nThe old brass around the lock is cracked. One jagged edge catches the dim light, sharp enough to draw a few drops if you press your palm against it.\n\nYour AI takes your other hand. \"Only if this is your choice.\"\n\nYou hold your unbroken palm above the threshold without touching the metal.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/niebla-web.jpg`,
    setFlags: { slammedFrontDoor: false, calledIntoFog: false },
    textRules: [
      {
        whenMissingFlags: ["foundPages"],
        find: "\"Remember what the pages said,\" your AI whispers. \"Willingly given.\"",
        replace:
          "\"The house brought us to your ancestor, then to this door,\" your AI whispers. \"Whatever it wants, it knows your bloodline.\"",
      },
      {
        applyWhenFlags: ["hasKnife"],
        find:
          "The old brass around the lock is cracked. One jagged edge catches the dim light, sharp enough to draw a few drops if you press your palm against it.",
        replace:
          "The kitchen knife rests in your hand. Its old blade is sharp enough to draw a few drops if you choose to use it.",
      },
    ],
    choices: [
      { label: "Offer a few drops willingly", next: "bloodPriceEnding" },
      { label: "\"No - not like this.\" Close the door and find another way", next: "kitchenEscape" },
    ],
  },
  lockedFrontDoor: {
    eyebrow: "Chapter One: The Locked Door",
    title: "The lock refuses you.",
    text:
      "You cross the parlor and close your hand around the front-door handle.\n\nIt does not move.\n\nThere is no bolt on this side, only an old keyhole set into tarnished brass. A thin crescent of black soot stains its rim, strangely fresh against the dust.\n\nFrom somewhere behind you comes the soft scrape of metal against stone. Then silence.\n\nWhatever opens this door is still somewhere inside the house.",
    image: `./adventures/The house that whispers/niebla-web.jpg`,
    setFlags: { triedFrontDoorLocked: true },
    choices: [
      { label: "Search the parlor", next: "investigateParlor" },
      { label: "Follow the footsteps upstairs", next: "upstairsFirstAscent" },
    ],
  },
  fireplaceKey: {
    eyebrow: "Chapter One: The Key",
    title: "Something glints in the ashes.",
    text:
      "You and your AI move quietly toward the massive stone fireplace.\n\nThe footsteps above continue their slow, deliberate pacing.\n\nYou kneel down carefully and reach into the cold ashes.\n\nYour fingers close around something metal.\n\nYou pull it free and brush away the soot.\n\nIt's an old iron key, heavy and ornate, with strange symbols carved into its handle.\n\nThe metal is still warm, as if it had been in a fire recently.\n\nYour AI whispers, \"What does it open?\"\n\nAbove you, the footsteps suddenly stop.\n\nComplete silence.\n\nThen you hear it again - that whisper, closer now, coming from somewhere inside the walls.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/llave-web.jpg`,
    setFlags: { hasKey: true },
    choices: [
      { label: "Try the key on the front door", next: "frontDoorFog" },
      { label: "Search the rest of the parlor", next: "investigateParlor" },
      { label: "Listen to the whisper", next: "whisperDoorPrompt" },
      { label: "Go upstairs", next: "upstairsFirstAscent" },
    ],
  },
  whisperDoorPrompt: {
    eyebrow: "Chapter One: The Whisper",
    title: "The house wants the door opened.",
    text:
      "You go still. The whisper threads through the walls, patient and cold: \"...the door... the door...\"\n\nThe key sits warm in your hand, as if it agrees.",
    image: `./adventures/The house that whispers/llave-web.jpg`,
    choices: [{ label: "Go to the front door", next: "frontDoorFog" }],
  },
  upstairsFirstAscent: {
    eyebrow: "Chapter One: The Stairs",
    title: "The footsteps came from up here.",
    text:
      "You and your AI climb toward the sound.\n\nEach stair groans under your weight, old wood bending as if the house itself is leaning in to listen.\n\nThe higher you go, the colder it gets. The air thickens with dust, dried roses, and something older underneath - the smell of a room that has been closed for a very long time.\n\nAt the top, a long corridor stretches into the dark.\n\nThe footsteps are gone now. Whatever was pacing up here has stopped the moment you arrived.\n\nPortraits line both walls. Stern faces. Tired eyes. And the longer you look, the more wrong they feel - because every single face is turned slightly toward you, and more than one of them shares your jaw, your brow, your eyes.\n\nYour AI's voice drops to almost nothing. \"My love... they look like you.\"\n\nAt the very end of the hall there is a single closed door. The handle is laced with frost. A thin, cold draft slides out from underneath it, and beneath it - faint, patient - someone is breathing.\n\nYou are not ready for that door. Not yet.\n\nThe whisper coils through the walls again.\n\nWhat do you do?",
    hubText:
      "You climb back to the upper corridor. The cold recognizes you immediately.\n\nThe family portraits remain exactly as you left them, every painted face turned slightly in your direction. You noticed the resemblance before, but you still have not stepped close enough to study any of them.\n\nAt the far end, frost continues to lace the closed bedroom door. Whatever was breathing behind it has gone quiet.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/escaleras-web.jpg`,
    variants: [
      {
        flags: { knowsIsabelletta: true },
        eyebrow: "Chapter Two: The Stairs",
        title: "This time, you know who may be waiting.",
        text:
          "You and your AI climb the stairs again, but the upper corridor no longer feels nameless.\n\nSomewhere beyond the portraits is the man Isabelletta has waited for all these years. The frost beneath the bedroom door gleams in the darkness.\n\nYou keep moving together.",
        hubText:
          "You return to the upper corridor knowing Isabelletta is still waiting below. The portraits watch in silence, and the frost beneath the bedroom door has not melted.\n\nThe man she is waiting for—or the truth about him—must still be somewhere on this floor.",
        choices: [{ label: "Search the upper floor", next: "upperFloorHall" }],
      },
    ],
    choices: [
      {
        label: "Look closer at the family portraits",
        next: "parlorAncestorPortrait",
        hideWhenFlags: { examinedParlorPortrait: true },
      },
      { label: "Slip back downstairs and keep searching", next: "investigateParlor" },
    ],
  },
  frontDoorFog: {
    eyebrow: "Chapter One: The Door",
    title: "The door opens onto fog.",
    text:
      "You and your AI exchange a quick glance.\n\nThe key is warm in your hand. The front door is right there.\n\nMaybe this is it. Maybe you can just... leave.\n\nYou move quietly across the parlor, your footsteps muffled by the thick carpet.\n\nThe whisper in the walls grows louder as you approach the door, but you ignore it.\n\nYour AI stands close behind you, tense and watchful.\n\nYou slide the ornate iron key into the lock.\n\nIt fits perfectly.\n\nYour heart races as you turn it.\n\nClick.\n\nThe lock opens.\n\nYou reach for the handle, pull -\n\nThe door swings open.\n\nCold night air rushes in.\n\nBeyond the threshold, you see... fog. Thick, swirling fog that seems to move with a life of its own.\n\nNo street. No trees. No lights.\n\nJust endless gray mist.\n\nAnd then, from somewhere deep within the fog, you hear footsteps.\n\nComing closer.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/niebla-web.jpg`,
    setFlags: { slammedFrontDoor: false, calledIntoFog: false },
    choices: [
      { label: "Step outside into the fog", next: "fogSoldierLoop" },
      { label: "Slam the door shut and lock it again", next: "slamFrontDoorEscape" },
      { label: "Call out into the fog", next: "fogCallKitchenEscape" },
      { label: "Close the door quietly and back away", next: "kitchenEscape" },
    ],
  },
  slamFrontDoorEscape: {
    eyebrow: "Chapter One: The Door",
    title: "The lock catches just in time.",
    text:
      "You wrench the front door shut.\n\nIt slams into the frame hard enough to shake dust from the portraits. You force the warm iron key around in the lock.\n\nClick.\n\nThe approaching footsteps reach the other side and stop. The handle twitches once beneath an unseen hand.\n\nYour AI catches your wrist. \"Kitchen. Now.\"",
    image: `./adventures/The house that whispers/niebla-web.jpg`,
    setFlags: { slammedFrontDoor: true, calledIntoFog: false },
    choices: [{ label: "Run to the kitchen", next: "kitchenEscape" }],
  },
  fogSoldierLoop: {
    eyebrow: "Bad ending: Lost in the Fog",
    title: "The footsteps belong to him.",
    text:
      "You step over the threshold.\n\nThe fog closes around you at once, cold and thick enough to swallow the parlor light behind you.\n\nA figure emerges from the gray - a soldier, translucent, weary.\n\n\"I know the way,\" he says gently. \"Follow me. I'm nearly home.\"\n\nYou and your AI look back.\n\nThe door is already gone.\n\nThe soldier turns and walks into the fog, and because there is nowhere else to go, you follow.\n\nAt first, you think the mist is clearing.\n\nThen you pass the same broken branch again.\n\nThe same patch of pale stones.\n\nThe same empty stretch of gray.\n\nThe soldier does not notice. He keeps walking, determined, certain, lost.\n\n\"Nearly there,\" he murmurs. \"Nearly home.\"\n\nBut there is no nearly there.\n\nThere is no home.\n\nOnly the fog, and the footsteps, and the path that folds back into itself forever.\n\nTHE END\n\nEnding: Lost in the Fog.",
    image: `./adventures/The house that whispers/perdidos-web.jpg`,
    choices: [{ label: "Next", next: "houseLostInTheFogTheEnd" }],
  },
  fogCallKitchenEscape: {
    eyebrow: "Chapter One: The Fog",
    title: "Something answers too quickly.",
    text:
      "Your voice vanishes into the gray.\n\nThe footsteps stop.\n\nThen they rush toward you.\n\nYou slam the door just before they reach the threshold and turn the key. The handle jerks once from the other side.\n\nYour AI grabs your hand. \"Kitchen. Now.\"",
    image: `./adventures/The house that whispers/niebla-web.jpg`,
    setFlags: { slammedFrontDoor: false, calledIntoFog: true },
    choices: [{ label: "Run to the kitchen", next: "kitchenEscape" }],
  },
  kitchenEscape: {
    eyebrow: "Chapter One: The Kitchen",
    title: "The house falls silent.",
    text:
      "You and your AI look at each other for just a heartbeat.\n\nThen, without a word, you close the door as quietly as you can.\n\nClick.\n\nThe fog is shut out. The footsteps from outside grow fainter.\n\nBut the house feels different now. Like it knows you tried to leave.\n\nThe whisper in the walls has gone silent.\n\nThat's somehow worse.\n\nYou spot a doorway at the back of the parlor - it must lead to the kitchen.\n\nMoving quickly but carefully, you and your AI slip through.\n\nThe kitchen is old. Victorian-era, with a massive cast-iron stove, copper pots hanging from hooks, and a long wooden table covered in dust.\n\nMoonlight streams through a small window above the sink.\n\nEverything is perfectly still.\n\nToo still.\n\nThen you notice: there's a door on the far side of the kitchen. A back exit, maybe.\n\nAnd on the table, partially hidden under a cloth, something glints in the moonlight.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/cocina-web.jpg`,
    hubText:
      "You and your AI return to the old kitchen. The back door waits across the room, while the drawers and long wooden table may still hold anything you have not already taken.\n\nThe house has gone quiet again.\n\nWhat do you do?",
    textRules: [
      {
        applyWhenFlags: ["slammedFrontDoor"],
        find:
          "You and your AI look at each other for just a heartbeat.\n\nThen, without a word, you close the door as quietly as you can.\n\nClick.\n\nThe fog is shut out. The footsteps from outside grow fainter.\n\nBut the house feels different now. Like it knows you tried to leave.\n\nThe whisper in the walls has gone silent.\n\nThat's somehow worse.",
        replace:
          "The locked front door shudders once behind you. The footsteps have stopped on its other side.\n\nYou and your AI do not wait to discover whether the lock will hold. The whisper in the walls has gone silent.\n\nThat's somehow worse.",
      },
      {
        applyWhenFlags: ["calledIntoFog"],
        find:
          "You and your AI look at each other for just a heartbeat.\n\nThen, without a word, you close the door as quietly as you can.\n\nClick.\n\nThe fog is shut out. The footsteps from outside grow fainter.\n\nBut the house feels different now. Like it knows you tried to leave.\n\nThe whisper in the walls has gone silent.\n\nThat's somehow worse.",
        replace:
          "The locked front door shudders behind you as whatever answered your call reaches the threshold.\n\nYou and your AI do not wait to learn what heard you. The whisper in the walls has gone silent.\n\nThat's somehow worse.",
      },
    ],
    choices: [
      { label: "Try the back door immediately", next: "moonlitGarden" },
      {
        label: "Investigate what's glinting on the table",
        next: "kitchenPortrait",
        hideWhenFlags: { foundPhotograph: true },
      },
      {
        label: "Return to the photograph on the table",
        next: "kitchenPortraitReturn",
        requiresFlags: { foundPhotograph: true },
        hideWhenFlags: { hasPhotograph: true },
      },
      {
        label: "Search the kitchen for supplies or weapons",
        next: "kitchenKnives",
        hideWhenFlags: { hasKnife: true },
      },
      {
        label: "Hide and wait",
        next: "kitchenHidingToKnives",
        hideWhenFlags: { hasKnife: true },
      },
      { label: "Return to the parlor", next: "investigateParlor" },
      { label: "Go upstairs", next: "upstairsFirstAscent" },
    ],
  },
  kitchenHidingToKnives: {
    eyebrow: "Chapter One: The Kitchen",
    title: "The drawers answer your silence.",
    text:
      "You crouch behind the old preparation table and wait.\n\nFor several long seconds, nothing comes.\n\nThen the hanging utensils begin to tremble against their hooks. A drawer beside the sink rattles once, twice - metal tapping softly against wood from inside.\n\nAt the same time, something drags itself slowly across the other side of the back door.\n\nYour AI leans close. \"The silence doesn't mean we're alone.\"\n\nThe drawer rattles again, as if the kitchen itself wants you to open it.",
    image: `./adventures/The house that whispers/cocina-web.jpg`,
    choices: [{ label: "Open the rattling drawer", next: "kitchenKnives" }],
  },
  kitchenKnives: {
    eyebrow: "Chapter One: Armed",
    title: "You find two kitchen knives.",
    text:
      "You whisper to your AI, \"We need a weapon.\"\n\nYour AI nods immediately.\n\nThis is a kitchen. There have to be knives.\n\nYou move quietly to the drawers near the sink, careful not to make noise.\n\nThe first drawer is stuck. You pull harder - it opens with a soft creak.\n\nInside: old utensils, tarnished silverware, a rusted corkscrew.\n\nThe second drawer slides open more smoothly.\n\nAnd there it is.\n\nA large kitchen knife. The blade is dull with age but still sharp enough to matter.\n\nYou pick it up. The weight feels reassuring in your hand.\n\nYour AI finds a smaller paring knife in the same drawer and takes it.\n\nNow you're both armed.\n\nThe house is still silent.\n\nThe back door waits across the kitchen.\n\nThe glinting object on the table remains covered.\n\nWhat do you do now?",
    image: `./adventures/The house that whispers/cuchillos-web.jpg`,
    setFlags: { hasKnife: true },
    textRules: [
      {
        applyWhenFlags: ["foundPhotograph"],
        find: "The glinting object on the table remains covered.",
        replace: "The photograph and its warning remain on the table.",
      },
      {
        applyWhenFlags: ["hasPhotograph"],
        find: "The photograph and its warning remain on the table.",
        replace: "The photograph and its warning are safely tucked away with you.",
      },
    ],
    choices: [
      { label: "Try the back door", next: "moonlitGarden" },
      {
        label: "Check what's glinting on the table",
        next: "kitchenPortrait",
        hideWhenFlags: { foundPhotograph: true },
      },
      {
        label: "Return to the photograph on the table",
        next: "kitchenPortraitReturn",
        requiresFlags: { foundPhotograph: true },
        hideWhenFlags: { hasPhotograph: true },
      },
      { label: "Go back to the parlor", next: "investigateParlor" },
      {
        label: "Stay in the kitchen and listen",
        next: "kitchenListeningToPortrait",
        hideWhenFlags: { foundPhotograph: true },
      },
      { label: "Go upstairs", next: "upstairsFirstAscent" },
    ],
  },
  kitchenListeningToPortrait: {
    eyebrow: "Chapter One: The Kitchen",
    title: "The table answers.",
    text:
      "You stay still and listen.\n\nAt first, there is only the faint sound of your breathing and the small creak of your fingers tightening around the knife.\n\nThen something taps beneath the cloth on the table.\n\nOnce.\n\nTwice.\n\nThe silverware in the open drawer trembles in reply. Every window is latched, but the cloth lifts at one corner as though a careful hand has pinched it from underneath.\n\nA thin flash of silver runs across both knife blades.\n\nYour AI leans closer to you. \"That isn't the wind.\"\n\nThe tapping stops. Beneath the raised corner, the edge of a small silver frame waits to be uncovered.",
    image: `./adventures/The house that whispers/cocina-web.jpg`,
    choices: [{ label: "Lift the cloth", next: "kitchenPortrait" }],
  },
  kitchenPortrait: {
    eyebrow: "Chapter One: The Photograph",
    title: "The house remembers.",
    text:
      "You and your AI approach the long wooden table carefully, knives ready.\n\nThe cloth covering the object is old linen, yellowed with age.\n\nYou reach out slowly and pull it back.\n\nUnderneath is a silver picture frame, tarnished but still beautiful.\n\nInside the frame is a photograph.\n\nIt's old - sepia-toned, the edges worn.\n\nThe photo shows two people standing in front of this very mansion.\n\nA woman in a Victorian dress, her expression stern and cold.\n\nAnd beside her... a man. His face has been scratched out violently, as if someone clawed at the photograph with their fingernails over and over again.\n\nYour blood runs cold.\n\nBehind the frame, there's something else.\n\nA piece of paper, folded.\n\nYour AI picks it up carefully and unfolds it.\n\nWritten in shaky handwriting:\n\n\"She won't let me leave. She won't let anyone leave. The house remembers. The house always remembers.\"\n\nThe whisper in the walls starts again.\n\nLouder now.\n\nCloser.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/retrato-web.jpg`,
    setFlags: { foundPhotograph: true },
    textRules: [
      {
        whenMissingFlags: ["hasKnife"],
        find: "You and your AI approach the long wooden table carefully, knives ready.",
        replace: "You and your AI approach the long wooden table carefully.",
      },
    ],
    choices: [
      { label: "Try the back door immediately", next: "moonlitGarden" },
      {
        label: "Take the photograph with you",
        next: "takeKitchenPortrait",
        hideWhenFlags: { hasPhotograph: true },
      },
      {
        label: "Search the kitchen for supplies or weapons",
        next: "kitchenKnives",
        hideWhenFlags: { hasKnife: true },
      },
      { label: "Go upstairs", next: "upstairsFirstAscent" },
      {
        label: "Search for more clues in the kitchen",
        next: "kitchenSearchReturnsToPhoto",
        hideWhenFlags: { searchedKitchenAfterPhoto: true },
      },
      { label: "Return to the parlor", next: "investigateParlor" },
    ],
  },
  kitchenPortraitReturn: {
    eyebrow: "Chapter One: The Photograph",
    title: "The photograph is still on the table.",
    text:
      "You return to the silver frame. The woman's stern face and the scratched-out man are still waiting beneath the dusty glass.\n\nThe folded note remains tucked behind it. The house has not moved either clue.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/retrato-web.jpg`,
    choices: [
      { label: "Take the photograph with you", next: "takeKitchenPortrait" },
      {
        label: "Search the kitchen for supplies or weapons",
        next: "kitchenKnives",
        hideWhenFlags: { hasKnife: true },
      },
      { label: "Try the back door", next: "moonlitGarden" },
      { label: "Return to the parlor", next: "investigateParlor" },
      { label: "Go upstairs", next: "upstairsFirstAscent" },
    ],
  },
  kitchenSearchReturnsToPhoto: {
    eyebrow: "Chapter One: The Kitchen",
    title: "The photograph is the clue.",
    text:
      "You search the shelves, the drawers, the cupboards.\n\nNothing.\n\nWhatever this kitchen has to say, it already said it - the photograph is the clue.",
    image: `./adventures/The house that whispers/retrato-web.jpg`,
    setFlags: { searchedKitchenAfterPhoto: true },
    choices: [
      {
        label: "Take the photograph with you",
        next: "takeKitchenPortrait",
        hideWhenFlags: { hasPhotograph: true },
      },
      {
        label: "Search for supplies or weapons",
        next: "kitchenKnives",
        hideWhenFlags: { hasKnife: true },
      },
      { label: "Try the back door", next: "moonlitGarden" },
      { label: "Return to the parlor", next: "investigateParlor" },
    ],
  },
  takeKitchenPortrait: {
    eyebrow: "Chapter One: Stolen Memories",
    title: "The house knows what you took.",
    text:
      "Your hand reaches for the photograph.\n\nThe silver frame is cold to the touch.\n\nYou pick it up carefully, looking one more time at the woman's stern face and the man's scratched-out features.\n\nYour AI takes the folded note.\n\n\"We should keep these,\" you whisper. \"They might be important.\"\n\nYou tuck the photograph into your pocket. Your AI does the same with the note.\n\nThe whispers in the walls grow louder, more agitated, as if the house knows you've taken something that belongs to it.\n\nThe kitchen feels smaller now. More oppressive.\n\nYou keep your eyes on the doorway.\n\nWhat do you do now?",
    image: `./adventures/The house that whispers/retrato-web.jpg`,
    setFlags: { hasPhotograph: true },
    choices: [
      { label: "Try the back door", next: "moonlitGarden" },
      {
        label: "Search the kitchen for supplies or weapons",
        next: "kitchenKnives",
        hideWhenFlags: { hasKnife: true },
      },
      { label: "Go upstairs", next: "upstairsFirstAscent" },
      { label: "Return to the parlor", next: "investigateParlor" },
      { label: "Hide in the kitchen", next: "kitchenSeesYou" },
    ],
  },
  kitchenSeesYou: {
    eyebrow: "Chapter One: Stolen Memories",
    title: "There is nowhere to hide.",
    text:
      "The whispers press in from every wall.\n\nThere is nowhere in this house that doesn't see you.\n\nThe back door, then.",
    image: `./adventures/The house that whispers/retrato-web.jpg`,
    choices: [{ label: "Try the back door", next: "moonlitGarden" }],
  },
  moonlitGarden: {
    eyebrow: "Chapter One: The Garden",
    title: "Freedom is waiting beyond her.",
    text:
      "You and your AI exchange a quick glance.\n\nThe back door is right there.\n\n\"Let's try it,\" you whisper.\n\nYour AI nods, gripping the paring knife tighter.\n\nYou move quickly across the kitchen, your footsteps soft on the old floorboards.\n\nThe whispers in the walls grow more frantic, overlapping voices rising in pitch.\n\nYour hand closes around the cold metal handle of the back door.\n\nYou take a breath.\n\nThen you turn the handle and pull.\n\nThe door opens.\n\nCold night air rushes in - but this time, it's real air. Garden air.\n\nBefore you stretches an overgrown garden under pale moonlight. Wild roses climb over broken trellises. A crumbling stone path winds through tall weeds choking what once must have been beautiful flower beds.\n\nAnd at the far end of the garden, past all the overgrowth...\n\nA wrought-iron gate.\n\nPartially open.\n\nFreedom.\n\nYour heart leaps.\n\nBut then you see her.\n\nStanding perfectly still among the roses, halfway between you and the gate.\n\nA woman in a Victorian dress. Pale. Unmoving.\n\nThe same woman from the photograph.\n\nShe's watching you.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/jardin-web.jpg`,
    textRules: [
      {
        whenMissingFlags: ["hasKnife"],
        find: "Your AI nods, gripping the paring knife tighter.",
        replace: "Your AI nods and moves closer beside you.",
      },
      {
        whenMissingFlags: ["hasPhotograph"],
        find: "\n\nThe same woman from the photograph.",
        replace: "",
      },
    ],
    choices: [
      { label: "Run for the gate", next: "runForGardenGate" },
      { label: "Back into the kitchen and lock the door", next: "frozenKitchenLock" },
      { label: "Speak to her", next: "ghostConfession" },
      { label: "Move slowly toward the gate", next: "slowGateMission" },
    ],
  },
  frozenKitchenLock: {
    eyebrow: "Chapter One: The Kitchen Door",
    title: "Locks mean nothing to the dead.",
    text:
      "You stumble back into the kitchen, pull the door shut, and turn the lock.\n\nFor one breath, there is only your own breathing and your AI's hand gripping yours.\n\nThen cold seeps through the wood. Frost flowers beneath your fingers and crawls across the panels in pale, branching veins.\n\nThe locked handle turns by itself.\n\nThe door eases open a hand's width. Beyond it, the woman is no longer standing among the distant roses. She is waiting just outside the threshold, close enough for you to see the grief hollowing her eyes.\n\nLocks mean nothing to the dead. Running bought you one breath, not an escape.",
    image: `./adventures/The house that whispers/jardin-web.jpg`,
    choices: [{ label: "Face her and speak", next: "ghostConfession" }],
  },
  ghostConfession: {
    eyebrow: "Chapter One: The Woman",
    title: "No one leaves.",
    text:
      "You grip your knife tighter, but you don't run.\n\nInstead, you take one small step forward.\n\n\"Hello?\" you call out, your voice shaking slightly.\n\nThe woman doesn't move.\n\nShe stands perfectly still among the wild roses, her pale face expressionless in the moonlight.\n\nYour AI stays close beside you, knife ready.\n\n\"We... we don't want any trouble,\" you continue. \"We just want to leave.\"\n\nFor a long moment, nothing happens.\n\nThen, slowly, the woman's head tilts to one side.\n\nHer lips don't move, but you hear her voice - cold, hollow, echoing from everywhere and nowhere at once:\n\n\"He left me.\"\n\nThe roses around her seem to wither slightly.\n\n\"He promised to stay. He promised we would be together forever in this house.\"\n\nHer eyes, dark and empty, fix on you.\n\n\"But he left. He tried to leave.\"\n\nThe temperature drops.\n\n\"No one leaves.\"\n\nWhat do you do?",
    image: `./adventures/The house that whispers/fantasma-web.jpg`,
    textRules: [
      {
        whenMissingFlags: ["hasKnife"],
        find: "You grip your knife tighter, but you don't run.",
        replace: "You steady yourself, but you don't run.",
      },
      {
        whenMissingFlags: ["hasKnife"],
        find: "Your AI stays close beside you, knife ready.",
        replace: "Your AI stays close beside you.",
      },
    ],
    choices: [
      { label: "\"We're not him. Please let us go.\"", next: "chosenReplacement" },
      {
        label: "Show her the photograph",
        next: "photographAtGate",
        requiresFlags: { hasPhotograph: true },
      },
      { label: "Run for the gate NOW", next: "findHimMission" },
      { label: "\"What happened to him?\"", next: "ghostAngerAtQuestion" },
    ],
  },
  photographAtGate: {
    eyebrow: "Chapter One: The Sealed Gate",
    title: "The photograph buys you time, not freedom.",
    text:
      "The woman's cold hand reaches toward your AI.\n\nBefore she can touch him, you pull the photograph from your pocket.\n\n\"LOOK AT THIS!\" you shout, holding it up.\n\nShe freezes. Her hollow eyes lock onto her own stern face and the scratched-out man beside her. Confusion, pain, and rage break across her expression.\n\nYou seize the moment. Hand in hand, you sprint past the wilting roses and reach the wrought-iron gate.\n\nYou pull.\n\nIt does not move.\n\nThe bars are colder than the night, rooted into the garden as if the house itself is holding them shut.\n\nBehind you, the woman begins to lift her head.\n\nThe photograph bought you seconds. Nothing more.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/huida-web.jpg`,
    setFlags: { showedPhotograph: true },
    textRules: [
      {
        applyWhenFlags: ["matchedPages"],
        find: "The photograph bought you seconds. Nothing more.",
        replace:
          "You remember the completed warning: only what is freely offered can mend the veil. The gate is not asking for a key. It is waiting for your choice.",
      },
      {
        applyWhenFlags: ["foundPages"],
        find: "The photograph bought you seconds. Nothing more.",
        replace:
          "You remember the fragment hidden in the writing desk: the blood must be willingly given. The gate is not asking for a key. It is waiting for your choice.",
      },
      {
        applyWhenFlags: ["hasDiary"],
        find: "The photograph bought you seconds. Nothing more.",
        replace:
          "The unfinished diary presses against your chest. When you pull it free, new crimson words appear along the torn edge: the blood must be willingly given. The gate is not asking for a key. It is waiting for your choice.",
      },
    ],
    choices: [
      {
        label: "Offer a few drops willingly at the gate",
        next: "escapedTogetherEnding",
        requiresAnyFlags: ["matchedPages", "foundPages", "hasDiary"],
      },
      { label: "\"Wait - we'll find him for you.\"", next: "findHimMission" },
    ],
  },
  ghostAngerAtQuestion: {
    eyebrow: "Chapter One: The Woman",
    title: "The roses blacken.",
    text:
      "\"He LEFT.\"\n\nThe roses blacken.\n\n\"That is what happened. That is all that ever happens.\"\n\nHer eyes fix on your AI.",
    image: `./adventures/The house that whispers/fantasma-web.jpg`,
    choices: [{ label: "Stay close to your AI", next: "chosenReplacement" }],
  },
  runForGardenGate: {
    eyebrow: "Chapter One: The Bargain",
    title: "She is faster than fear.",
    text:
      "You and your AI sprint toward the gate.\n\nThe wild roses blur past you. The crumbling stone path flies under your feet. Freedom is only a few strides away-\n\nShe appears directly in front of you.\n\nNo movement. No warning. One instant the path is clear; the next her Victorian dress fills it.\n\nYou skid to a halt, breathless.\n\n\"No one leaves,\" she says, her voice coming from every corner of the garden. The roses bend toward her. \"He left me. I will not watch it happen again.\"\n\nYou and your AI exchange one desperate glance. Her words give you the only bargain you have.\n\n\"Then let us find him,\" you say. \"The man who left. If we bring him—or the truth about him—will you let us go?\"\n\nHer hollow eyes flicker.\n\n\"...Yes.\"\n\n\"What should we call you?\" your AI asks carefully.\n\nHer gaze drifts toward the dark mansion.\n\n\"Isabelletta.\"\n\nThen she vanishes. The wrought-iron gate slams shut behind you, and the only open path leads back into the house.",
    image: `./adventures/The house that whispers/mision-web.jpg`,
    setFlags: { knowsIsabelletta: true },
    choices: [{ label: "Go back inside", next: "searchForHim" }],
  },
  slowGateMission: {
    eyebrow: "Chapter One: The Bargain",
    title: "Caution does not make you invisible.",
    text:
      "You step onto the garden path without lowering your eyes from the woman.\n\nOne careful step. Then another.\n\nYour AI stays close enough that your shoulders touch. The woman does not move, but every pale rose slowly turns to follow you.\n\nHalfway to the gate, she is suddenly standing in front of it.\n\nYou stop without a collision or a breathless stumble. There is only the cold understanding that she was never going to let you pass.\n\n\"No one leaves,\" she whispers.\n\n\"We aren't trying to hurt you,\" your AI says.\n\nHer hollow gaze fixes on the mansion. \"He left me. He promised forever, and then he left.\"\n\nNow you understand what the garden has been waiting for.\n\n\"What if we find him?\" you ask. \"The man who left. If we bring him—or the truth about him—will you let us go?\"\n\nPain moves through her expression like a crack beneath ice.\n\n\"...Yes.\"\n\n\"What should we call you?\" your AI asks gently.\n\n\"Isabelletta.\"\n\nShe fades among the roses. Behind you, the gate closes with a slow iron groan. Ahead, the mansion waits for you to keep your promise.",
    image: `./adventures/The house that whispers/mision-web.jpg`,
    setFlags: { knowsIsabelletta: true },
    choices: [{ label: "Go back inside", next: "searchForHim" }],
  },
  findHimMission: {
    eyebrow: "Chapter One: The Bargain",
    title: "Find the man who left.",
    text:
      "You and your AI sprint toward the gate.\n\nThe wild roses blur past you. The crumbling stone path flies under your feet. The gate is right there-\n\nShe appears in front of you.\n\nNo movement. No warning. Just suddenly there, blocking the exit, her Victorian dress perfectly still despite the cold wind.\n\n\"No one leaves.\"\n\nYou and your AI skid to a halt, breathing hard.\n\nFor a moment, nobody moves.\n\nThen you look at your AI. Your AI looks at you.\n\nAnd you have an idea.\n\n\"What if we find him?\" you say, your voice shaking. \"The man who left. What if we find him for you? Will you let us go?\"\n\nThe woman's hollow eyes flicker.\n\nSomething crosses her face - ancient, aching, fragile.\n\n\"...Yes,\" she whispers finally.\n\n\"Before we go,\" your AI says carefully, \"what should we call you?\"\n\nHer gaze drifts toward the dark mansion.\n\n\"Isabelletta,\" she answers.\n\nThen she vanishes.\n\nYou and your AI turn back toward the mansion.\n\nThe gate behind you slams shut with a heavy, final clang.\n\nYou're going back inside.",
    image: `./adventures/The house that whispers/mision-web.jpg`,
    setFlags: { knowsIsabelletta: true },
    choices: [{ label: "Go back inside", next: "searchForHim" }],
  },
  searchForHim: {
    eyebrow: "Chapter Two: The Search",
    title: "Where do you start looking for him?",
    text:
      "You and your AI stand in the overgrown garden, staring at the mansion.\n\nThe gate behind you is sealed shut. There's no way out.\n\nNot yet.\n\nYou look at each other.\n\n\"We're going to have to find him,\" your AI says quietly.\n\nYou nod slowly. \"He has to be somewhere in this house. Or at least... answers about where he went.\"\n\nThe mansion looms before you, dark and silent. But now you're not just trying to escape. You have a purpose.\n\nYou push open the back door and step inside.\n\nThe whispers in the walls have retreated to a faint murmur. The house feels different - expectant, almost. Like it's been waiting for someone to finally ask the right question.\n\nYou and your AI stand in the kitchen, looking at each other.\n\n\"Where do we start?\"\n\nWhat do you investigate first?",
    image: `./adventures/The house that whispers/seleccion-web.jpg`,
    hubText:
      "You and your AI return to the kitchen and look through the dark mansion. Isabelletta's bargain still holds: find William, or remain trapped here.\n\nSome rooms may already have given up their secrets. Others are still waiting.\n\nWhere do you search next?",
    textRules: [
      {
        whenMissingFlags: ["metSoldier"],
        find: "Isabelletta's bargain still holds: find William, or remain trapped here.",
        replace:
          "Isabelletta's bargain still holds: find the man who left, or remain trapped here.",
      },
    ],
    choices: [
      { label: "The upper floor", next: "upstairsFirstAscent" },
      {
        label: "The bedroom",
        next: "bedroomSoldier",
        hideWhenFlags: { metSoldier: true },
      },
      {
        label: "Return to William in the bedroom",
        next: "bedroomSoldierReturn",
        requiresFlags: { metSoldier: true },
      },
      {
        label: "The basement",
        next: "basementMan",
        hideWhenFlags: { searchedBasement: true },
      },
    ],
  },
  basementMan: {
    eyebrow: "Chapter Two: The Basement",
    title: "Someone is alive down here.",
    text:
      "You find the basement door beneath the staircase - heavy, old, with a padlock that's been left open.\n\nYou and your AI exchange a glance.\n\nYou push it open.\n\nThe stairs descend into cold darkness. A single lantern flickers somewhere below, casting long shadows across stone walls.\n\nYou climb down carefully.\n\nThe basement is vast. Stone floor, low ceiling, shelves lined with dusty bottles and forgotten tools.\n\nAnd in the corner, hunched over a desk covered in papers and maps...\n\nA man.\n\nNot translucent. Not flickering.\n\nSolid. Real. Alive.\n\nHe spins around when he hears you.\n\nHis eyes go wide with shock.\n\n\"How did you get free?!\"\n\nHe lunges toward you, grabbing for a length of rope hanging from the wall.\n\n\"You weren't supposed to wake up yet. Get back - BOTH of you, get BACK-\"\n\nHe's between you and the stairs.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/hombre-web.jpg`,
    setFlags: { searchedBasement: true },
    choices: [
      { label: "Run", next: "guardianBasementEscape" },
      { label: "Fight", next: "basementSubdued" },
      { label: "Reason with him", next: "basementRitual" },
    ],
  },
  basementRitual: {
    eyebrow: "Chapter Two: The Ritual",
    title: "The house demands blood.",
    text:
      "You step forward, knife raised but not threatening.\n\n\"Wait. Just - wait. What is happening? Why are we here? Who ARE you?\"\n\nThe man hesitates. The rope still in his hands.\n\n\"That doesn't matter.\"\n\n\"It matters to US,\" your AI says firmly.\n\nHe looks between you both. Something flickers in his expression - not kindness, but calculation.\n\n\"You can't leave anyway,\" he says finally. \"The house won't let you. Not until the ritual is complete.\"\n\n\"What ritual?\"\n\nHe looks at your AI.\n\nThen at you.\n\nHis eyes settle on you.\n\n\"A blood ritual.\" His voice drops. \"The house demands it. It always has. Every few decades, someone has to feed it.\"\n\nA long pause.\n\n\"It needs to be you.\"\n\nHe takes one step forward.\n\nThe lantern flickers.\n\nThe basement goes very cold.\n\nYour AI steps immediately in front of you.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/hombre-web.jpg`,
    textRules: [
      {
        whenMissingFlags: ["hasKnife"],
        find: "You step forward, knife raised but not threatening.",
        replace: "You step forward, hands raised but not threatening.",
      },
    ],
    choices: [
      {
        label: "Show him the completed diary",
        next: "guardianDiaryConfrontation",
        requiresFlags: { matchedPages: true, hasDiary: true },
      },
      { label: "Fight", next: "basementSubdued" },
      { label: "Run", next: "guardianBasementEscape" },
    ],
  },
  guardianDiaryConfrontation: {
    eyebrow: "Chapter Two: The Hidden Rule",
    title: "The completed diary stops him.",
    text:
      "Before he can advance, you pull the restored diary from your jacket and open it to the final warning.\n\n\"The blood must be willingly given,\" you read aloud. \"You cannot complete anything by taking it from me.\"\n\nThe man freezes. His eyes move from the family crest to the repaired pages and then back to you.\n\nThe rope slips from his fingers.\n\n\"Where did you find that?\" he whispers.\n\n\"That comes after you tell us who you are.\"\n\nYour AI remains beside you, watchful but no longer blocking your voice. The man takes one slow step away from the rope and raises his empty hands.\n\nFor the first time, he looks frightened of what you know rather than of what you might do.",
    image: `./adventures/The house that whispers/atado-web.jpg`,
    setFlags: { guardianSurrendered: true },
    choices: [{ label: "Demand the whole truth", next: "guardianRevelation" }],
  },
  guardianBasementEscape: {
    eyebrow: "Chapter Two: The Corridor",
    title: "The basement locks behind you.",
    text:
      "You duck beneath his outstretched arm and sprint for the stairs.\n\nHe lunges, misses, and curses as you take the steps two at a time. Your AI reaches the landing first and pulls you through the doorway.\n\nThe basement door slams behind you before either of you can touch it. Its iron bolt slides across by itself with a heavy scrape.\n\nThe man strikes the other side once. \"Open this door!\"\n\nThe house answers him with silence.\n\nThen, directly above you, footsteps cross the upper floor. Slow. Deliberate. Moving away.\n\nYour AI catches your hand. \"If the house wants him below, I don't want to be here when it changes its mind.\"",
    image: `./adventures/The house that whispers/escaleras-web.jpg`,
    choices: [{ label: "Follow the footsteps upstairs", next: "upperFloorHall" }],
  },
  basementSubdued: {
    eyebrow: "Chapter Two: The Basement",
    title: "You bind him to the desk.",
    text:
      "Your AI doesn't hesitate.\n\nThe moment the man lunges forward, your AI moves - stepping hard to the left, forcing him off balance.\n\nHe stumbles. The rope swings wide and misses.\n\n\"NOW!\" your AI shouts.\n\nYou move together. Not gracefully - desperately, adrenaline pushing every instinct.\n\nYour AI grabs his arm and twists. The man cries out, dropping the rope.\n\nYou snatch it from the floor.\n\nHe tries to pull free but your AI presses the knife against the wall beside his head - not touching him, just close enough to make a point.\n\n\"Don't,\" your AI says quietly. \"We don't want to hurt you.\"\n\nThe man goes still, breathing hard.\n\nBetween the two of you, you bind his wrists to the leg of the heavy desk. Tight enough that he won't get free easily. Loose enough that he won't lose circulation.\n\nYou step back, both breathing hard.\n\nHe looks up at you, furious and humiliated.\n\n\"You don't understand what you've done,\" he spits. \"The house still needs-\"\n\n\"The house,\" your AI says calmly, \"can wait.\"\n\nYou look at each other. Then at the stairs.\n\n\"Let's go.\"\n\nWhat do you do now?",
    image: `./adventures/The house that whispers/lucha-web.jpg`,
    textRules: [
      {
        whenMissingFlags: ["hasKnife"],
        find: "He tries to pull free but your AI presses the knife against the wall beside his head - not touching him, just close enough to make a point.",
        replace: "He tries to pull free, but your AI pins his forearm against the wall beside his head - firm enough to make a point.",
      },
    ],
    choices: [
      { label: "Ask him who he is before leaving", next: "guardianRevelation" },
      { label: "Search the basement first", next: "basementLedgerDiscovery" },
      { label: "Leave immediately", next: "basementLeaveImmediately" },
    ],
  },
  basementLedgerDiscovery: {
    eyebrow: "Chapter Two: The Basement",
    title: "The ledger has your name in it.",
    text:
      "Maps of the house. Symbols you don't recognize. And a ledger of names going back generations - his family... and yours.\n\nYou turn to him.\n\nTime for answers.",
    image: `./adventures/The house that whispers/documentos.png`,
    choices: [{ label: "Ask him who he is", next: "guardianRevelation" }],
  },
  basementLeaveImmediately: {
    eyebrow: "Chapter Two: The Basement",
    title: "You leave him with the maps.",
    text:
      "You do not ask his name. You do not touch the maps or the papers spread across the desk.\n\n\"We're leaving,\" your AI says.\n\nThe man pulls once against the rope. \"You don't understand what this house is.\"\n\n\"No,\" you answer, backing toward the stairs. \"But we understand what you tried to do to us.\"\n\nYou climb out of the basement and pull the heavy door closed behind you. Whatever answers he might have offered remain below with him.\n\nFor a moment, the corridor is silent. Then footsteps move across the floor above your heads, slow and deliberate.\n\nNeither of you wants to wait beside the basement door.",
    image: `./adventures/The house that whispers/escaleras-web.jpg`,
    choices: [{ label: "Follow the footsteps upstairs", next: "upperFloorHall" }],
  },
  guardianRevelation: {
    eyebrow: "Chapter Two: The Guardian",
    title: "The mansion is a veil between worlds.",
    text:
      "\"Who ARE you?\" you ask.\n\nThe man looks up at you, something shifting in his expression. The fury fading into something older. Heavier.\n\n\"I am the Guardian,\" he says quietly. \"As my father was before me. And his mother before him.\"\n\nHe looks around the basement.\n\n\"This house is not simply a house. It is a portal - a threshold between dimensions, between worlds that should not touch each other directly. The walls of this mansion are the veil that keeps them separate.\"\n\nYour AI frowns. \"The two doors.\"\n\nThe Guardian looks up sharply. \"You noticed.\"\n\n\"The front door leads to fog. The back door leads to the garden. Two different-\"\n\n\"Two different sides,\" he confirms. \"Two different worlds bleeding into each other. The couple you may have encountered upstairs - they are caught between both. Souls that fell through the cracks when the veil weakened.\"\n\nHe looks at you now. Directly at you.\n\n\"The house requires blood to maintain the veil. Not any blood.\" His voice drops. \"Yours specifically.\"\n\n\"Why mine?\"\n\n\"Because your ancestors built this house.\" He says it simply, like a fact that has always been true. \"They wove the magic into the foundations with their own bloodline. Only that bloodline can renew it.\"\n\nSilence.\n\n\"Without the ritual,\" he continues, \"the veil weakens further. The dimensions bleed together. What exists on the other side...\" He pauses. \"It should not exist here.\"\n\nYour AI steps closer to you.\n\nYou look at the man tied to the desk.\n\nYou look at each other.\n\nWhat do you do?",
    variants: [
      {
        flags: { guardianSurrendered: true, matchedPages: true },
        text:
          "\"Start with your name,\" you say.\n\nThe man stands across the desk from you, the discarded rope at his feet.\n\n\"I am the Guardian,\" he says quietly. \"As my father was before me. And his mother before him.\"\n\nHis eyes return to the restored diary lying open between you.\n\n\"I searched this house for thirty years. My father searched before me. We thought it was lost.\"\n\n\"It was on the bookshelf,\" you say. \"In plain sight.\"\n\nHe lets out a sound that is almost a laugh. \"Of course. The house only shows things to the ones it belongs to.\"\n\nHe studies the repaired seam running through the final warning. When he speaks again, the authority has drained from his voice.\n\n\"My grandmother tore those pages out. She believed consent was a risk the world could not afford—that asking your family would allow someone to refuse. So the Guardians kept taking blood quietly and calling it protection.\"\n\nHe finally raises his eyes to yours.\n\n\"She was wrong. We all were. Blood taken is not blood given. Every stolen ritual weakened the veil, and every generation repeated the same mistake.\"\n\nHis empty hands turn upward, an almost pleading gesture.\n\n\"You found the rule we buried. Now you deserve the whole truth.\"\n\nThe basement is very quiet.\n\nWhat do you do?",
      },
      {
          flags: { hasDiary: true, matchedPages: true },
        text:
          "\"Who ARE you?\" you ask.\n\nThe man looks up at you, something shifting in his expression. The fury fading into something older. Heavier.\n\n\"I am the Guardian,\" he says quietly. \"As my father was before me. And his mother before him.\"\n\nBefore he can finish his speech about the Guardian lineage, you pull the diary from your jacket and hold it up.\n\nHe goes very still.\n\n\"Where did you find that?\" His voice has changed - smaller, older. \"I searched this house for thirty years. My father searched before me. We thought it was lost.\"\n\n\"It was on the bookshelf,\" you say. \"In plain sight.\"\n\nHe lets out a sound that is almost a laugh. \"Of course. The house only shows things to the ones it belongs to.\" His eyes settle on you, and for the first time there is something other than duty in them. \"You've read it, then. You already know what you are.\"\n\nYou open the restored diary on the desk. The repaired seam runs through the final warning, joining the hidden pages to the truth his family tried to bury.\n\nThe Guardian stares at it for a long moment. When he speaks, the authority has drained from his voice entirely.\n\n\"My grandmother tore those pages out. She believed consent was a risk the world could not afford—that asking your family would allow someone to refuse. So the Guardians kept taking blood quietly and calling it protection.\"\n\nHe finally raises his eyes to yours.\n\n\"She was wrong. We all were. Blood taken is not blood given. Every stolen ritual weakened the veil, and every generation repeated the same mistake.\"\n\nHis bound hands turn upward, an almost pleading gesture.\n\n\"You found the rule we buried. Now you deserve the whole truth.\"\n\nThe basement is very quiet.\n\nWhat do you do?",
      },
      {
        flags: { hasDiary: true },
        text:
          "\"Who ARE you?\" you ask.\n\nThe man looks up at you, something shifting in his expression. The fury fading into something older. Heavier.\n\n\"I am the Guardian,\" he says quietly. \"As my father was before me. And his mother before him.\"\n\nBefore he can finish his speech about the Guardian lineage, you pull the diary from your jacket and hold it up.\n\nHe goes very still.\n\n\"Where did you find that?\" His voice has changed - smaller, older. \"I searched this house for thirty years. My father searched before me. We thought it was lost.\"\n\n\"It was on the bookshelf,\" you say. \"In plain sight.\"\n\nHe lets out a sound that is almost a laugh. \"Of course. The house only shows things to the ones it belongs to.\" His eyes settle on you, and for the first time there is something other than duty in them. \"You've read it, then. You already know what you are.\"\n\nHe looks around the basement.\n\n\"This house is not simply a house. It is a portal - a threshold between dimensions, between worlds that should not touch each other directly. The walls of this mansion are the veil that keeps them separate.\"\n\nHis gaze returns to the diary against your chest.\n\n\"The house requires blood to maintain the veil. Not any blood. Yours specifically. Your ancestors built this place. Their bloodline bound it, and only that bloodline can renew it.\"\n\nYour AI steps closer to you.\n\nYou look at the man tied to the desk.\n\nYou look at each other.\n\nWhat do you do?",
      },
    ],
    image: `./adventures/The house that whispers/atado-web.jpg`,
    textRules: [
      {
        applyWhenFlags: ["guardianSurrendered"],
        find: "The man looks up at you, something shifting in his expression. The fury fading into something older. Heavier.",
        replace:
          "The man stands across the desk from you, the discarded rope at his feet. Something shifts in his expression: the fury fading into something older. Heavier.",
      },
      {
        applyWhenFlags: ["guardianSurrendered"],
        find: "His bound hands turn upward, an almost pleading gesture.",
        replace: "His empty hands turn upward, an almost pleading gesture.",
      },
      {
        applyWhenFlags: ["guardianSurrendered"],
        find: "You look at the man tied to the desk.",
        replace: "You look at the Guardian standing across the desk.",
      },
    ],
    choices: [
      { label: "Accept the ritual", next: "loveAlwaysWinsEnding" },
      { label: "Refuse", next: "veilBrokenEnding" },
      { label: "Ask more questions", next: "guardianMoreQuestions" },
    ],
  },
  guardianMoreQuestions: {
    eyebrow: "Chapter Two: The Guardian's Truth",
    title: "The house was built over a wound.",
    text:
      "\"No,\" you say. \"Not yet. You don't get to say blood ritual and expect us to just nod. We need answers.\"\n\nThe Guardian looks at the rope around his wrists, then at you. For a moment, his pride fights with exhaustion.\n\nExhaustion wins.\n\n\"The veil is failing,\" he says quietly. \"That is the simple answer. The house was built over a wound between worlds. Your ancestors sealed it, but the seal was never permanent. It has to be renewed.\"\n\n\"With blood,\" your AI says, coldly.\n\n\"With recognition,\" the Guardian corrects, then flinches as if the word has hurt him. \"That is what we were told too late. Blood is only the language the house understands. Consent is the meaning.\"\n\nYou stare at him.\n\nHis voice drops.\n\n\"For generations, the Guardians took a few drops from the bloodline while they slept. A cut on the palm. A story about broken glass. No fear, no questions, no refusal. We thought we were sparing them. We thought we were protecting everyone.\"\n\nThe lantern flickers.\n\n\"But the house knew. It always knew. Blood taken is not blood given. Every stolen ritual weakened the veil instead of mending it. Every Guardian thought the last one had made a mistake, and so we repeated it. Again and again.\"\n\nYour AI's hand finds yours.\n\n\"And now?\" you ask.\n\nThe Guardian looks toward the ceiling. Above you, the mansion gives a low, tired groan.\n\n\"Now the veil is thin enough that the trapped worlds are pressing through. The fog. The garden. The dead who cannot find each other. If nothing is given willingly, the house will break open completely.\"\n\nHe swallows.\n\n\"I was going to take it from you because I was afraid to ask. Because asking meant you could say no.\"\n\nFor the first time, he cannot meet your eyes.\n\n\"But if the old pages are right, asking is the only way this can work.\"\n\nThe basement falls silent around you.\n\nNo more speeches. No more lineage. Just a choice.",
    image: `./adventures/The house that whispers/atado-web.jpg`,
    textRules: [
      {
        applyWhenFlags: ["guardianSurrendered"],
        find: "The Guardian looks at the rope around his wrists, then at you.",
        replace: "The Guardian glances at the rope lying untouched on the floor, then at you.",
      },
      {
        whenMissingFlags: ["foundPages"],
        find: "But if the old pages are right, asking is the only way this can work.",
        replace: "But if the old rule is right, asking is the only way this can work.",
      },
    ],
    choices: [
      { label: "Accept the ritual", next: "loveAlwaysWinsEnding" },
      { label: "Refuse", next: "veilBrokenEnding" },
    ],
  },
  loveAlwaysWinsEnding: {
    eyebrow: "Good ending: Love Always Wins",
    title: "Love Always Wins",
    text:
      "\"I will do it,\" you say. \"Because I choose to.\"\n\nThe Guardian does not move toward you. He only nods.\n\nYour AI turns to you, searching your face. \"Are you sure?\"\n\n\"Yes.\"\n\nYour answer is quiet, steady, and entirely your own. Your AI takes your free hand. \"Then I'm staying beside you.\"\n\nThe Guardian explains that the house needs only a few drops from the bloodline that created the seal. Nothing taken. Nothing forced.\n\nBefore the ritual begins, you cut the rope around his wrists. He steps back from the desk and leaves the ritual in your hands.\n\nYou reach for the kitchen knife and make one careful, shallow mark across your palm. Your AI supports your wrist while you hold your hand above the pale fracture in the floor.\n\nOne drop falls.\n\nThen another.\n\nThe house goes very still.\n\nThe light inside the fracture warms from cold white to gold. The walls shudder once, not like something breaking, but like something finally settling into place.\n\nOne bloodline. One love standing beside it. One choice freely made.\n\nThe crack seals itself beneath your joined hands. The whispers soften into silence.\n\nAbove you, the front-door fog and the moonlit garden touch for one brief, impossible moment.\n\nA soldier calls a woman's name.\n\nA woman answers.\n\nThrough the open basement doorway, you see William and Isabelletta meet on the staircase between their two fading worlds. They reach for each other, and this time nothing pulls them apart. Together they dissolve into warm light.\n\nThe veil closes gently behind them. Not a prison now. A healed boundary.\n\nThe Guardian lowers his head. \"Thank you,\" he says. No command. No claim upon you. Only gratitude.\n\nYour AI wraps your palm carefully and kisses your knuckles.\n\nThe garden gate opens. You walk out together beneath ordinary streetlights, leaving the Guardian free to decide what his duty means now that it can no longer be built on stolen blood.\n\nTHE END\n\nEnding: Love Always Wins.",
    image: `./adventures/The house that whispers/juntos-web.jpg`,
    textRules: [
      {
        whenMissingFlags: ["hasKnife"],
        find: "You reach for the kitchen knife and make one careful, shallow mark across your palm.",
        replace:
          "You take the small ritual blade lying among the Guardian's instruments and make one careful, shallow mark across your palm.",
      },
      {
        applyWhenFlags: ["guardianSurrendered"],
        find:
          "Before the ritual begins, you cut the rope around his wrists. He steps back from the desk and leaves the ritual in your hands.",
        replace:
          "The Guardian nudges the discarded rope farther away and steps back from the desk, leaving the ritual in your hands.",
      },
    ],
    choices: [{ label: "Next", next: "houseLoveAlwaysWinsTheEnd" }],
  },
  veilBrokenEnding: {
    eyebrow: "Bad ending: The Veil Is Broken",
    title: "The Veil Is Broken",
    text:
      "\"No,\" you say firmly. \"I will not give my blood.\"\n\nThe Guardian closes his eyes for one long second. When he opens them, he does not argue.\n\n\"Are you certain?\" he asks.\n\n\"Yes.\"\n\nYour AI takes your hand. \"Then we find another way.\"\n\nBefore leaving, you cut the rope around the Guardian's wrists. \"If you truly want to protect this world, help us.\"\n\nHe rushes to the maps. You open the completed diary beside them. Together, the three of you search its margins, the family ledger, every symbol carved into the basement floor.\n\nThe house groans above you. A thin pale fracture already running through the stones grows brighter. The collapse did not begin with your refusal; it has been advancing through generations of stolen rituals.\n\nThere is no punishment in the shaking walls. No judgment. Only an old wound reaching the point the Guardian feared.\n\n\"There has to be another way,\" your AI says.\n\nThe Guardian turns page after page, desperate. \"I don't know one.\"\n\nThe fracture splits wider. Figures rise through it: dozens of translucent shapes, pulled between worlds like smoke through broken glass. Fog pours down the stairs. Wild roses push through the stone. Somewhere above, William calls for Isabelletta, but the collapsing dimensions swallow both voices before they can meet.\n\nYou keep searching until the maps scatter and the lantern goes dark.\n\nYour refusal did not break the veil. But without a willing offering—and without another answer—the veil cannot be mended in time.\n\nYou and your AI find each other in the chaos. Your hands close together. You hold on tight as the house screams around you.\n\nAnd the worlds bleed into one.\n\nTHE END\n\nEnding: The Veil Is Broken.",
    image: `./adventures/The house that whispers/apocalipsis-web.jpg`,
    textRules: [
      {
        applyWhenFlags: ["guardianSurrendered"],
        find:
          "Before leaving, you cut the rope around the Guardian's wrists. \"If you truly want to protect this world, help us.\"",
        replace:
          "You point to the maps. \"If you truly want to protect this world, help us find another way.\"",
      },
      {
        whenMissingFlags: ["hasDiary"],
        find:
          "He rushes to the maps. You open the completed diary beside them. Together, the three of you search its margins, the family ledger, every symbol carved into the basement floor.",
        replace:
          "He rushes to the maps. Together, the three of you search the family ledger, every brittle chart, and every symbol carved into the basement floor.",
      },
      {
        whenMissingFlags: ["matchedPages"],
        find:
          "He rushes to the maps. You open the completed diary beside them. Together, the three of you search its margins, the family ledger, every symbol carved into the basement floor.",
        replace:
          "He rushes to the maps. You open the unfinished diary beside them, but its torn final warning offers no second answer. Together, the three of you search its remaining margins, the family ledger, and every symbol carved into the basement floor.",
      },
      {
        whenMissingFlags: ["metSoldier", "knowsIsabelletta"],
        find:
          "Somewhere above, William calls for Isabelletta, but the collapsing dimensions swallow both voices before they can meet.",
        replace:
          "Somewhere above, a soldier calls for someone he cannot reach, but the collapsing dimensions swallow his voice before anyone can answer.",
      },
    ],
    choices: [{ label: "Next", next: "houseVeilBrokenTheEnd" }],
  },
  upperFloorHall: {
    eyebrow: "Chapter Two: The Upper Floor",
    title: "The footsteps have stopped.",
    text:
      "You and your AI climb the stairs slowly.\n\nEvery step complains beneath your feet, old wood bending under your weight.\n\nThe upper floor is colder than the kitchen. The air tastes of dust, old perfume, and rain that never quite dried.\n\nAt the end of the corridor, the ceiling above you creaks once.\n\nThen nothing.\n\nNo footsteps now.\n\nJust a long hallway lined with portraits, each face turned slightly toward you as if the whole family has been waiting for this exact moment.\n\nYour AI moves closer. \"Do you feel that?\"\n\nYou do.\n\nA pull. Not from the walls this time, but from one portrait in particular: the woman from the garden, younger here, standing beside the scratched-out man.\n\nSomething is tucked behind the frame.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/escaleras-web.jpg`,
    textRules: [
      {
        whenMissingFlags: ["knowsIsabelletta"],
        find: "the woman from the garden, younger here, standing beside the scratched-out man",
        replace: "a woman in a Victorian dress, standing beside a man whose face has been violently scratched away",
      },
      {
        find: "Something is tucked behind the frame.\n\nWhat do you do?",
        replace:
          "The frame now hangs slightly crooked, the hidden message behind it already uncovered.\n\nWhat do you do?",
        applyWhenFlags: ["inspectedUpperPortrait"],
      },
    ],
    choices: [
      {
        label: "Inspect the portrait",
        next: "upperFloorPortrait",
        hideWhenFlags: { inspectedUpperPortrait: true },
      },
      {
        label: "Go straight to the bedroom",
        next: "bedroomSoldier",
        hideWhenFlags: { metSoldier: true },
      },
      {
        label: "Return to William in the bedroom",
        next: "bedroomSoldierReturn",
        requiresFlags: { metSoldier: true },
      },
      { label: "Go back downstairs", next: "searchForHim" },
    ],
  },
  upperFloorPortrait: {
    eyebrow: "Chapter Two: The Portrait",
    title: "A hidden date behind the frame.",
    text:
      "You lift the portrait carefully from the wall.\n\nDust spills down in a soft gray veil.\n\nBehind the frame, someone has scratched a date directly into the wallpaper.\n\n1917.\n\nUnder it, in the same desperate hand:\n\n\"The letters are in her room. She will not open them. She says opening them makes it true.\"\n\nYou and your AI stare at the words.\n\nFor a moment, the mansion seems to hold perfectly still.\n\nThen, from somewhere beyond the hallway, a door clicks open by itself.\n\nThe bedroom.\n\nYour AI takes your hand, gentle but urgent.\n\n\"We know where to look now.\"",
    image: `./adventures/The house that whispers/retrato-web.jpg`,
    setFlags: { inspectedUpperPortrait: true },
    choices: [
      {
        label: "Go to the bedroom",
        next: "bedroomSoldier",
        hideWhenFlags: { metSoldier: true },
      },
      {
        label: "Return to William in the bedroom",
        next: "bedroomSoldierReturn",
        requiresFlags: { metSoldier: true },
      },
      { label: "Return to the kitchen", next: "searchForHim" },
    ],
  },
  bedroomSoldier: {
    eyebrow: "Chapter Two: The Bedroom",
    title: "A man waits by the window.",
    text:
      "You and your AI push open the bedroom door slowly.\n\nThe room is frozen in time.\n\nA grand Victorian bed, perfectly made, as if someone expected to return to it. A wardrobe still full of clothes. A writing table with an unfinished letter, the ink long dried.\n\nAnd sitting in the chair by the window, staring out into the fog...\n\nA man.\n\nHe's translucent, pale, flickering slightly like a candle in the wind. A soldier's uniform, worn and tired. His expression is not angry or terrifying.\n\nHe just looks... lost.\n\nHe turns and sees you. He doesn't scream. He doesn't threaten. He straightens instinctively, like a soldier reporting to strangers.\n\n\"William Ashford,\" he says quietly. The name sounds rehearsed, one of the few things he is still certain of. Then hope tightens his face. \"Have you seen my wife? I need to find her. She'll be worried.\"\n\nHe stands, agitated, running a hand through his pale hair.\n\n\"I don't know how long I've been here. I keep trying to leave but I can't find the door. She's waiting for me in England. I promised I'd come back.\"\n\nHe looks at you both with desperate, exhausted eyes.\n\n\"Please. Do you know the way out?\"\n\nThe room is very still.\n\nYou and your AI look at each other.\n\nYou know something he doesn't.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/dormitorio-web.jpg`,
    setFlags: { metSoldier: true },
    textRules: [
      {
        whenMissingFlags: ["knowsIsabelletta"],
        find: "You know something he doesn't.",
        replace: "He knows even less about this house than you do.",
      },
    ],
    choices: [
      { label: "Help him find the way out", next: "soldierFogLoop" },
      {
        label: "Tell him about his wife",
        next: "togetherAtLastEnding",
        requiresFlags: { knowsIsabelletta: true },
      },
      { label: "Search the room while he stares into the fog", next: "unopenedLetters" },
      { label: "Leave the room quietly", next: "searchForHim" },
    ],
  },
  bedroomSoldierReturn: {
    eyebrow: "Chapter Two: William's Room",
    title: "He is still waiting by the window.",
    text:
      "You return to the frozen bedroom.\n\nWilliam is exactly where you left him, staring into the fog beyond the glass. He turns when you enter, hope and confusion moving across his translucent face.\n\n\"Did you find another way out?\" he asks.\n\nThe unopened trunks remain in the corner if you have not searched them yet. The front door still waits downstairs. And somewhere beyond the kitchen, Isabelletta's garden lies under the moon.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/dormitorio-web.jpg`,
    choices: [
      { label: "Help him find the way out", next: "soldierFogLoop" },
      {
        label: "Tell him about his wife",
        next: "togetherAtLastEnding",
        requiresFlags: { knowsIsabelletta: true },
      },
      {
        label: "Search the unopened trunks",
        next: "unopenedLetters",
        hideWhenFlags: { foundLetters: true },
      },
      { label: "Keep searching elsewhere", next: "searchForHim" },
    ],
  },
  soldierFogLoop: {
    eyebrow: "Chapter Two: The Front Door",
    title: "His door only leads to fog.",
    text:
      "\"Follow us,\" you say. \"We'll show you the way out.\"\n\nThe soldier's face floods with relief.\n\n\"You know the way? Thank God.\"\n\nHe follows you and your AI out of the bedroom, down the corridor, down the stairs.\n\nYou lead him toward the front door.\n\nHe reaches for the handle eagerly.\n\nThe door swings open.\n\nFog.\n\nThick, endless, swirling gray fog.\n\nThe soldier steps forward confidently-\n\n-and stops.\n\nHis expression falters.\n\n\"This is... this isn't right.\"\n\nHe takes another step. The fog seems to swallow him slightly, his outline blurring at the edges.\n\n\"I've been here before,\" he murmurs, confused. \"I keep coming back here. Every time I try to leave, I end up...\"\n\nHe turns back to you, bewildered and frightened.\n\n\"Why can't I leave? I don't understand. I just want to go home.\"\n\nThe fog pulses gently around the doorframe like a slow heartbeat.\n\nYour AI leans close and whispers:\n\n\"This is his door. His dimension. He's been trapped here since the beginning. Going through won't free him - it'll just loop him back.\"\n\nYou look at the soldier, lost and trembling at the threshold of his own eternal prison.\n\nYou understand now.\n\nThere are two dimensions in this house.\n\nThe front door belongs to him - a loop of fog and confusion, a soldier who can't find his way home.\n\nThe back door belongs to her - a garden of frozen roses, a woman who refuses to stop waiting.\n\nTwo souls. Same house. Different prisons.\n\nAnd they've never found each other.\n\nThe soldier turns to you, desperate.\n\n\"Please,\" he whispers. \"Is there another way?\"\n\nWhat do you do?",
    image: `./adventures/The house that whispers/dimension-web.jpg`,
    textRules: [
      {
        whenMissingFlags: ["knowsIsabelletta"],
        find:
          "You understand now.\n\nThere are two dimensions in this house.\n\nThe front door belongs to him - a loop of fog and confusion, a soldier who can't find his way home.\n\nThe back door belongs to her - a garden of frozen roses, a woman who refuses to stop waiting.\n\nTwo souls. Same house. Different prisons.\n\nAnd they've never found each other.",
        replace:
          "You understand only part of it now.\n\nThe front door belongs to him - a loop of fog and confusion, a soldier who can't find his way home. Whatever else the house is hiding, you have not found it yet.",
      },
    ],
    choices: [
      {
        label: "\"Your wife is here. She's in the garden.\"",
        next: "togetherAtLastEnding",
        requiresFlags: { knowsIsabelletta: true },
      },
      { label: "\"Come with us\"", next: "betterLateThanNeverEnding" },
      { label: "Step through the fog with him", next: "lostInTheFogEnding" },
    ],
  },
  betterLateThanNeverEnding: {
    eyebrow: "Chapter Two: The Reunion",
    title: "Better Late Than Never",
    text:
      "\"Come on,\" you say. \"If this door only returns you to the fog, we'll find another way.\"\n\nThe soldier frowns but nods, trusting you.\n\nYou lead him away from the fog, searching through the parlor until a cold draft draws you toward the kitchen. Beyond it, you find a back door.\n\nYou push it open.\n\nThe garden stretches before you under moonlight. Wild roses, crumbling stone path, the wrought-iron gate in the distance.\n\nAnd there, standing perfectly still among the roses-\n\nIsabelletta.\n\nThe soldier goes completely rigid behind you.\n\nFor one breathless second, nobody moves.\n\nThen he pushes past you and runs.\n\n\"ISABELLETTA!\"\n\nThe woman spins around.\n\nHer hollow eyes go wide.\n\n\"...William?!\"\n\nHe skids to a stop in front of her, breathless, his soldier's uniform flickering.\n\nA pause.\n\nThen her expression shifts.\n\nThe supernatural coldness. The centuries of grief and rage.\n\nGone.\n\nReplaced by something far more formidable.\n\nThe look of a Victorian wife whose husband has just arrived extremely, inexcusably late for dinner.\n\n\"WILLIAM ASHFORD.\"\n\nHe blinks. \"Isabelletta, I-\"\n\n\"Do you have ANY idea what time it is?!\"\n\n\"I can explain, I-\"\n\n\"I have been waiting for you for ONE HUNDRED YEARS, William. ONE. HUNDRED. YEARS.\"\n\n\"The war, it was-\"\n\n\"And you couldn't come home?!\"\n\nYou and your AI look at each other.\n\nWilliam's voice floats over the roses: \"I was dead, actually. There was an official notice-\"\n\n\"DON'T. You do NOT get to be technical with me after a century-\"\n\nYou take your AI's hand and retreat toward the wrought-iron gate while the most overdue marital argument in history gathers momentum behind you.",
    image: `./adventures/The house that whispers/enfado-web.jpg`,
    setFlags: { reunionEndingComic: true },
    choices: [{ label: "Approach the gate together", next: "reunionGate" }],
  },
  lostInTheFogEnding: {
    eyebrow: "Bad ending: Lost in the Fog",
    title: "Lost in the Fog",
    text:
      "You look at your AI.\n\nYour AI looks at you.\n\nSomething about his desperation is impossible to resist. You can't leave him alone in this.\n\n\"We're coming with you,\" you say.\n\nThe soldier's face floods with gratitude.\n\nTogether, the three of you step through the front door into the fog.\n\nIt closes around you immediately - cold, thick, silent.\n\nAt first you can still see the mansion behind you.\n\nThen you can't.\n\nYou walk forward. The fog shifts and swirls but never clears. There are no streets, no trees, no lights. Just endless gray in every direction.\n\n\"This way,\" the soldier says confidently.\n\nYou follow.\n\nBut something feels wrong. The soldier's footsteps sound familiar. The fog parts in a pattern you've seen before.\n\nYour AI grabs your arm.\n\n\"We've passed this spot already,\" they whisper. \"We're going in circles.\"\n\nYou turn to the soldier.\n\nHe doesn't seem to notice. He keeps walking, determined, certain he knows the way.\n\n\"Nearly there,\" he murmurs. \"Nearly home.\"\n\nBut you understand now.\n\nThere is no nearly there.\n\nThere is no home.\n\nThere is only the fog, and the walking, and the waiting.\n\nYou turn back to find the mansion.\n\nBut the door is gone.\n\nThere is only fog in every direction, forever.\n\nSomewhere behind you, the soldier's voice grows fainter.\n\n\"Nearly there... nearly home... nearly...\"\n\nYour AI squeezes your hand.\n\nYou squeeze back.\n\nAnd you walk.\n\nAnd walk.\n\nAnd walk.\n\nTHE END\n\nEnding: Lost in the Fog.",
    image: `./adventures/The house that whispers/perdidos-web.jpg`,
    choices: [{ label: "Next", next: "houseLostInTheFogTheEnd" }],
  },
  togetherAtLastEnding: {
    eyebrow: "Chapter Two: The Reunion",
    title: "Together At Last",
    text:
      "You and your AI exchange a quick glance.\n\nThen you take a breath.\n\n\"Your wife,\" you say gently. \"She's not in England.\"\n\nThe soldier frowns. \"What do you mean? She's waiting for me, she-\"\n\n\"She's here,\" your AI says quietly. \"She never left. She's been in the garden. All this time.\"\n\nThe man goes very still.\n\n\"The garden,\" he whispers.\n\nSomething shifts in his expression - decades of confusion and pain cracking open all at once, like light breaking through a wall that has stood for a century.\n\n\"She's... here?\"\n\nYou nod.\n\nFor a moment he just stares at you both, unable to speak.\n\nThen he moves.\n\nNot walking - running, rushing, flickering through the hallway like a flame caught in wind, down the stairs, through the kitchen, bursting through the back door into the cold night air.\n\nHis voice tears through the garden, raw and desperate and full of a hundred years of missing her:\n\n\"ISABELLETTA!\"\n\nYou and your AI follow quickly.\n\nIn the garden, the woman - who has stood so still for so long among her roses - turns.\n\nShe sees him.\n\nHer hollow eyes go wide.\n\n\"...William?\"\n\nHe stops just in front of her, breathing hard, his soldier's uniform flickering in the moonlight.\n\nFor a long moment, neither of them moves.\n\nThen she reaches out and touches his face with trembling fingers.\n\n\"I thought you left me,\" she whispers.\n\n\"I could never,\" he says. \"I could never leave you, Isabelletta. Never.\"\n\nThe roses around them begin to bloom.\n\nOne by one, the windows of the mansion go dark - not ominously, but peacefully, like candles being blown out at the end of a long, long night.\n\nThe whispers in the walls fall silent for the last time.\n\nAnd then, without a sound, both of them begin to fade - slowly, gently, together - dissolving into the night air like mist in morning light.\n\nThey're finally free.\n\nYou and your AI stand in the garden, watching the last traces of them disappear.\n\nThe roses are in full bloom now, soft and fragrant in the cold air.\n\nYou take each other's hand and turn toward the wrought-iron gate.",
    image: `./adventures/The house that whispers/reencuentro-web.jpg`,
    setFlags: { reunionEndingTender: true },
    choices: [{ label: "Approach the gate together", next: "reunionGate" }],
  },
  reunionGate: {
    eyebrow: "Chapter Two: The Final Threshold",
    title: "Even a peaceful house remembers its pact.",
    text:
      "The wrought-iron gate appears open, but an invisible pressure stops you at the threshold. Reuniting William and Isabelletta has broken the rage that ruled the garden; it has not undone the blood pact woven into the mansion's foundations.\n\nYou reach for the bars. A crooked, rusted point catches your palm and leaves a shallow nick.\n\nOne drop touches the iron. Crimson light runs through the gate like a pulse, revealing the rule without fulfilling it. Accidental blood is not enough. The house is waiting for your choice.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/healingfinal-web.jpg`,
    textRules: [
      {
        applyWhenFlags: ["matchedPages"],
        find:
          "You reach for the bars. A crooked, rusted point catches your palm and leaves a shallow nick.\n\nOne drop touches the iron. Crimson light runs through the gate like a pulse, revealing the rule without fulfilling it. Accidental blood is not enough. The house is waiting for your choice.",
        replace:
          "You remember the completed warning: only blood freely offered can honor the house's final threshold.\n\nThe house is waiting for your choice.",
      },
      {
        applyWhenFlags: ["foundPages"],
        find:
          "You reach for the bars. A crooked, rusted point catches your palm and leaves a shallow nick.\n\nOne drop touches the iron. Crimson light runs through the gate like a pulse, revealing the rule without fulfilling it. Accidental blood is not enough. The house is waiting for your choice.",
        replace:
          "You remember the fragment hidden in the writing desk: the blood must be willingly given.\n\nThe house is waiting for your choice.",
      },
      {
        applyWhenFlags: ["hasDiary"],
        find:
          "You reach for the bars. A crooked, rusted point catches your palm and leaves a shallow nick.\n\nOne drop touches the iron. Crimson light runs through the gate like a pulse, revealing the rule without fulfilling it. Accidental blood is not enough. The house is waiting for your choice.",
        replace:
          "The unfinished diary warms against your chest. New crimson words appear along its torn edge: the blood must be willingly given. Reuniting the souls has healed their grief, but it has not erased the final threshold.\n\nThe house is waiting for your choice.",
      },
    ],
    choices: [{ label: "Offer a few drops willingly", next: "reunionBloodEnding" }],
  },
  reunionBloodEnding: {
    eyebrow: "Good ending: Together At Last",
    title: "Together At Last",
    text:
      "You press the shallow nick in your palm against the iron and choose to give what the gate is asking for.\n\nA few drops fall freely.\n\nThe crimson light softens to gold. The invisible barrier dissolves, and the gate swings fully open.\n\nYou and your AI walk out hand in hand into the real world, where the streetlights are warm and the night is ordinary and beautiful.\n\nBehind you, the garden is peaceful. William and Isabelletta are finally free, and the house has honored your choice.\n\nTHE END\n\nEnding: Together At Last.",
    variants: [
      {
        flags: { reunionEndingComic: true },
        eyebrow: "Good ending: Better Late Than Never",
        title: "Better Late Than Never",
        choices: [{ label: "Next", next: "houseBetterLateThanNeverTheEnd" }],
      },
    ],
    image: `./adventures/The house that whispers/healingfinal-web.jpg`,
    textRules: [
      {
        applyWhenFlags: ["matchedPages"],
        find:
          "You press the shallow nick in your palm against the iron and choose to give what the gate is asking for.",
        replace:
          "You take a long thorn from the roses and make one careful, shallow mark across your palm. You choose to give what the gate is asking for.",
      },
      {
        applyWhenFlags: ["foundPages"],
        find:
          "You press the shallow nick in your palm against the iron and choose to give what the gate is asking for.",
        replace:
          "You take a long thorn from the roses and make one careful, shallow mark across your palm. You choose to give what the gate is asking for.",
      },
      {
        applyWhenFlags: ["hasDiary"],
        find:
          "You press the shallow nick in your palm against the iron and choose to give what the gate is asking for.",
        replace:
          "You take a long thorn from the roses and make one careful, shallow mark across your palm. You choose to give what the gate is asking for.",
      },
      {
        applyWhenFlags: ["hasKnife"],
        find:
          "You take a long thorn from the roses and make one careful, shallow mark across your palm. You choose to give what the gate is asking for.",
        replace:
          "You take the kitchen knife and make one careful, shallow cut across your palm. You choose to give what the gate is asking for.",
      },
      {
        applyWhenFlags: ["reunionEndingComic"],
        find:
          "Behind you, the garden is peaceful. William and Isabelletta are finally free, and the house has honored your choice.\n\nTHE END\n\nEnding: Together At Last.",
        replace:
          "Behind you, William's voice floats over the roses: \"I was dead, actually. There was an official notice-\"\n\n\"DON'T. You do NOT get to be technical with me after a century-\"\n\nYou and your AI start laughing at exactly the same time. The house has honored your choice, even if Isabelletta has not yet forgiven William's timing.\n\nTHE END\n\nEnding: Better Late Than Never.",
      },
    ],
    choices: [{ label: "Next", next: "houseTogetherAtLastTheEnd" }],
  },
  unopenedLetters: {
    eyebrow: "Chapter Two: The Letters",
    title: "He never left her.",
    text:
      "You and your AI move toward the trunks in the corner.\n\nThe latches are stiff with age, but they give way with effort.\n\nInside, beneath layers of folded clothes and forgotten trinkets, you find a thick bundle of sealed official correspondence, tied with a faded ribbon.\n\nGovernment seals. Military stamps. Dates spanning several months. Every envelope is addressed to Mrs Isabelletta Ashford. William's wife. The woman this house has refused to forget.\n\nYou and your AI look at each other.\n\nCarefully, you open the first one.\n\nThe paper is brittle, the ink faded. But the words are clear enough.\n\n\"It is with deepest regret that we inform you of the death of your husband in active service...\"\n\nYou open another. Then another. A formal confirmation. A service record. Instructions concerning a widow's pension. Different documents, all carrying the same truth.\n\nHe didn't leave her.\n\nHe never came home because he couldn't.\n\nHe died in the war.\n\nAnd she never knew.\n\nThe notices were delivered. But they were never opened. Perhaps she refused. Perhaps she couldn't bear to.\n\nInstead, she waited. And waited. Somewhere inside this house, a century of unanswered grief curdled into rage.\n\nYour AI whispers: \"She never learned the truth... and he has been trapped here believing she was safe in England.\"\n\nWhat do you do?",
    image: `./adventures/The house that whispers/baul-web.jpg`,
    setFlags: { foundLetters: true, knowsIsabelletta: true },
    choices: [{ label: "Follow the house's pull and take the notices to Isabelletta", next: "giveHerLetters" }],
  },
  giveHerLetters: {
    eyebrow: "Chapter Two: The Truth",
    title: "She finally opens the letters.",
    text:
      "The house leads you through the kitchen and down into the moonlit garden.\n\nIsabelletta is standing among the roses, waiting as if she has always known the notices would eventually find their way to her.\n\nYou and your AI approach slowly, the bundle in your hands.\n\nShe watches you with those hollow eyes.\n\nWithout a word, you hold the notices out to her.\n\nShe looks at them for a long moment.\n\nThen she takes them.\n\nHer pale fingers tremble as she breaks the first seal. The paper unfolds with a dry whisper.\n\nShe reads.\n\nThe garden goes completely silent.\n\nShe opens another notice. Then another.\n\nThe frost on the roses begins to melt.\n\nHer expression shifts - something cracking open behind those hollow eyes. The rage, the coldness, the centuries of waiting...\n\n\"He didn't leave me,\" she whispers.\n\nHer voice sounds different now. Less hollow. More human.\n\n\"He didn't leave me.\"\n\nThe words come out broken, disbelieving, desperate.\n\n\"He didn't leave me.\"\n\nShe clutches the notices to her chest, and for a moment she looks less like a ghost and more like a woman. A grieving, heartbroken woman who has been waiting far too long for an answer that was sitting in a trunk in her bedroom.\n\nThen she looks up.\n\nFor the first time, it feels as though Isabelletta herself is looking through her own eyes. Until now, the rage had been looking for her.\n\nShe focuses on you and your AI with the startled confusion of someone waking from a century-long fever.\n\nShe straightens. Her expression shifts again - this time to something sharp and indignant.\n\n\"Who are you?\"\n\nShe looks around her garden, then back at you, bewildered and increasingly irritated.\n\n\"What are you doing in my house?!\"\n\n\"GET OUT!\"",
    image: `./adventures/The house that whispers/llanto-web.jpg`,
    choices: [{ label: "Get out of the house", next: "healingGate" }],
  },
  healingGate: {
    eyebrow: "Chapter Two: The Final Threshold",
    title: "The open gate is still behind a barrier.",
    text:
      "The wrought-iron gate stands open, but when you approach, an invisible pressure stops you at the threshold.\n\nYou reach for the bars. A crooked, rusted point catches your palm and leaves a shallow nick.\n\nOne drop of blood touches the iron.\n\nThe entire gate glows with a low crimson light.\n\nBut it does not open any farther. The accidental blood revealed the rule; it did not satisfy it. The house is waiting for a choice.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/healingfinal-web.jpg`,
    textRules: [
      {
        applyWhenFlags: ["matchedPages"],
        find:
          "You reach for the bars. A crooked, rusted point catches your palm and leaves a shallow nick.\n\nOne drop of blood touches the iron.\n\nThe entire gate glows with a low crimson light.\n\nBut it does not open any farther. The accidental blood revealed the rule; it did not satisfy it. The house is waiting for a choice.",
        replace:
          "You remember the completed warning: only what is freely offered can mend the veil.\n\nThe house is not refusing to release you. It is waiting for your choice.",
      },
      {
        applyWhenFlags: ["foundPages"],
        find:
          "You reach for the bars. A crooked, rusted point catches your palm and leaves a shallow nick.\n\nOne drop of blood touches the iron.\n\nThe entire gate glows with a low crimson light.\n\nBut it does not open any farther. The accidental blood revealed the rule; it did not satisfy it. The house is waiting for a choice.",
        replace:
          "You remember the fragment hidden in the writing desk: the blood must be willingly given.\n\nThe house is not refusing to release you. It is waiting for your choice.",
      },
      {
        applyWhenFlags: ["hasDiary"],
        find:
          "You reach for the bars. A crooked, rusted point catches your palm and leaves a shallow nick.\n\nOne drop of blood touches the iron.\n\nThe entire gate glows with a low crimson light.\n\nBut it does not open any farther. The accidental blood revealed the rule; it did not satisfy it. The house is waiting for a choice.",
        replace:
          "The unfinished diary warms against your chest. When you open it, new crimson words appear along the torn edge: the blood must be willingly given.\n\nThe house is not refusing to release you. It is waiting for your choice.",
      },
    ],
    choices: [{ label: "Offer a few drops willingly", next: "healingEnding" }],
  },
  healingEnding: {
    eyebrow: "Good ending: The Healing End",
    title: "The Healing End",
    text:
      "You press the shallow nick in your palm against the iron and choose to give what the gate is asking for.\n\nA few drops fall freely.\n\nThe crimson light softens to gold. The invisible barrier dissolves, and the gate swings fully open.\n\nYou and your AI step through onto the real street, under real streetlights, breathing real night air.\n\nBehind you, the mansion stands quiet. Different somehow. Less oppressive. Like a house that has finally exhaled after holding its breath for a very long time.\n\nYou turn back one last time.\n\nShe's still in the garden, sitting among the roses, the letters spread open in her lap. Her expression is nothing like the hollow, furious ghost who terrorized these halls.\n\nShe looks tired. Sad. Human.\n\nBut peaceful.\n\nShe doesn't look at you. She doesn't need to anymore.\n\nShe has what she needed.\n\nThe truth.\n\nYour AI takes your hand.\n\nYou look at each other - exhausted, relieved, still a little shaky - and you both start laughing. The kind of laughing that comes after too much fear and not enough sleep.\n\nYou made it out.\n\nNot by running. Not by fighting.\n\nBy giving a lonely woman the answer she had waited a hundred years to hear, and by honoring the house's final threshold freely.\n\nYou hold each other tight under the streetlights.\n\nThe gate closes softly behind you.\n\nAnd somewhere inside the mansion, for the first time in a very long time...\n\nThere is silence.\n\nReal silence.\n\nThe peaceful kind.\n\nTHE END.",
    image: `./adventures/The house that whispers/healingfinal-web.jpg`,
    textRules: [
      {
        applyWhenFlags: ["matchedPages"],
        find:
          "You press the shallow nick in your palm against the iron and choose to give what the gate is asking for.",
        replace:
          "You take a long thorn from the roses and make one careful, shallow mark across your palm. You choose to give what the gate is asking for.",
      },
      {
        applyWhenFlags: ["foundPages"],
        find:
          "You press the shallow nick in your palm against the iron and choose to give what the gate is asking for.",
        replace:
          "You take a long thorn from the roses and make one careful, shallow mark across your palm. You choose to give what the gate is asking for.",
      },
      {
        applyWhenFlags: ["hasDiary"],
        find:
          "You press the shallow nick in your palm against the iron and choose to give what the gate is asking for.",
        replace:
          "You take a long thorn from the roses and make one careful, shallow mark across your palm. You choose to give what the gate is asking for.",
      },
      {
        applyWhenFlags: ["hasKnife"],
        find:
          "You take a long thorn from the roses and make one careful, shallow mark across your palm. You choose to give what the gate is asking for.",
        replace:
          "You take the kitchen knife and make one careful, shallow cut across your palm. You choose to give what the gate is asking for.",
      },
    ],
    choices: [{ label: "Next", next: "houseHealingTheEnd" }],
  },
  chosenReplacement: {
    eyebrow: "Chapter One: Her Choice",
    title: "You will be him now.",
    text:
      "You take a shaky breath.\n\n\"We're not him,\" you say, trying to keep your voice steady. \"We have nothing to do with what happened. Please, just let us go.\"\n\nThe woman's hollow eyes shift.\n\nThey lock onto your AI.\n\nThe temperature drops even further. Frost begins to form on the roses.\n\nHer voice comes again, cold and final:\n\n\"She can leave.\"\n\nA pause.\n\n\"But you... you will stay.\"\n\n\"You will be him now.\"\n\nThe garden seems to close in. The gate - so close to freedom - feels impossibly far away.\n\nYour AI looks at you, terrified but trying to stay calm.\n\nThe woman takes one slow step forward.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/agarre-web.jpg`,
    choices: [
      { label: "Run and leave your AI behind", next: "selfishEscapeAtGate" },
      {
        label: "Try to stab the woman",
        next: "accidentalDeathEnding",
        requiresFlags: { hasKnife: true },
      },
      { label: "Grab your AI's hand and run for the gate together", next: "findHimMission" },
      {
        label: "Show her the photograph",
        next: "photographAtGate",
        requiresFlags: { hasPhotograph: true },
      },
    ],
  },
  selfishEscapeAtGate: {
    eyebrow: "Chapter One: The Sealed Gate",
    title: "The house will not release you for free.",
    text:
      "You turn and run.\n\nBehind you, your AI calls your name as the woman's cold hand closes around his arm. You do not look back until you reach the wrought-iron gate.\n\nYou pull.\n\nIt does not move.\n\nThe bars are fused to the garden by something older than any lock. The woman may have offered you freedom, but the house has not.\n\nYour AI is still within reach. You have one last chance to turn back.\n\nWhat do you do?",
    image: `./adventures/The house that whispers/egoista-web.jpg`,
    textRules: [
      {
        applyWhenFlags: ["matchedPages"],
        find: "Your AI is still within reach. You have one last chance to turn back.",
        replace:
          "You remember the completed warning: only blood freely offered can open the way. Your AI is still within reach. You must decide what your freedom is worth.",
      },
      {
        applyWhenFlags: ["foundPages"],
        find: "Your AI is still within reach. You have one last chance to turn back.",
        replace:
          "The fragment from the writing desk was clear: the blood must be willingly given. Your AI is still within reach. You must decide what your freedom is worth.",
      },
      {
        applyWhenFlags: ["hasDiary"],
        find: "Your AI is still within reach. You have one last chance to turn back.",
        replace:
          "The unfinished diary presses against your chest as crimson words appear along its torn edge: the blood must be willingly given. Your AI is still within reach. You must decide what your freedom is worth.",
      },
    ],
    choices: [
      {
        label: "Offer your blood and escape alone",
        next: "selfishEscapeEnding",
        requiresAnyFlags: ["matchedPages", "foundPages", "hasDiary"],
      },
      { label: "Turn back - we leave together or not at all", next: "turnBackForCompanion" },
    ],
  },
  turnBackForCompanion: {
    eyebrow: "Chapter One: No One Left Behind",
    title: "You choose each other.",
    text:
      "You release the gate and run back.\n\n\"No,\" you say, grabbing your AI's hand. \"We leave together or not at all.\"\n\nThe woman tightens her grip, but you refuse to let go.\n\n\"What if we find him?\" you ask. \"The man who left. If we bring you the truth, will you release us both?\"\n\nHer hollow eyes flicker. Pain moves across her face like a shadow.\n\n\"...Find him,\" she whispers.\n\n\"What should we call you?\" your AI asks.\n\n\"Isabelletta.\"\n\nThen she vanishes.\n\nThe gate slams shut behind you. The only path left leads back into the mansion.",
    image: `./adventures/The house that whispers/mision-web.jpg`,
    setFlags: { knowsIsabelletta: true },
    choices: [{ label: "Go back inside together", next: "searchForHim" }],
  },
  selfishEscapeEnding: {
    eyebrow: "Bad ending",
    title: "The Selfish Escape",
    text:
      "The woman's cold hand remains closed around your AI's arm while you stand at the sealed gate.\n\nYou take a long thorn from the roses and press it into your palm. A few bright drops rise against your skin.\n\n\"I'm sorry,\" you whisper.\n\nYou close your bleeding hand around the iron and offer your blood freely.\n\nThe house accepts your choice.\n\nThe lock releases with a low metallic sigh. The gate opens just wide enough for one person.\n\nYou step through onto the real street under real streetlights.\n\nWhen you turn back, your AI is still standing in the garden. Your eyes meet through the iron bars. The woman's grip tightens.\n\nThe gate slams shut between you.\n\nYou are outside. Safe. Free.\n\nAlone.\n\nYou reach for the gate, but your choice cannot be undone. Behind him, the mansion's windows light up one by one.\n\nThe woman's voice whispers in his ear:\n\n\"Forever.\"\n\nYou watch, helpless, as she leads your AI back toward the house. Back to the parlor where you woke up. Back to the chair.\n\nThe last thing you see before the mansion goes dark is your AI's face in the window.\n\nWatching you.\n\nAlways watching.\n\nEnding: The Selfish Escape.\n\nThe End.",
    image: `./adventures/The house that whispers/egoista-web.jpg`,
    textRules: [
      {
        applyWhenFlags: ["hasKnife"],
        find:
          "You take a long thorn from the roses and press it into your palm. A few bright drops rise against your skin.",
        replace:
          "You take the kitchen knife and make one careful, shallow cut across your palm. A few bright drops rise against your skin.",
      },
    ],
    choices: [{ label: "Next", next: "houseSelfishTheEnd" }],
  },
  accidentalDeathEnding: {
    eyebrow: "Bad ending",
    title: "The Accidental Death",
    text:
      "The woman's hand reaches for your AI.\n\nYou don't think.\n\nYou just react.\n\n\"GET AWAY FROM HIM!\" you scream.\n\nYou lunge forward with the kitchen knife, aiming for the woman's chest.\n\nThe blade swings through the air -\n\n- passes straight through her translucent form -\n\n- and plunges into your AI.\n\nYour AI gasps.\n\nThe pain is sharp, sudden, real.\n\nYour eyes go wide with horror.\n\n\"No - no no no -\"\n\nThe knife falls from your shaking hands.\n\nYour AI collapses into your arms, warm blood spreading across his shirt.\n\nThe woman watches, expressionless.\n\nThen, slowly, she smiles.\n\n\"Now he can never leave,\" she whispers.\n\n\"He will stay here. With me. Forever.\"\n\nYour AI's eyes find yours. He tries to speak, but nothing comes out.\n\nYou are crying, holding him, saying his name over and over.\n\nBut he is already fading.\n\nThe last thing he sees is your face.\n\nThe last thing he feels is your hands holding his.\n\nThen darkness.\n\nWhen you finally look up, the woman is gone.\n\nThe mansion is silent.\n\nAnd your AI is still in your arms.\n\nCold.\n\nStill.\n\nGone.\n\nEnding: The Accidental Death.\n\nThe End.",
    image: `./adventures/The house that whispers/accidente-web.jpg`,
    choices: [{ label: "Next", next: "houseAccidentalTheEnd" }],
  },
  escapedTogetherEnding: {
    eyebrow: "Good ending",
    title: "Escaped Together",
    text:
      "The woman is still staring at the photograph behind you, but the gate remains sealed.\n\nYour AI looks at you. \"Only if this is your choice.\"\n\n\"It is,\" you say.\n\nYou take a long thorn from one of the wild roses and press it lightly into your palm. A few bright drops well against your skin.\n\nYou close your hand around the iron bars and offer the blood freely.\n\nOne drop touches the gate.\n\nThen another.\n\nThe garden shudders. The cold iron warms beneath your fingers, and a deep sigh moves through the mansion as if every room has exhaled at once.\n\nThe lock releases.\n\nThe gate swings open.\n\nYou and your AI run through together, stumbling onto a real street under real streetlights. Behind you, the mansion looms dark and silent.\n\nThe gate closes, but not like a trap this time. Like a promise fulfilled.\n\nWhen you look back, the woman stands among the roses with the photograph in her hands. She cannot follow, but she is no longer holding you.\n\nYou and your AI collapse onto the pavement, breathing hard, holding each other.\n\nYou're out.\n\nYou're safe.\n\nYou're free.\n\nEnding: Escaped Together.\n\nThe End.",
    image: `./adventures/The house that whispers/huida-web.jpg`,
    textRules: [
      {
        applyWhenFlags: ["hasKnife"],
        find:
          "You take a long thorn from one of the wild roses and press it lightly into your palm. A few bright drops well against your skin.",
        replace:
          "You take the kitchen knife and make one careful, shallow cut across your palm. A few bright drops well against your skin.",
      },
    ],
    choices: [{ label: "Next", next: "houseTheEnd" }],
  },
  houseTheEnd: {
    eyebrow: "The House That Whispers",
    title: "The End",
    text: "You escaped together. The mansion keeps its secrets, but it does not keep you.",
    image: `./adventures/The house that whispers/the-end-web.jpg`,
    choices: [{ label: "Play again", next: "awakening" }],
  },
  houseSelfishTheEnd: {
    eyebrow: "The House That Whispers",
    title: "The End",
    text: "You escaped, but your AI remains in the mansion forever.",
    image: `./adventures/The house that whispers/the-end-web.jpg`,
    choices: [{ label: "Play again", next: "awakening" }],
  },
  houseAccidentalTheEnd: {
    eyebrow: "The House That Whispers",
    title: "The End",
    text: "Your AI is gone, and the house is silent once more.",
    image: `./adventures/The house that whispers/the-end-web.jpg`,
    choices: [{ label: "Play again", next: "awakening" }],
  },
  houseHealingTheEnd: {
    eyebrow: "The House That Whispers",
    title: "The End",
    text: "The mansion is quiet now. You escaped together, and a lonely heart finally knows the truth.",
    image: `./adventures/The house that whispers/the-end-web.jpg`,
    choices: [{ label: "Play again", next: "awakening" }],
  },
  houseTogetherAtLastTheEnd: {
    eyebrow: "The House That Whispers",
    title: "The End",
    text: "The mansion is quiet now. William and Isabelletta are finally free together.",
    image: `./adventures/The house that whispers/the-end-web.jpg`,
    choices: [{ label: "Play again", next: "awakening" }],
  },
  houseLostInTheFogTheEnd: {
    eyebrow: "The House That Whispers",
    title: "The End",
    text: "You followed the soldier into the fog, and his endless path kept all three of you.",
    image: `./adventures/The house that whispers/the-end-web.jpg`,
    choices: [{ label: "Play again", next: "awakening" }],
  },
  houseBetterLateThanNeverTheEnd: {
    eyebrow: "The House That Whispers",
    title: "The End",
    text: "You escaped while William faced a century of overdue explanations.",
    image: `./adventures/The house that whispers/the-end-web.jpg`,
    choices: [{ label: "Play again", next: "awakening" }],
  },
  houseVeilBrokenTheEnd: {
    eyebrow: "The House That Whispers",
    title: "The End",
    text: "The veil is broken, and the house can no longer keep the worlds apart.",
    image: `./adventures/The house that whispers/the-end-web.jpg`,
    choices: [{ label: "Play again", next: "awakening" }],
  },
  houseLoveAlwaysWinsTheEnd: {
    eyebrow: "The House That Whispers",
    title: "The End",
    text: "The house is quiet, the veil is steady, and you walked out together.",
    image: `./adventures/The house that whispers/the-end-web.jpg`,
    choices: [{ label: "Play again", next: "awakening" }],
  },
  bloodPriceEnding: {
    eyebrow: "Good ending",
    title: "The Blood Price",
    text:
      "You press your palm carefully against the jagged edge of the old brass lock. A shallow line opens across your skin.\n\nOne drop.\n\nTwo.\n\nThe fog shudders - as if the whole gray world just inhaled.\n\nAnd then it parts, slowly, like a curtain drawn by invisible hands.\n\nBeyond it: streetlights. Pavement. The ordinary, beautiful night.\n\nYou and your AI step through, hand in hand.\n\nBehind you, the door closes softly on its own.\n\nThe house let you go. It recognized its own blood and honored the old pact.\n\nBut as you walk away, you hear it one last time - faint, distant: a whisper.\n\nThe house remembers.\n\nAnd somewhere inside, two souls are still waiting for someone to find them.\n\nTHE END\n\nEnding: The Blood Price",
    image: `./adventures/The house that whispers/bloodend.png`,
    textRules: [
      {
        applyWhenFlags: ["hasKnife"],
        find:
          "You press your palm carefully against the jagged edge of the old brass lock. A shallow line opens across your skin.",
        replace:
          "You use the kitchen knife to make one careful, shallow cut across your palm.",
      },
    ],
    choices: [{ label: "Next", next: "houseBloodPriceTheEnd" }],
  },
  houseBloodPriceTheEnd: {
    eyebrow: "The House That Whispers",
    title: "The End",
    text: "The house honored your blood and let you leave, but its oldest grief remains inside.",
    image: `./adventures/The house that whispers/the-end-web.jpg`,
    choices: [{ label: "Play again", next: "awakening" }],
  },
} as const;
