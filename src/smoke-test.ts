import { getBattleshipStatus, placeBattleshipFleet, startBattleshipRound, submitBattleshipAttack } from "./battleship.js";
import { getGuessWhoStatus, setGuessWhoSecret, startGuessWhoRound, submitGuessWhoFinalGuess } from "./guessWho.js";
import { getHangmanStatus, startHangmanRound, submitHangmanLetter, submitHangmanWord } from "./hangman.js";
import { addQuizQuestion, finishQuizRound, startQuizRound, submitQuizAnswer } from "./quiz.js";
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

const quiz = startQuizRound({ mode: "ai-quiz", topic: "Companion Games", totalQuestions: 1 });
console.log("QUIZ START", quiz);
const quizQuestion = addQuizQuestion({
  roundId: quiz.roundId,
  question: "Which game uses a hidden fleet?",
  choices: ["Hangman", "Hidden Fleet", "Quiz"],
  correctAnswer: "Hidden Fleet",
});
console.log("QUIZ QUESTION", quizQuestion.question);
console.log("QUIZ ANSWER", submitQuizAnswer({ roundId: quiz.roundId, answer: "Hidden Fleet" }));
console.log("QUIZ FINISH", finishQuizRound({ roundId: quiz.roundId }).status);

const wordly = startWordlyRound({ turn: "human", secretWord: "cloud", clue: "Where apps often live." });
console.log("WORD QUEST START", wordly);
console.log("WORD QUEST MISS", submitWordlyGuess({ roundId: wordly.roundId, guess: "paper" }));
console.log("WORD QUEST HIT", submitWordlyGuess({ roundId: wordly.roundId, guess: "cloud" }));

const pendingWordly = startWordlyRound({ turn: "ai" });
console.log("WORD QUEST AI PENDING", pendingWordly);

const battle = startBattleshipRound();
console.log("HIDDEN FLEET START", battle);
console.log(
  "HIDDEN FLEET FLEET",
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
console.log("HIDDEN FLEET ATTACK", submitBattleshipAttack({ roundId: battle.roundId, attacker: "human", cell: "A1" }));
console.log("HIDDEN FLEET AI VIEW", getBattleshipStatus({ roundId: battle.roundId, includeAiShips: true }).aiView?.nextAction);

const guessWhoHuman = startGuessWhoRound({ turn: "human" });
console.log("WHO IS IT HUMAN START", guessWhoHuman.characterCount, guessWhoHuman.hasSecretCharacter);
console.log("WHO IS IT HUMAN STATUS", getGuessWhoStatus(guessWhoHuman.roundId).characters[0]);

const guessWhoAi = startGuessWhoRound({ turn: "ai" });
console.log("WHO IS IT AI START", guessWhoAi.status, guessWhoAi.hasSecretCharacter);
console.log("WHO IS IT SECRET SET", setGuessWhoSecret({ roundId: guessWhoAi.roundId, secretName: "Laura" }).hasSecretCharacter);
console.log("WHO IS IT GUESS", submitGuessWhoFinalGuess({ roundId: guessWhoAi.roundId, guess: "Laura" }));
