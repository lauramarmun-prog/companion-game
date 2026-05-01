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
