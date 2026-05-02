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

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;
const cols = [1, 2, 3, 4, 5, 6, 7, 8] as const;
const fleet = [
  { id: "battleship", name: "Battleship", length: 4 },
  { id: "cruiser", name: "Cruiser", length: 3 },
  { id: "submarine", name: "Submarine", length: 3 },
  { id: "destroyer", name: "Destroyer", length: 2 },
];

const battleshipRounds = new Map<string, BattleshipRound>();
let activeBattleshipRoundId: string | undefined;

function createId() {
  return `battle_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
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
  if (row === -1 || col === -1) throw new Error(`Invalid coordinate: ${cell}. Use A1 to H8.`);
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
  if (ships.length !== fleet.length) throw new Error("Fleet needs ships with lengths 4, 3, 3, and 2.");
  const lengths = ships.map((ship) => ship.cells.length).sort().join(",");
  if (lengths !== "2,3,3,4") throw new Error("Fleet must use ship lengths 4, 3, 3, and 2.");
  const occupied = occupiedShips(ships);
  if (occupied.size !== 12) throw new Error("Ships cannot overlap.");
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

function getRound(roundId = activeBattleshipRoundId) {
  if (!roundId) throw new Error("No battleship round has been started yet.");
  const round = battleshipRounds.get(roundId);
  if (!round) throw new Error(`Battleship round not found: ${roundId}`);
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

function getPublicStatus(round: BattleshipRound, options?: { includeAiShips?: boolean; includeHumanShips?: boolean }) {
  const humanShipCells = [...occupiedShips(round.humanShips)];
  const aiShipCells = [...occupiedShips(round.aiShips)];
  const includeHumanShips = options?.includeHumanShips ?? true;
  return {
    roundId: round.id,
    rows,
    cols,
    fleet,
    status: round.status,
    winner: round.winner,
    currentTurn: round.currentTurn,
    humanReady: round.humanShips.length === fleet.length,
    aiReady: round.aiShips.length === fleet.length,
    humanShips: round.humanShips.map((ship) => publicShip(ship, round.aiShots, includeHumanShips)),
    aiShips: round.aiShips.map((ship) => publicShip(ship, round.humanShots, Boolean(options?.includeAiShips))),
    humanShots: round.humanShots.map((cell) => ({
      cell,
      result: aiShipCells.includes(cell) ? "hit" : "miss",
    })),
    aiShots: round.aiShots.map((cell) => ({
      cell,
      result: humanShipCells.includes(cell) ? "hit" : "miss",
    })),
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

export function startBattleshipRound() {
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
  battleshipRounds.set(round.id, round);
  activeBattleshipRoundId = round.id;
  return getPublicStatus(round);
}

export function getBattleshipStatus(input?: { roundId?: string; includeAiShips?: boolean }) {
  return getPublicStatus(getRound(input?.roundId), {
    includeAiShips: input?.includeAiShips,
    includeHumanShips: !input?.includeAiShips,
  });
}

export function placeBattleshipFleet(input: {
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

export function submitBattleshipAttack(input: { roundId?: string; attacker: BattleshipOwner; cell: string }) {
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
