export type ArchetypeId = "chaser" | "inventor" | "reader";

export type QuizOption = {
  id: ArchetypeId;
  label: string;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export type ResultId = ArchetypeId | "split";

export type QuizResult = {
  id: ResultId;
  kicker: string;
  title: string;
  tell: string;
  body: string;
  shareText: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "everywhere",
    prompt: "A clip is suddenly everywhere. What do you do first?",
    options: [
      { id: "chaser", label: "Hunt for the name people are already repeating." },
      { id: "inventor", label: "Take the format and make a cleaner version." },
      { id: "reader", label: "Check whether it shows up in two places, not one." },
    ],
  },
  {
    id: "screenshot",
    prompt: "Your chat forwards a screenshot that says something is already moving.",
    options: [
      { id: "chaser", label: "Ask for the link before the noise cools off." },
      { id: "inventor", label: "Make a version that mocks the screenshot itself." },
      { id: "reader", label: "Ask who cropped it, and what the crop removed." },
    ],
  },
  {
    id: "boost",
    prompt: "You learn a name is on a public list of paid boosts.",
    options: [
      { id: "chaser", label: "Treat the boost as a flare and go look now." },
      { id: "inventor", label: "Ignore the name and study the joke that carried it." },
      { id: "reader", label: "Treat the boost as an ad someone paid to place." },
    ],
  },
  {
    id: "minutes",
    prompt: "You have twenty quiet minutes.",
    options: [
      { id: "chaser", label: "Scroll whatever is already loud." },
      { id: "inventor", label: "Draft one hook nobody has used today." },
      { id: "reader", label: "Write down three formats that repeated." },
    ],
  },
  {
    id: "dies",
    prompt: "A spike dies in two days, which it usually does.",
    options: [
      { id: "chaser", label: "Find the next spike faster." },
      { id: "inventor", label: "Keep the mechanic. Drop the costume." },
      { id: "reader", label: "One spike is an anecdote. Wait for a repeat." },
    ],
  },
  {
    id: "known",
    prompt: "What would you rather be known for?",
    options: [
      { id: "chaser", label: "Being early to what everyone is watching." },
      { id: "inventor", label: "Making the thing other people copy." },
      { id: "reader", label: "Explaining why the crowd moved, without joining it." },
    ],
  },
];

const results: Record<ResultId, QuizResult> = {
  chaser: {
    id: "chaser",
    kicker: "Your tilt",
    title: "You're chasing attention.",
    tell: "You move when the room is already loud.",
    body: "Speed feels like skill. Most of what you catch has already been named, forwarded, and remixed. The crowd's noise can be real and the money can still be gone. Attention is not guaranteed money, and being early to a name is not the same as understanding it.",
    shareText:
      "Quiz result: I'm chasing attention. I move when the room is already loud. Attention moves first. Price is late. Attention is not guaranteed money. — Viral Attention Map, educational only.",
  },
  inventor: {
    id: "inventor",
    kicker: "Your tilt",
    title: "You're inventing attention.",
    tell: "You would rather start the noise than catch it.",
    body: "You look at a spike and see a format you could twist. Most inventions die quietly. The ones that live get copied until they look obvious. Inventing is still not a paycheck. It is a way of being early to a shape instead of a ticker.",
    shareText:
      "Quiz result: I'm inventing attention. I'd rather start the noise than catch it. Attention moves first. Price is late. Attention is not guaranteed money. — Viral Attention Map, educational only.",
  },
  reader: {
    id: "reader",
    kicker: "Your tilt",
    title: "You're reading attention.",
    tell: "You watch the room before you join it.",
    body: "You ask who paid for the boost, who stripped the caption, and whether the pattern happened twice. Reading is slower than chasing and less romantic than inventing. It is also the mode that keeps \"interesting\" and \"safe bet\" in different boxes.",
    shareText:
      "Quiz result: I'm reading attention. I watch the room before I join it. Attention moves first. Price is late. Attention is not guaranteed money. — Viral Attention Map, educational only.",
  },
  split: {
    id: "split",
    kicker: "Your tilt",
    title: "You split the difference.",
    tell: "Some days you chase. Some days you invent.",
    body: "The useful tell is which one you do when you are tired. Tired chasing looks like refreshing. Tired inventing looks like a draft you never post. Either way, a crowd is not a balance sheet. Attention is not guaranteed money.",
    shareText:
      "Quiz result: I split the difference — chasing some days, inventing others. Attention moves first. Price is late. Attention is not guaranteed money. — Viral Attention Map, educational only.",
  },
};

export function getResult(id: string): QuizResult | null {
  if (id === "chaser" || id === "inventor" || id === "reader" || id === "split") {
    return results[id];
  }
  return null;
}

export function scoreQuiz(answers: ArchetypeId[]): QuizResult {
  const counts: Record<ArchetypeId, number> = {
    chaser: 0,
    inventor: 0,
    reader: 0,
  };
  for (const answer of answers) {
    counts[answer] += 1;
  }
  const ranked = (Object.entries(counts) as [ArchetypeId, number][]).sort(
    (a, b) => b[1] - a[1],
  );
  const [first, second] = ranked;
  if (!first || !second || first[1] === second[1]) return results.split;
  return results[first[0]];
}
