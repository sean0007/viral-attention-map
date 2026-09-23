import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ResultCard } from "@/components/result-card";
import { getResult } from "@/lib/quiz";

type ResultPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return ["chaser", "inventor", "reader", "split"].map((id) => ({ id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ResultPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = getResult(id);
  if (!result) return { title: "Quiz" };
  return {
    title: result.title,
    description: result.tell,
  };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { id } = await params;
  const result = getResult(id);
  if (!result) notFound();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="mb-6 max-w-3xl text-sm text-muted">
        Shared result. Retake the quiz if you want your own answers.
      </p>
      <ResultCard result={result} />
    </div>
  );
}
