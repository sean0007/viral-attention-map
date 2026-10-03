import { attentionSources } from "./attention-sources";
import { quizQuestions, scoreQuiz, type ArchetypeId } from "./quiz";
import { DISCLAIMER } from "./copy";
import { InputError, type Endpoint, type Input } from "./agent-api";

export const PUBLIC_URL = "https://viral-attention-map.vercel.app";
export const API_DISCLAIMER = `${DISCLAIMER} Attention is not guaranteed money.`;
export const API_INFO = {
  title: "Viral Attention Map API",
  description: "How online attention spreads (sound reuse, quote-post piles, stitch chains, naked forwards and more) and a quiz on whether you chase, invent, or read attention. Educational only.",
};

const TILTS: readonly ArchetypeId[] = ["chaser", "inventor", "reader"];

function readAnswers(i: Input): ArchetypeId[] {
  const raw = i.answers;
  const list = Array.isArray(raw) ? raw.map(String) : typeof raw === "string" ? raw.split(/[,|\s]+/) : [];
  const answers = list.map((s) => s.trim().toLowerCase()).filter(Boolean);
  const bad = answers.filter((a) => !(TILTS as readonly string[]).includes(a));
  if (!answers.length || bad.length) throw new InputError(`answers must be a list of: ${TILTS.join(", ")} (one per question).`);
  return answers as ArchetypeId[];
}

export const ENDPOINTS: Record<"patterns" | "quiz", Endpoint> = {
  patterns: {
    path: "/api/patterns",
    operationId: "viralAttentionPatterns",
    summary: "List common patterns of how attention spreads online (TikTok sound reuse, X quote-post piles, stitch chains, group-chat forwards...)",
    description: "Each pattern has the platform, the observable signal, and the lesson (why being early to noise is not the same as understanding it). Optional platform filter.",
    params: [{ name: "platform", type: "string", description: "Optional case-insensitive platform filter, e.g. TikTok or X." }],
    example: "/api/patterns",
    compute: (i) => {
      const p = typeof i.platform === "string" ? i.platform.trim().toLowerCase() : "";
      const patterns = p ? attentionSources.filter((s) => s.platform.toLowerCase().includes(p)) : attentionSources;
      return { patterns };
    },
  },
  quiz: {
    path: "/api/quiz",
    operationId: "viralAttentionQuiz",
    summary: "Score the 'are you chasing, inventing, or reading attention?' quiz",
    description: "Without answers, returns the six questions with options (each option is chaser, inventor, or reader). With answers, returns the tilt (or split on a tie) with a short explanation.",
    params: [{ name: "answers", type: "string", description: "Comma-separated tilts, one per question, e.g. reader,reader,inventor,reader,chaser,reader. POST may send an array." }],
    example: "/api/quiz?answers=reader,reader,inventor,reader,chaser,reader",
    compute: (i) => {
      if (i.answers === undefined || i.answers === "") return { questions: quizQuestions };
      const answers = readAnswers(i);
      return { answers, result: scoreQuiz(answers) };
    },
  },
};

export const PLUGIN = {
  name: "Viral Attention Map",
  nameForModel: "viral_attention_map",
  descriptionForHuman: "How online attention spreads, and whether you chase, invent, or read it. Educational.",
  descriptionForModel:
    "Use when a user asks how trends and viral moments spread on TikTok, X, or group chats, or wants a quick self-check on chasing hype. Educational patterns only. Never frame attention as an investment signal; relay the disclaimer: not financial advice.",
  logo: "/favicon.ico",
};
