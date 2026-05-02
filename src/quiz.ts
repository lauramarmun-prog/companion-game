export type QuizMode = "ask-each-other" | "ai-quiz";
export type QuizStatus = "playing" | "finished";
export type QuizAuthor = "human" | "ai";

export type QuizQuestion = {
  id: string;
  author: QuizAuthor;
  question: string;
  choices: string[];
  correctAnswer: string | null;
  explanation: string | null;
  answer: string | null;
  correct: boolean | null;
};

export type QuizRound = {
  id: string;
  mode: QuizMode;
  topic: string | null;
  totalQuestions: number | null;
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  status: QuizStatus;
  createdAt: string;
  updatedAt: string;
};

const quizRounds = new Map<string, QuizRound>();
let activeQuizRoundId: string | undefined;

function createId(prefix = "quiz") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function now() {
  return new Date().toISOString();
}

function cleanText(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function normalizeAnswer(value: string) {
  return cleanText(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function getRound(roundId = activeQuizRoundId) {
  if (!roundId) throw new Error("No quiz round has been started yet.");
  const round = quizRounds.get(roundId);
  if (!round) throw new Error(`Quiz round not found: ${roundId}`);
  return round;
}

function getPublicStatus(round: QuizRound) {
  const answered = round.questions.filter((question) => question.answer !== null).length;
  const scored = round.questions.filter((question) => question.correct !== null);
  const correct = scored.filter((question) => question.correct).length;
  const publicQuestions = round.questions.map((question, index) => ({
    index,
    id: question.id,
    author: question.author,
    question: question.question,
    choices: [...question.choices],
    hasCorrectAnswer: Boolean(question.correctAnswer),
    explanation: question.answer !== null || round.status === "finished" ? question.explanation : null,
    answer: question.answer,
    correct: question.correct,
  }));
  const currentQuestion = publicQuestions[round.currentQuestionIndex] ?? null;

  return {
    roundId: round.id,
    mode: round.mode,
    topic: round.topic,
    totalQuestions: round.totalQuestions,
    questions: publicQuestions,
    currentQuestionIndex: round.currentQuestionIndex,
    currentQuestion,
    questionCount: round.questions.length,
    answered,
    score: correct,
    scored: scored.length,
    status: round.status,
    nextActor: round.mode === "ai-quiz" ? "human" : "both",
  };
}

export function startQuizRound(input?: {
  mode?: QuizMode;
  topic?: string | null;
  totalQuestions?: number | null;
}) {
  const timestamp = now();
  const totalQuestions =
    input?.totalQuestions === null || input?.totalQuestions === undefined
      ? null
      : Math.max(1, Math.min(Math.trunc(input.totalQuestions), 30));

  const round: QuizRound = {
    id: createId(),
    mode: input?.mode ?? "ask-each-other",
    topic: input?.topic?.trim() || null,
    totalQuestions,
    questions: [],
    currentQuestionIndex: 0,
    status: "playing",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  quizRounds.set(round.id, round);
  activeQuizRoundId = round.id;
  return getPublicStatus(round);
}

export function getQuizStatus(roundId = activeQuizRoundId) {
  return getPublicStatus(getRound(roundId));
}

export function addQuizQuestion(input: {
  roundId?: string;
  author?: QuizAuthor;
  question: string;
  choices?: string[];
  correctAnswer?: string | null;
  explanation?: string | null;
}) {
  const round = getRound(input.roundId);
  if (round.status !== "playing") throw new Error(`This quiz round is already ${round.status}.`);

  const question = cleanText(input.question);
  if (!question) throw new Error("Quiz question cannot be empty.");

  const choices = (input.choices ?? []).map(cleanText).filter(Boolean).slice(0, 8);
  const quizQuestion: QuizQuestion = {
    id: createId("question"),
    author: input.author ?? "ai",
    question,
    choices,
    correctAnswer: input.correctAnswer ? cleanText(input.correctAnswer) : null,
    explanation: input.explanation ? cleanText(input.explanation) : null,
    answer: null,
    correct: null,
  };

  round.questions.push(quizQuestion);
  round.updatedAt = now();

  return {
    accepted: true,
    question: {
      id: quizQuestion.id,
      index: round.questions.length - 1,
      author: quizQuestion.author,
      question: quizQuestion.question,
      choices: [...quizQuestion.choices],
      hasCorrectAnswer: Boolean(quizQuestion.correctAnswer),
    },
    status: getPublicStatus(round),
  };
}

export function submitQuizAnswer(input: {
  roundId?: string;
  questionId?: string;
  questionIndex?: number;
  answer: string;
  correct?: boolean;
}) {
  const round = getRound(input.roundId);
  if (round.status !== "playing") {
    return {
      accepted: false,
      message: `This quiz round is already ${round.status}.`,
      status: getPublicStatus(round),
    };
  }

  const question =
    input.questionId
      ? round.questions.find((candidate) => candidate.id === input.questionId)
      : round.questions[input.questionIndex ?? round.currentQuestionIndex];

  if (!question) throw new Error("Quiz question not found.");

  const answer = cleanText(input.answer);
  if (!answer) throw new Error("Quiz answer cannot be empty.");

  const correct =
    input.correct ??
    (question.correctAnswer ? normalizeAnswer(answer) === normalizeAnswer(question.correctAnswer) : null);

  question.answer = answer;
  question.correct = correct;

  const answeredIndex = round.questions.indexOf(question);
  if (answeredIndex >= round.currentQuestionIndex) {
    round.currentQuestionIndex = Math.min(answeredIndex + 1, Math.max(round.questions.length - 1, 0));
  }

  if (round.totalQuestions && round.questions.length >= round.totalQuestions && round.questions.every((item) => item.answer !== null)) {
    round.status = "finished";
  }

  round.updatedAt = now();

  return {
    accepted: true,
    questionId: question.id,
    answer,
    correct,
    message:
      correct === null
        ? "Answer saved."
        : correct
          ? "Correct answer."
          : "Not quite.",
    status: getPublicStatus(round),
  };
}

export function finishQuizRound(input?: { roundId?: string }) {
  const round = getRound(input?.roundId);
  round.status = "finished";
  round.updatedAt = now();
  return getPublicStatus(round);
}
