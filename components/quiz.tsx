"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions, scoreQuiz, type ArchetypeId } from "@/lib/quiz";

export function Quiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<ArchetypeId[]>([]);
  const question = quizQuestions[index];

  if (!question) return null;

  function choose(option: ArchetypeId) {
    const next = [...answers.slice(0, index), option];
    if (index + 1 >= quizQuestions.length) {
      const result = scoreQuiz(next);
      router.push(`/quiz/result/${result.id}`);
      return;
    }
    setAnswers(next);
    setIndex(index + 1);
  }

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-tape">
        Question {String(index + 1).padStart(2, "0")} / {String(quizQuestions.length).padStart(2, "0")}
      </p>
      <div
        className="mt-3 h-1 bg-line"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={quizQuestions.length}
        aria-valuenow={index + 1}
        aria-label="Quiz progress"
      >
        <div
          className="h-full bg-tape"
          style={{ width: `${((index + 1) / quizQuestions.length) * 100}%` }}
        />
      </div>
      <h2 className="mt-8 max-w-3xl font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl">
        {question.prompt}
      </h2>
      <div className="mt-8 grid gap-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => choose(option.id)}
            className="bg-paper px-5 py-5 text-left text-lg leading-snug text-ink hover:bg-white"
          >
            {option.label}
          </button>
        ))}
      </div>
      {index > 0 ? (
        <button
          type="button"
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
          className="mt-6 min-h-11 text-sm text-muted underline underline-offset-4"
        >
          Previous question
        </button>
      ) : null}
    </div>
  );
}
