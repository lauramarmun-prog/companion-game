import { placeBattleshipFleet, startBattleshipRound, submitBattleshipAttack } from "./battleship.js";
import { getGuessWhoStatus, setGuessWhoSecret, startGuessWhoRound, submitGuessWhoFinalGuess } from "./guessWho.js";
import { getHangmanStatus, startHangmanRound, submitHangmanLetter, submitHangmanWord } from "./hangman.js";
import { startTicTacToeRound, submitTicTacToeMove } from "./ticTacToe.js";
import { startWordlyRound, submitWordlyGuess } from "./wordly.js";

const round = startHangmanRound({
  turn: "human",
  secretWord: "cloud",
  clue: "Where apps often live after deploy.",
});

console.log("START", round);
console.log("STATUS", getHangmanStatus(round.roundId));
console.log("MISS", submitHangmanLetter({ roundId: round.roundId, letter: "z" }));
console.log("HIT", submitHangmanLetter({ roundId: round.roundId, letter: "c" }));
console.log("WORD", submitHangmanWord({ roundId: round.roundId, word: "cloud" }));

const tic = startTicTacToeRound();
console.log("TIC START", tic);
console.log("TIC X", submitTicTacToeMove({ roundId: tic.roundId, index: 4, player: "X" }));
console.log("TIC O", submitTicTacToeMove({ roundId: tic.roundId, index: 0, player: "O" }));

const wordly = startWordlyRound({ turn: "human", secretWord: "cloud", clue: "Where apps often live." });
console.log("WORDLY START", wordly);
console.log("WORDLY MISS", submitWordlyGuess({ roundId: wordly.roundId, guess: "paper" }));
console.log("WORDLY HIT", submitWordlyGuess({ roundId: wordly.roundId, guess: "cloud" }));

const pendingWordly = startWordlyRound({ turn: "ai" });
console.log("WORDLY AI PENDING", pendingWordly);

const battle = startBattleshipRound();
console.log("BATTLE START", battle);
console.log(
  "BATTLE FLEET",
  placeBattleshipFleet({
    roundId: battle.roundId,
    owner: "human",
    ships: [
      { length: 4, start: "A1", orientation: "horizontal" },
      { length: 3, start: "B1", orientation: "horizontal" },
      { length: 3, start: "C1", orientation: "horizontal" },
      { length: 2, start: "D1", orientation: "horizontal" },
    ],
  }),
);
console.log("BATTLE ATTACK", submitBattleshipAttack({ roundId: battle.roundId, attacker: "human", cell: "A1" }));

const guessWhoHuman = startGuessWhoRound({ turn: "human" });
console.log("GUESS WHO HUMAN START", guessWhoHuman.characterCount, guessWhoHuman.hasSecretCharacter);
console.log("GUESS WHO HUMAN STATUS", getGuessWhoStatus(guessWhoHuman.roundId).characters[0]);

const guessWhoAi = startGuessWhoRound({ turn: "ai" });
console.log("GUESS WHO AI START", guessWhoAi.status, guessWhoAi.hasSecretCharacter);
console.log("GUESS WHO SECRET SET", setGuessWhoSecret({ roundId: guessWhoAi.roundId, secretName: "Laura" }).hasSecretCharacter);
console.log("GUESS WHO GUESS", submitGuessWhoFinalGuess({ roundId: guessWhoAi.roundId, guess: "Laura" }));
