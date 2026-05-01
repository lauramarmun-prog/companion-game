export type TicTacToePlayer = "X" | "O";
export type TicTacToeCell = TicTacToePlayer | "";
export type TicTacToeStatus = "playing" | "won" | "draw";

export type TicTacToeRound = {
  id: string;
  cells: TicTacToeCell[];
  currentPlayer: TicTacToePlayer;
  humanPlayer: TicTacToePlayer;
  aiPlayer: TicTacToePlayer;
  status: TicTacToeStatus;
  winner: TicTacToePlayer | null;
  winningLine: number[] | null;
  createdAt: string;
  updatedAt: string;
};

const ticTacToeRounds = new Map<string, TicTacToeRound>();
let activeTicTacToeRoundId: string | undefined;

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createId() {
  return `tic_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function now() {
  return new Date().toISOString();
}

function otherPlayer(player: TicTacToePlayer): TicTacToePlayer {
  return player === "X" ? "O" : "X";
}

function getResult(cells: TicTacToeCell[]) {
  for (const line of winningLines) {
    const [a, b, c] = line;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { status: "won" as const, winner: cells[a] as TicTacToePlayer, winningLine: line };
    }
  }

  if (cells.every(Boolean)) {
    return { status: "draw" as const, winner: null, winningLine: null };
  }

  return { status: "playing" as const, winner: null, winningLine: null };
}

function getPublicStatus(round: TicTacToeRound) {
  return {
    roundId: round.id,
    cells: [...round.cells],
    currentPlayer: round.currentPlayer,
    humanPlayer: round.humanPlayer,
    aiPlayer: round.aiPlayer,
    status: round.status,
    winner: round.winner,
    winningLine: round.winningLine,
    availableMoves: round.cells
      .map((cell, index) => (cell ? null : index))
      .filter((index): index is number => index !== null),
  };
}

export function startTicTacToeRound(input?: {
  humanPlayer?: TicTacToePlayer;
  startingPlayer?: TicTacToePlayer;
}) {
  const humanPlayer = input?.humanPlayer ?? "X";
  const aiPlayer = otherPlayer(humanPlayer);
  const timestamp = now();
  const round: TicTacToeRound = {
    id: createId(),
    cells: Array(9).fill("") as TicTacToeCell[],
    currentPlayer: input?.startingPlayer ?? "X",
    humanPlayer,
    aiPlayer,
    status: "playing",
    winner: null,
    winningLine: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  ticTacToeRounds.set(round.id, round);
  activeTicTacToeRoundId = round.id;
  return getPublicStatus(round);
}

export function getTicTacToeStatus(roundId = activeTicTacToeRoundId) {
  if (!roundId) throw new Error("No tic-tac-toe round has been started yet.");

  const round = ticTacToeRounds.get(roundId);
  if (!round) throw new Error(`Tic-tac-toe round not found: ${roundId}`);

  return getPublicStatus(round);
}

export function submitTicTacToeMove(input: {
  roundId?: string;
  index: number;
  player?: TicTacToePlayer;
}) {
  const roundId = input.roundId ?? activeTicTacToeRoundId;
  if (!roundId) throw new Error("No tic-tac-toe round has been started yet.");

  const round = ticTacToeRounds.get(roundId);
  if (!round) throw new Error(`Tic-tac-toe round not found: ${roundId}`);
  if (round.status !== "playing") {
    return {
      accepted: false,
      message: `This round is already ${round.status}.`,
      status: getPublicStatus(round),
    };
  }

  const player = input.player ?? round.currentPlayer;
  if (player !== round.currentPlayer) {
    throw new Error(`It is ${round.currentPlayer}'s turn.`);
  }

  if (!Number.isInteger(input.index) || input.index < 0 || input.index > 8) {
    throw new Error("Move index must be a number from 0 to 8.");
  }

  if (round.cells[input.index]) {
    throw new Error(`Cell ${input.index} is already occupied.`);
  }

  round.cells[input.index] = player;
  const result = getResult(round.cells);
  round.status = result.status;
  round.winner = result.winner;
  round.winningLine = result.winningLine;
  if (round.status === "playing") {
    round.currentPlayer = otherPlayer(player);
  }
  round.updatedAt = now();

  return {
    accepted: true,
    player,
    index: input.index,
    message:
      round.status === "won"
        ? `${player} won the game.`
        : round.status === "draw"
          ? "The game ended in a draw."
          : `Move accepted. ${round.currentPlayer}'s turn.`,
    status: getPublicStatus(round),
  };
}
