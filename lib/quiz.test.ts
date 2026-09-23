import assert from "node:assert/strict";
import test from "node:test";
import { quizQuestions, scoreQuiz } from "./quiz.ts";
import { chartUrl, isEmail, isPublicHttpsWebhook } from "./links.ts";

test("six quiz questions each have three distinct tilts", () => {
  assert.equal(quizQuestions.length, 6);
  for (const question of quizQuestions) {
    const ids = question.options.map((option) => option.id).sort();
    assert.deepEqual(ids, ["chaser", "inventor", "reader"]);
  }
});

test("a clear majority scores that tilt", () => {
  const result = scoreQuiz([
    "chaser",
    "chaser",
    "chaser",
    "reader",
    "inventor",
    "reader",
  ]);
  assert.equal(result.id, "chaser");
});

test("a tie scores the split result", () => {
  const result = scoreQuiz([
    "chaser",
    "chaser",
    "chaser",
    "inventor",
    "inventor",
    "inventor",
  ]);
  assert.equal(result.id, "split");
});

test("chart links stay on DexScreener https pages", () => {
  assert.equal(
    chartUrl("https://dexscreener.com/solana/abc"),
    "https://dexscreener.com/solana/abc",
  );
  assert.equal(chartUrl("http://dexscreener.com/solana/abc"), null);
  assert.equal(chartUrl("https://example.com/solana/abc"), null);
  assert.equal(chartUrl("https://dexscreener.com.evil.example/solana/abc"), null);
});

test("webhook targets are public https hostnames", () => {
  assert.equal(isPublicHttpsWebhook("https://hooks.example.com/digest"), true);
  assert.equal(isPublicHttpsWebhook("http://hooks.example.com/digest"), false);
  assert.equal(isPublicHttpsWebhook("https://localhost/digest"), false);
  assert.equal(isPublicHttpsWebhook("https://127.0.0.1/digest"), false);
  assert.equal(isPublicHttpsWebhook("https://10.0.0.5/digest"), false);
  assert.equal(isPublicHttpsWebhook("https://metadata.google.internal/"), false);
});

test("email check rejects junk and accepts a normal address", () => {
  assert.equal(isEmail("reader@example.com"), true);
  assert.equal(isEmail("not an email"), false);
  assert.equal(isEmail("a@b"), false);
});
