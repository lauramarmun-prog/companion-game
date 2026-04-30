import { getHangmanStatus, startHangmanRound, submitHangmanLetter } from "./hangman.js";

const round = startHangmanRound({
  turn: "human",
  secretWord: "cloud",
  clue: "Where apps often live after deploy.",
});

console.log("START", round);
console.log("STATUS", getHangmanStatus(round.roundId));
console.log("MISS", submitHangmanLetter({ roundId: round.roundId, letter: "z" }));
console.log("HIT", submitHangmanLetter({ roundId: round.roundId, letter: "c" }));
