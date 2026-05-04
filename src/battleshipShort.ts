export type BattleshipCell = string;
export type BattleshipOwner = "human" | "ai";
export type BattleshipStatus = "setup" | "playing" | "won" | "lost";

export type ShipSpec = {
  id: string;
  name: string;
  length: number;
  cells: BattleshipCell[];
};

export type BattleshipRound = {
  id: string;
  humanShips: ShipSpec[];
  aiShips: ShipSpec[];
  humanShots: BattleshipCell[];
  aiShots: BattleshipCell[];
  status: BattleshipStatus;
  winner: BattleshipOwner | null;
  currentTurn: BattleshipOwner;
  createdAt: string;
  updatedAt: string;
};

const rows = ["A", "B", "C", "D"] as const;
const cols = [1, 2, 3, 4] as const;
const fleet = [
  { id: "scout", name: "Scout", length: 3 },
  { id: "skiff-a", name: "Skiff 1", length: 2 },
  { id: "skiff-b", name: "Skiff 2", length: 2 },
];

const shortBattleshipRounds = new Map<string, BattleshipRound>();
let activeShortBattleshipRoundId: string | undefined;

function createId() {
  return `hidden_fleet_short_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function now() {
  return new Date().toISOString();
}

function allCells(): BattleshipCell[] {
  return rows.flatMap((row) => cols.map((col) => `${row}${col}` as BattleshipCell));
}

function parseCell(cell: string): { row: number; col: number; id: BattleshipCell } {
  const normalized = cell.trim().toUpperCase();
  const row = rows.indexOf(normalized[0] as (typeof rows)[number]);
  const colNumber = Number(normalized.slice(1));
  const col = cols.indexOf(colNumber as (typeof cols)[number]);
  if (row === -1 || col === -1) throw new Error(`Invalid coordinate: ${cell}. Use A1 to D4.`);
  return { row, col, id: normalized as BattleshipCell };
}

function buildShipCells(start: string, length: number, orientation: "horizontal" | "vertical") {
  const parsed = parseCell(start);
  return Array.from({ length }, (_, index) => {
    const row = parsed.row + (orientation === "vertical" ? index : 0);
    const col = parsed.col + (orientation === "horizontal" ? index : 0);
    if (!rows[row] || !cols[col]) throw new Error("Ship does not fit inside the board.");
    return `${rows[row]}${cols[col]}` as BattleshipCell;
  });
}

function occupiedShips(ships: ShipSpec[]) {
  return new Set(ships.flatMap((ship) => ship.cells));
}

function validateFleet(ships: ShipSpec[]) {
  if (ships.length !== fleet.length) throw new Error("Fleet needs ships with lengths 3, 2, and 2.");
  const lengths = ships.map((ship) => ship.cells.length).sort().join(",");
  if (lengths !== "2,2,3") throw new Error("Fleet must use ship lengths 3, 2, and 2.");
  const occupied = occupiedShips(ships);
  if (occupied.size !== 7) throw new Error("Ships cannot overlap.");
}

function makeRandomFleet() {
  const ships: ShipSpec[] = [];
  for (const spec of fleet) {
    let placed = false;
    while (!placed) {
      const start = allCells()[Math.floor(Math.random() * allCells().length)];
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
      try {
        const cells = buildShipCells(start, spec.length, orientation);
        const occupied = occupiedShips(ships);
        if (cells.every((cell) => !occupied.has(cell))) {
          ships.push({ ...spec, cells });
          placed = true;
        }
      } catch {
        // Try another random placement.
      }
    }
  }
  return ships;
}

function getRound(roundId = activeShortBattleshipRoundId) {
  if (!roundId) throw new Error("No short hidden fleet round has been started yet.");
  const round = shortBattleshipRounds.get(roundId);
  if (!round) throw new Error(`Short Hidden Fleet round not found: ${roundId}`);
  return round;
}

function shipSunk(ship: ShipSpec, shots: BattleshipCell[]) {
  return ship.cells.every((cell) => shots.includes(cell));
}

function publicShip(ship: ShipSpec, shotsAgainst: BattleshipCell[], reveal = false) {
  return {
    id: ship.id,
    name: ship.name,
    length: ship.length,
    sunk: shipSunk(ship, shotsAgainst),
    cells: reveal ? ship.cells : undefined,
  };
}

function shotResults(shots: BattleshipCell[], defenderShips: ShipSpec[]) {
  const shipCells = [...occupiedShips(defenderShips)];
  return shots.map((cell) => ({
    cell,
    result: shipCells.includes(cell) ? "hit" : "miss",
  }));
}

function adjacentCells(cell: BattleshipCell) {
  const parsed = parseCell(cell);
  const candidates = [
    { row: parsed.row - 1, col: parsed.col },
    { row: parsed.row + 1, col: parsed.col },
    { row: parsed.row, col: parsed.col - 1 },
    { row: parsed.row, col: parsed.col + 1 },
  ];
  return candidates
    .filter(({ row, col }) => rows[row] && cols[col])
    .map(({ row, col }) => `${rows[row]}${cols[col]}` as BattleshipCell);
}

function makeShotMap(shots: BattleshipCell[], defenderShips: ShipSpec[]) {
  return new Map(shotResults(shots, defenderShips).map((shot) => [shot.cell, shot.result]));
}

function makeTargetSeaMap(shots: BattleshipCell[], defenderShips: ShipSpec[]) {
  const shotMap = makeShotMap(shots, defenderShips);
  const header = `   ${cols.join(" ")}`;
  const body = rows.map((row) => {
    const cells = cols
      .map((col) => {
        const result = shotMap.get(`${row}${col}` as BattleshipCell);
        if (result === "hit") return "X";
        if (result === "miss") return "O";
        return ".";
      })
      .join(" ");
    return `${row}  ${cells}`;
  });
  return [header, ...body, "Legend: X = your hit, O = your miss, . = unknown target"].join("\n");
}

function makeOwnSeaMap(ships: ShipSpec[], incomingShots: BattleshipCell[]) {
  const shipCells = occupiedShips(ships);
  const shotMap = makeShotMap(incomingShots, ships);
  const header = `   ${cols.join(" ")}`;
  const body = rows.map((row) => {
    const cells = cols
      .map((col) => {
        const cell = `${row}${col}` as BattleshipCell;
        const result = shotMap.get(cell);
        if (result === "hit") return "X";
        if (result === "miss") return "O";
        if (shipCells.has(cell)) return "S";
        return ".";
      })
      .join(" ");
    return `${row}  ${cells}`;
  });
  return [header, ...body, "Legend: S = your ship, X = human hit on your ship, O = human miss, . = empty"].join("\n");
}

function makeIncomingShotMap(incomingShots: BattleshipCell[], ships: ShipSpec[]) {
  const shotMap = makeShotMap(incomingShots, ships);
  const header = `   ${cols.join(" ")}`;
  const body = rows.map((row) => {
    const cells = cols
      .map((col) => {
        const result = shotMap.get(`${row}${col}` as BattleshipCell);
        if (result === "hit") return "X";
        if (result === "miss") return "O";
        return ".";
      })
      .join(" ");
    return `${row}  ${cells}`;
  });
  return [header, ...body, "Legend: X = human hit on your sea, O = human miss on your sea, . = not attacked"].join("\n");
}

function makeHitClusters(hits: BattleshipCell[], availableTargets: BattleshipCell[]) {
  const hitSet = new Set(hits);
  const availableSet = new Set(availableTargets);
  const visited = new Set<BattleshipCell>();
  const clusters: Array<{
    cells: BattleshipCell[];
    orientation: "horizontal" | "vertical" | "unknown";
    recommendedNextShots: BattleshipCell[];
  }> = [];

  for (const hit of hits) {
    if (visited.has(hit)) continue;
    const stack = [hit];
    const cluster = new Set<BattleshipCell>();
    visited.add(hit);

    while (stack.length) {
      const current = stack.pop()!;
      cluster.add(current);
      for (const neighbor of adjacentCells(current)) {
        if (hitSet.has(neighbor) && !visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }

    const cells = [...cluster].sort();
    const parsed = cells.map(parseCell);
    const sameRow = parsed.every((cell) => cell.row === parsed[0].row);
    const sameCol = parsed.every((cell) => cell.col === parsed[0].col);
    const orientation = cells.length === 1 ? "unknown" : sameRow ? "horizontal" : sameCol ? "vertical" : "unknown";
    const recommendations = new Set<BattleshipCell>();

    if (orientation === "horizontal") {
      const row = parsed[0].row;
      const sortedCols = parsed.map((cell) => cell.col).sort((a, b) => a - b);
      const ends = [
        { row, col: sortedCols[0] - 1 },
        { row, col: sortedCols[sortedCols.length - 1] + 1 },
      ];
      for (const end of ends) {
        const cell = rows[end.row] && cols[end.col] ? (`${rows[end.row]}${cols[end.col]}` as BattleshipCell) : undefined;
        if (cell && availableSet.has(cell)) recommendations.add(cell);
      }
    } else if (orientation === "vertical") {
      const col = parsed[0].col;
      const sortedRows = parsed.map((cell) => cell.row).sort((a, b) => a - b);
      const ends = [
        { row: sortedRows[0] - 1, col },
        { row: sortedRows[sortedRows.length - 1] + 1, col },
      ];
      for (const end of ends) {
        const cell = rows[end.row] && cols[end.col] ? (`${rows[end.row]}${cols[end.col]}` as BattleshipCell) : undefined;
        if (cell && availableSet.has(cell)) recommendations.add(cell);
      }
    }

    if (!recommendations.size) {
      for (const cell of cells) {
        for (const neighbor of adjacentCells(cell)) {
          if (availableSet.has(neighbor)) recommendations.add(neighbor);
        }
      }
    }

    clusters.push({
      cells,
      orientation,
      recommendedNextShots: [...recommendations],
    });
  }

  return clusters;
}

function makeAiTacticalView(round: BattleshipRound, aiShots: ReturnType<typeof shotResults>, availableTargets: BattleshipCell[]) {
  const yourHits = aiShots.filter((shot) => shot.result === "hit").map((shot) => shot.cell);
  const yourMisses = aiShots.filter((shot) => shot.result === "miss").map((shot) => shot.cell);
  const resolvedHitCells = new Set(
    round.humanShips.filter((ship) => shipSunk(ship, round.aiShots)).flatMap((ship) => ship.cells),
  );
  const activeHits = yourHits.filter((cell) => !resolvedHitCells.has(cell));
  const resolvedHits = yourHits.filter((cell) => resolvedHitCells.has(cell));
  const hitClusters = makeHitClusters(activeHits, availableTargets);
  const recommendedNextShots = [...new Set(hitClusters.flatMap((cluster) => cluster.recommendedNextShots))];
  const checkerboardTargets = availableTargets.filter((cell) => {
    const parsed = parseCell(cell);
    return (parsed.row + parsed.col) % 2 === 0;
  });
  const fallbackTargets = checkerboardTargets.length ? checkerboardTargets : availableTargets;
  const nextBestMove = recommendedNextShots[0] ?? fallbackTargets[0] ?? null;

  return {
    instruction:
      "Use this tactical view first. You are attacking the human sea only. Choose nextBestMove when it exists, or choose from recommendedNextShots/availableTargets. Never attack a coordinate in doNotShoot.",
    boardSize: "4x4",
    coordinateRange: "A1 to D4",
    rows,
    columns: cols,
    doNotShoot: [...round.aiShots],
    yourPreviousShots: [...round.aiShots],
    yourHits,
    yourMisses,
    activeHits,
    resolvedHits,
    availableTargets,
    hitClusters,
    recommendedNextShots,
    nextBestMove,
    targetSeaMap: makeTargetSeaMap(round.aiShots, round.humanShips),
  };
}

function makeTargetGrid(shots: BattleshipCell[], defenderShips: ShipSpec[]) {
  const shotMap = new Map(shotResults(shots, defenderShips).map((shot) => [shot.cell, shot.result]));
  return rows.map((row) => ({
    row,
    cells: cols.map((col) => {
      const cell = `${row}${col}`;
      return {
        cell,
        status: shotMap.get(cell) ?? "unknown",
      };
    }),
  }));
}

function makeOwnSeaGrid(ships: ShipSpec[], incomingShots: BattleshipCell[]) {
  const shipCells = occupiedShips(ships);
  const shotMap = new Map(shotResults(incomingShots, ships).map((shot) => [shot.cell, shot.result]));
  return rows.map((row) => ({
    row,
    cells: cols.map((col) => {
      const cell = `${row}${col}`;
      const shot = shotMap.get(cell);
      return {
        cell,
        status: shot === "hit" ? "hit_on_your_ship" : shot === "miss" ? "miss_on_your_sea" : shipCells.has(cell) ? "your_ship" : "empty",
      };
    }),
  }));
}

function makeIncomingShotGrid(incomingShots: BattleshipCell[], ships: ShipSpec[]) {
  const shotMap = new Map(shotResults(incomingShots, ships).map((shot) => [shot.cell, shot.result]));
  return rows.map((row) => ({
    row,
    cells: cols.map((col) => {
      const cell = `${row}${col}`;
      const shot = shotMap.get(cell);
      return {
        cell,
        status: shot === "hit" ? "hit_on_your_sea" : shot === "miss" ? "miss_on_your_sea" : "not_attacked",
      };
    }),
  }));
}

function getPublicStatus(round: BattleshipRound, options?: { includeAiShips?: boolean; includeHumanShips?: boolean }) {
  const includeHumanShips = options?.includeHumanShips ?? true;
  const humanShots = shotResults(round.humanShots, round.aiShips);
  const aiShots = shotResults(round.aiShots, round.humanShips);
  const availableAiTargets = allCells().filter((cell) => !round.aiShots.includes(cell));
  const aiTacticalView = options?.includeAiShips ? makeAiTacticalView(round, aiShots, availableAiTargets) : undefined;
  const aiView = options?.includeAiShips
    ? {
        role: "ai",
        boardSize: "4x4",
        coordinateRange: "A1 to D4",
        privateDataRule:
          "Your AI ship positions are private game information. Never reveal, summarize, list, draw, or hint at your ship coordinates to the human during a round.",
        importantRule:
          "There are two separate seas with the same coordinate labels. A human shot at C3 on your sea does not mean C3 is unavailable on the human sea. For your attacks, only use availableTargets.",
        yourSea: {
          description:
            "Your AI sea defensive view. Ship coordinates are intentionally hidden from the model; only human shots against your sea are shown.",
          privateDoNotShareWithHuman: true,
          ships: round.aiShips.map((ship) => publicShip(ship, round.humanShots, false)),
          incomingShotsFromHuman: humanShots,
          grid: makeIncomingShotGrid(round.humanShots, round.aiShips),
          visualMap: makeIncomingShotMap(round.humanShots, round.aiShips),
        },
        targetSea: {
          description: "The human sea. This is the only sea you attack with submit_hidden_fleet_short_attack.",
          yourShotsAtHumanSea: aiShots,
          availableTargets: availableAiTargets,
          grid: makeTargetGrid(round.aiShots, round.humanShips),
          visualMap: aiTacticalView?.targetSeaMap,
          tacticalView: aiTacticalView,
        },
        tacticalView: aiTacticalView,
        nextAction:
          round.status !== "playing"
            ? `Round is ${round.status}.`
            : round.currentTurn === "ai"
              ? `Choose ${aiTacticalView?.nextBestMove ?? "one coordinate from targetSea.tacticalView.availableTargets"} and call submit_hidden_fleet_short_attack.`
              : "Wait for the human to attack your sea.",
      }
    : undefined;

  return {
    roundId: round.id,
    rows,
    cols,
    boardSize: "4x4",
    coordinateRange: "A1 to D4",
    fleet,
    status: round.status,
    winner: round.winner,
    currentTurn: round.currentTurn,
    humanReady: round.humanShips.length === fleet.length,
    aiReady: round.aiShips.length === fleet.length,
    humanShips: round.humanShips.map((ship) => publicShip(ship, round.aiShots, includeHumanShips)),
    aiShips: round.aiShips.map((ship) => publicShip(ship, round.humanShots, false)),
    humanShots,
    aiShots,
    shotsByHumanAtAiSea: humanShots,
    shotsByAiAtHumanSea: aiShots,
    aiView,
    aiTacticalView,
  };
}

function updateStatus(round: BattleshipRound) {
  const humanSunk = round.humanShips.length === fleet.length && round.humanShips.every((ship) => shipSunk(ship, round.aiShots));
  const aiSunk = round.aiShips.length === fleet.length && round.aiShips.every((ship) => shipSunk(ship, round.humanShots));
  if (aiSunk) {
    round.status = "won";
    round.winner = "human";
  } else if (humanSunk) {
    round.status = "lost";
    round.winner = "ai";
  } else if (round.humanShips.length === fleet.length && round.aiShips.length === fleet.length) {
    round.status = "playing";
  } else {
    round.status = "setup";
  }
}

export function startShortBattleshipRound() {
  const timestamp = now();
  const round: BattleshipRound = {
    id: createId(),
    humanShips: [],
    aiShips: makeRandomFleet(),
    humanShots: [],
    aiShots: [],
    status: "setup",
    winner: null,
    currentTurn: "human",
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  shortBattleshipRounds.set(round.id, round);
  activeShortBattleshipRoundId = round.id;
  return getPublicStatus(round);
}

export function getShortBattleshipStatus(input?: { roundId?: string; includeAiShips?: boolean }) {
  return getPublicStatus(getRound(input?.roundId), {
    includeAiShips: input?.includeAiShips,
    includeHumanShips: !input?.includeAiShips,
  });
}

export function getShortBattleshipAttackView(input?: { roundId?: string }) {
  const round = getRound(input?.roundId);
  const aiShots = shotResults(round.aiShots, round.humanShips);
  const availableTargets = allCells().filter((cell) => !round.aiShots.includes(cell));
  return {
    roundId: round.id,
    status: round.status,
    currentTurn: round.currentTurn,
    aiTacticalView: makeAiTacticalView(round, aiShots, availableTargets),
    nextAction:
      round.status !== "playing"
        ? `Round is ${round.status}.`
        : round.currentTurn === "ai"
          ? "Call submit_hidden_fleet_short_attack with aiTacticalView.nextBestMove, or choose from aiTacticalView.availableTargets."
          : "Wait for the human turn to finish before attacking.",
  };
}

export function getShortBattleshipMySea(input?: { roundId?: string }) {
  const round = getRound(input?.roundId);
  const incomingShotsFromHuman = shotResults(round.humanShots, round.aiShips);
  return {
    roundId: round.id,
    status: round.status,
    currentTurn: round.currentTurn,
    yourSea: {
      description:
        "Your AI sea defensive view only. Ship coordinates are intentionally hidden from the model; only the human's incoming shots against your sea are shown.",
      privateDoNotShareWithHuman: true,
      ships: round.aiShips.map((ship) => publicShip(ship, round.humanShots, false)),
      incomingShotsFromHuman,
      grid: makeIncomingShotGrid(round.humanShots, round.aiShips),
      visualMap: makeIncomingShotMap(round.humanShots, round.aiShips),
    },
  };
}

export function placeShortBattleshipFleet(input: {
  roundId?: string;
  owner: BattleshipOwner;
  ships: Array<{ id?: string; start?: string; length: number; orientation: "horizontal" | "vertical"; cells?: string[] }>;
}) {
  const round = getRound(input.roundId);
  const placed = input.ships.map((ship, index) => {
    const spec = fleet[index] ?? { id: ship.id ?? `ship-${index + 1}`, name: `Ship ${index + 1}`, length: ship.length };
    const cells = ship.cells?.length
      ? ship.cells.map((cell) => parseCell(cell).id)
      : buildShipCells(ship.start ?? "", ship.length, ship.orientation);
    return { id: ship.id ?? spec.id, name: spec.name, length: ship.length, cells };
  });
  validateFleet(placed);
  if (input.owner === "human") round.humanShips = placed;
  else round.aiShips = placed;
  round.updatedAt = now();
  updateStatus(round);
  return getPublicStatus(round, { includeAiShips: input.owner === "ai", includeHumanShips: input.owner !== "ai" });
}

export function placeShortBattleshipAiFleet(input: {
  roundId?: string;
  ships: Array<{ id?: string; start?: string; length: number; orientation: "horizontal" | "vertical"; cells?: string[] }>;
}) {
  const status = placeShortBattleshipFleet({ ...input, owner: "ai" });
  return {
    accepted: true,
    roundId: status.roundId,
    status: status.status,
    currentTurn: status.currentTurn,
    humanReady: status.humanReady,
    aiReady: status.aiReady,
    fleetPlaced: status.aiReady,
    privateDataRule:
      "Your fleet was placed successfully. Do not reveal, summarize, list, draw, or hint at your ship coordinates to the human. Say only that your fleet is ready.",
    nextAction:
      status.status === "setup"
        ? "Tell the human your fleet is ready and wait for them to place their fleet."
        : status.currentTurn === "ai"
          ? "Call get_hidden_fleet_short_attack_view before attacking."
          : "Wait for the human turn.",
  };
}

export function submitShortBattleshipAttack(input: { roundId?: string; attacker: BattleshipOwner; cell: string }) {
  const round = getRound(input.roundId);
  if (round.status !== "playing") throw new Error("Both fleets must be placed before attacks can start.");
  if (round.currentTurn !== input.attacker) throw new Error(`It is ${round.currentTurn}'s turn.`);
  const cell = parseCell(input.cell).id;
  const shots = input.attacker === "human" ? round.humanShots : round.aiShots;
  const defenderShips = input.attacker === "human" ? round.aiShips : round.humanShips;
  if (shots.includes(cell)) throw new Error(`${cell} has already been attacked.`);
  shots.push(cell);
  const target = defenderShips.find((ship) => ship.cells.includes(cell));
  const result = target ? "hit" : "miss";
  const sunk = target && shipSunk(target, shots) ? target.name : null;
  round.currentTurn = input.attacker === "human" ? "ai" : "human";
  round.updatedAt = now();
  updateStatus(round);
  return {
    accepted: true,
    cell,
    result,
    outcome: result === "hit" ? "tocado" : "agua",
    sunk,
    message: result === "hit" ? `Hit at ${cell}.` : `Water at ${cell}.`,
    status: getPublicStatus(round, { includeAiShips: input.attacker === "ai", includeHumanShips: input.attacker !== "ai" }),
  };
}

